import { 
    describe,
    expect,
    test,
    afterEach,
    beforeAll,
    afterAll
} from '@jest/globals';
import request from 'supertest';

import app from './index.ts';

describe('Test admin registration', () => {
    afterEach(() => {
        // pool.query('DELETE FROM USERS WHERE username = ?', ['testUser'])
    })
    test('Admin registration works', () => {
        const creds = {
            username: 'testUser',
            password: 'testUserPassword'
        }

        request(app).post('/api/admin/register').send(creds)
        .then(res => {
            expect(res.status).toBe(201)
        })
    })
})

describe('Test admin login', () => {
    test('Admin login works', () => {

    })
    test('Admin login fails with incorrect credentials', () => {

    })
})

describe('Test HTTP requests on text data', () => {
    test('Text content fetching with GET-request works', () => {

    })
    test('Changing text content with POST-request works', () => {

    })
})

describe('Test HTTP requests on multi-form data', () => {
    test('Image fetching with GET-request works', () => {

    })
    test('Faulty image upload fails', () => {

    })
    test('Image upload with POST-request works', () => {

    })
    test('Image deletion with id and DELETE-request works', () => {

    })
    test('Image deletion with faulty id fails', () => {

    })
})