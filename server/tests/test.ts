import { 
    describe,
    expect,
    test,
    afterEach,
    beforeAll,
    afterAll
} from '@jest/globals';
import request from 'supertest';
import pool from '../utils/db';
import path from 'path';

import app from '../index';


describe('Test admin credentials', () => {
    afterAll(async () => {
        await pool.query('DELETE FROM USERS WHERE username = ?', ['testUser']);
    });
    test('Admin registration works', async () => {
        const creds = {
            username: 'testUser',
            password: 'testUserPassword'
        }

        await request(app).post('/api/admin/register').send(creds)
            .then(res => {
                expect(res.status).toBe(201)
            })
    })
    test('Admin login works', async () => {
        const creds = {
            username: 'testUser',
            password: 'testUserPassword'
        }
        await request(app).post('/api/admin/login').send(creds)
            .then(res => {
                expect(res.status).toBe(200)
                expect(res.body.token).toBeDefined()
            })
    })
    test('Admin login fails with incorrect credentials', async () => {
        const creds = {
            username: 'testUser',
            password: 'wrongPassword'
        }
        await request(app).post('/api/admin/login').send(creds)
            .then(res => {
                expect(res.status).toBe(401)
            })
    })
})

describe('HTTP-request tests', () => {
    describe('Test HTTP GET-requests', () => {
        test('Text content fetching with GET-request works', async () => {
            await request(app).get('/api/contents/about')
                .then(res => {
                    expect(res.status).toBe(200)
                    expect(res.body).toBeDefined()
                })
        })
        test('Image fetching with GET-request works', async () => {
            await request(app).get('/api/images/about')
                .then(res => {
                    expect(res.status).toBe(200)
                    expect(res.body).toBeDefined()
                })

        })
    })
    
    describe('Test HTTP POST-requests', () => {
        beforeAll(async () => {
            const creds = {
                username: "HTTPtestUser",
                password: "qwerty"
            }
            await request(app).post('/api/admin/login').send(creds)
                .then(res => {
                    (global as any).JWS_TOKEN = res.body.token;
                })

        })
        test('Changing text content with POST-request works', async () => {
            const newContent = {
                title: 'Test title',
                content: 'Test content'
            }
            let fetchedStatus;
            await request(app).put('/api/contents/about/1').send(newContent).set('Authorization', 'Bearer ' + (global as any).JWS_TOKEN)
                .then(res => {
                    fetchedStatus = res.status;
                })
                .then(
                    async () => {
                        await pool.query('UPDATE about_contents SET title = ?, content = ? WHERE title = ?', ['Title', 'Content', 'Test title'])
                    }
                )
            expect(fetchedStatus).toBe(201)
        })
        test('Faulty image upload fails', async () => {
            const faultyImage = null
            const imageTitle = 'Test image title'
            await request(app).post('/api/images/about').send({image: faultyImage, title: imageTitle}).set('Authorization', 'Bearer ' + (global as any).JWS_TOKEN)
                .then(res => {
                    expect(res.status).toBe(400)
                })
        })
        test('Image upload with POST-request works', async () => {
            const imageTitle = 'Test image title'
            await request(app).post('/api/images/about').field("title", imageTitle).field("tag", 'ABOUT').attach('image', path.resolve(__dirname, './testImages/testImage.jpg')).set('Authorization', 'Bearer ' + (global as any).JWS_TOKEN)
                .then(res => {
                    (global as any).test_image_id = res.body.id;
                    expect(res.status).toBe(201)
                })
        }, 10000)
        test('Image deletion with faulty id fails', async () => {
            const faultyId = 0;
            await request(app).delete('/api/images/about/' + faultyId).set('Authorization', 'Bearer ' + (global as any).JWS_TOKEN)
                .then(res => {
                    expect(res.status).toBe(404)
                })
        })
        test('Image deletion with id and DELETE-request works', async () => {
            const imageId = (global as any).test_image_id;
            await request(app).delete('/api/images/about/' + imageId).set('Authorization', 'Bearer ' + (global as any).JWS_TOKEN)
                .then(res => {
                    expect(res.status).toBe(200)
                })
        })
    })
});