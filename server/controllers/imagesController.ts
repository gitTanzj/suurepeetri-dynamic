import { Request, Response } from 'express'; 
import fs from 'fs/promises';
import pool from '../utils/db';
import multer from 'multer';

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

const getAboutImages = async (req: Request, res: Response) => {
     try {
        const [rows, fields] = await pool.query(
            'SELECT IMAGES.ID, IMAGES.TITLE, IMAGES.URL FROM IMAGES INNER JOIN IMAGES_TAGS ON IMAGES.ID = IMAGES_TAGS.IMAGE_ID INNER JOIN TAGS ON TAGS.ID = IMAGES_TAGS.TAG_ID WHERE TAGS.TITLE = ?', ['ABOUT']
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
        console.error("Error fetching about image: ", err);
        res.status(500).send('Failed to fetch about images');
     }
}

const getTentImages = async (req: Request, res: Response) => {
    try {
        const [rows, fields] = await pool.query(
            'SELECT IMAGES.ID, IMAGES.TITLE, IMAGES.URL FROM IMAGES INNER JOIN IMAGES_TAGS ON IMAGES.ID = IMAGES_TAGS.IMAGE_ID INNER JOIN TAGS ON TAGS.ID = IMAGES_TAGS.TAG_ID WHERE TAGS.TITLE = ?', ['TENT']
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
        console.error("Error fetching about image: ", err);
        res.status(500).send('Failed to fetch about images');
     }
}

const getMansionImages = async (req: Request, res: Response) => {
    try {
        const [rows, fields] = await pool.query(
            'SELECT IMAGES.ID, IMAGES.TITLE, IMAGES.URL FROM IMAGES INNER JOIN IMAGES_TAGS ON IMAGES.ID = IMAGES_TAGS.IMAGE_ID INNER JOIN TAGS ON TAGS.ID = IMAGES_TAGS.TAG_ID WHERE TAGS.TITLE = ?', ['MANSION']
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
        console.error("Error fetching about image: ", err);
        res.status(500).send('Failed to fetch about images');
     }  
}

const getGalleryImages = async (req: Request, res: Response) => {
    try {
        const [rows, fields] = await pool.query(
            'SELECT IMAGES.ID, IMAGES.TITLE, IMAGES.URL FROM IMAGES INNER JOIN IMAGES_TAGS ON IMAGES.ID = IMAGES_TAGS.IMAGE_ID INNER JOIN TAGS ON TAGS.ID = IMAGES_TAGS.TAG_ID WHERE TAGS.TITLE = ?', ['GALLERY']
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
        console.error("Error fetching about image: ", err);
        res.status(500).send('Failed to fetch about images');
     }
}

const getContactImages = async (req: Request, res: Response) => {
    try {
        const [rows, fields] = await pool.query(
            'SELECT IMAGES.ID, IMAGES.TITLE, IMAGES.URL FROM IMAGES INNER JOIN IMAGES_TAGS ON IMAGES.ID = IMAGES_TAGS.IMAGE_ID INNER JOIN TAGS ON TAGS.ID = IMAGES_TAGS.TAG_ID WHERE TAGS.TITLE = ?', ['CONTACT']
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
        console.error("Error fetching about image: ", err);
        res.status(500).send('Failed to fetch about images');
     }
}

// UPLOAD FILE TO IMAGES WITH TITLE
// CREATE DATABASE INSTANCE FOR THE IMAGE IN IMAGES
// CREATE DATABASE CONNECTION INSTANCE WITH TAGS
// RETURN IMAGE URL
// SEND RESPONSE

const postImage = async (req: Request, res: Response) => {
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

export {
    getImageById,
    getGalleryImages,
    getAboutImages,
    getTentImages,
    getMansionImages,
    getContactImages,
    postImage
 }