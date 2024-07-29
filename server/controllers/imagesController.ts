import { Request, Response } from 'express'; 
import fs from 'fs/promises';
import pool from '../utils/db';
import multer from 'multer';
import { EventEmitter } from 'events';

// Increase the max listeners limit
EventEmitter.defaultMaxListeners = 20;

interface Image {
    ID: number,
    TITLE: string,
    URL: string
}

const getImageById = async (req: Request, res: Response) => {
    try {
        const [rows, fields] = await pool.query(
            'SELECT IMAGES.ID, IMAGES.TITLE, IMAGES.URL FROM IMAGES WHERE IMAGES.ID = ?', [req.params.id]
        ) as [Image[], any];

        if (!rows.length) {
            return res.status(404).send('No content found');
        }
        const data = rows.map(row => ({
            id: row.ID,
            title: row.TITLE,
            url: row.URL
        }));
        res.header('Content-Range', `count=0-${data.length - 1}/${data.length}`).header('Access-Control-Expose-Headers', 'Content-Range');
        res.status(200).json(data);
    } catch(err) {
        console.error("Error fetching image: ", err);
        res.status(500).send('Failed to fetch image');
     }
}

const getImagesByTag = async (req: Request, res: Response, tag: string) => {
    try {
        const [rows, fields] = await pool.query(
            'SELECT IMAGES.ID, IMAGES.TITLE, IMAGES.URL FROM IMAGES INNER JOIN IMAGES_TAGS ON IMAGES.ID = IMAGES_TAGS.IMAGE_ID INNER JOIN TAGS ON TAGS.TAG = IMAGES_TAGS.TAG WHERE TAGS.TAG = ?', [tag]
        ) as [Image[], any];
        if (!rows.length) {
            return res.status(404).send('No content found');
        }
        const data = rows.map(row => ({
            id: row.ID,
            title: row.TITLE,
            url: row.URL
        }));

        res.header('Content-Range', `count=0-${data.length - 1}/${data.length}`).header('Access-Control-Expose-Headers', 'Content-Range');
        res.status(200).json(data);
     } catch(err) {
        console.error(`Error fetching images by tag: ${tag}}: `, err);
        res.status(500).send(`Failed to fetch images by tag: ${tag}`);
     }
}

const getAboutImages = async (req: Request, res: Response) => {
    getImagesByTag(req, res, 'ABOUT');
}

const getTentImages = async (req: Request, res: Response) => {
    getImagesByTag(req, res, 'TENT');
}

const getMansionImages = async (req: Request, res: Response) => {
    getImagesByTag(req, res, 'MANSION');
}

const getGalleryImages = async (req: Request, res: Response) => {
    getImagesByTag(req, res, 'GALLERY');
}

const getContactImages = async (req: Request, res: Response) => {
    getImagesByTag(req, res, 'CONTACT');
}

const postImage = async (req: Request, res: Response) => {
    const file = req.file;
    const { title } = req.body;
    const tag = req.params.page.toUpperCase();
    if (!file) {
        return res.status(400).send('No file uploaded');
    }
    if (!title) {
        return res.status(400).send('No title provided');
    }
    try{
        const [images] = await pool.query('SELECT * FROM IMAGES WHERE URL = ?', [`http://localhost:4000/images/${file.originalname}`]) as [Image[], any];
        if (images.length > 0) {
            const [images_tags] = await pool.query('SELECT * FROM IMAGES_TAGS WHERE IMAGE_ID = ? AND TAG = ?', [images[0].ID, tag]) as [{IMAGE_ID:number, TAG:string}[], any];
            if(images_tags.length > 0){
                res.status(409).send('Image already exists');
            } else {
                try {
                    await pool.query('INSERT INTO IMAGES_TAGS (IMAGE_ID, TAG) VALUES (?, ?)', [images[0].ID, tag]);
                    res.status(201).send('File uploaded successfully');
                } catch(err) {
                    console.error("Error uploading image: ", err);
                    res.status(500).send('Failed to upload image');
                }
            }
        } else {
            try {
                    const [countRows] = await pool.query('SELECT COUNT(*) AS count FROM IMAGES') as [{count: number}[], any];
                    const imageId = countRows[0].count + 1;
                    await pool.query('INSERT INTO IMAGES (ID, TITLE, URL) VALUES (?, ?, ?)', [imageId, title, `http://localhost:4000/images/${file.originalname}`]);
                    await pool.query('INSERT INTO IMAGES_TAGS (IMAGE_ID, TAG) VALUES (?, ?)', [imageId, tag]);
                    res.status(201).send('File uploaded successfully');
                } catch(err) {
                    console.error("Error uploading image: ", err);
                    res.status(500).send('Failed to upload image');
                }
        }
    } catch(err){
        console.error("Error checking image: ", err);
        res.status(500).send('Failed to check image');
    }
    
}


const modifyImage = async (req: Request, res: Response) => {
    const file = req.file;
    const { title, tags } = req.body;
    if (!file) {
        return res.status(400).send('No file uploaded');
    }
    if (!title) {
        return res.status(400).send('No title provided');
    }
    if (!tags) {
        return res.status(400).send('No tags provided');
    }
    console.log('File: ', file);
    res.status(201).send('File uploaded successfully');
}

const deleteImage = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).send('No id provided');
    }
    try {
       
        res.status(204).send('Image deleted successfully');
    } catch(err) {
        console.error("Error deleting image: ", err);
        res.status(500).send('Failed to delete image');
    }
}

export {
    getImageById,
    getGalleryImages,
    getAboutImages,
    getTentImages,
    getMansionImages,
    getContactImages,

    postImage
 }