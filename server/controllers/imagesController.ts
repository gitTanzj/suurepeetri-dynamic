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
            return res.status(404).json({
                message: 'No content found'
            });
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
        res.status(500).json({
            message: 'Failed to fetch image'
        });
     }
}

const getImagesByTag = async (req: Request, res: Response, tag: string) => {
    try {
        const [rows, fields] = await pool.query(
            'SELECT IMAGES.ID, IMAGES.TITLE, IMAGES.URL FROM IMAGES INNER JOIN IMAGES_TAGS ON IMAGES.ID = IMAGES_TAGS.IMAGE_ID INNER JOIN TAGS ON TAGS.TAG = IMAGES_TAGS.TAG WHERE TAGS.TAG = ?', [tag]
        ) as [Image[], any];
        if (!rows.length) {
            return res.status(404).json({
                message: 'No content found'
            });
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
        res.status(500).json({
            message: `Failed to fetch images by tag: ${tag}`
        });
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
        return res.status(400).json({
            message: 'No file uploaded'
        });
    }
    if (title.length === 0) {
        return res.status(400).json({
            message: 'No title provided'
        });
    }
    try{
        const [images] = await pool.query('SELECT * FROM IMAGES WHERE URL = ?', [`http://localhost:4000/images/${file.originalname}`]) as [Image[], any];
        if (images.length > 0) {
            const id = images[0].ID;
            const [images_tags] = await pool.query('SELECT * FROM IMAGES_TAGS WHERE IMAGE_ID = ? AND TAG = ?', [images[0].ID, tag]) as [{IMAGE_ID:number, TAG:string}[], any];
            if(images_tags.length > 0){
                res.status(409).json({
                    message: 'Image with provided title and/or tag already exists'
                });
            } else {
                try {
                    await pool.query('INSERT INTO IMAGES_TAGS (IMAGE_ID, TAG) VALUES (?, ?)', [id, tag]);
                    res.status(201).json({
                        message: 'File uploaded successfully',
                        id: id
                    });
                } catch(err) {
                    console.error("Error uploading image: ", err);
                    res.status(500).json({
                        message: 'Failed to upload image'
                    });
                }
            }
        } else {
            try {
                    const [countRows] = await pool.query('SELECT COUNT(*) AS count FROM IMAGES') as [{count: number}[], any];
                    const imageId = countRows[0].count + 1;
                    await pool.query('INSERT INTO IMAGES (ID, TITLE, URL) VALUES (?, ?, ?)', [imageId, title, `http://localhost:4000/images/${file.originalname}`]);
                    await pool.query('INSERT INTO IMAGES_TAGS (IMAGE_ID, TAG) VALUES (?, ?)', [imageId, tag]);
                    res.status(201).json({
                        message: 'File uploaded successfully',
                        id: imageId
                    });
                } catch(err) {
                    console.error("Error uploading image: ", err);
                    res.status(500).json({
                        message: 'Failed to upload image'
                    });
                }
        }
    } catch(err){
        console.error("Error checking image: ", err);
        res.status(500).json({
            message:'Failed to check image'
        });
    }
    
}



const deleteImage = async (req: Request, res: Response) => {
    const id = req.params.id;
    const tag = req.params.page.toUpperCase();
    if (!id) {
        return res.status(400).json({
            message:'No id provided'
        });
    }
    if (!tag) {
        return res.status(400).json({
            message:'No tag provided'
        });
    }
    try {
        const [delResult] = await pool.query('DELETE FROM IMAGES_TAGS WHERE IMAGE_ID = ? AND TAG = ?', [id, tag]) as [any, any];
        if (delResult.affectedRows === 0) {
            return res.status(404).json({
                message: 'No intermediary entry with provided id and tag found'
            });
        } else {
            const [rows, fields] = await pool.query('SELECT * FROM IMAGES_TAGS WHERE IMAGE_ID = ?', [id]) as [any[], any];
            if(rows.length === 0){
                const [imageURLs] = await pool.query('SELECT URL FROM IMAGES WHERE ID = ?', [id]) as [{URL: string}[], any];
                const imageURL = imageURLs[0].URL;
                const [delResult] = await pool.query('DELETE FROM IMAGES WHERE ID = ?', [id]) as [any, any];
                if (delResult.affectedRows === 0) {
                    return res.status(404).json({
                        message: 'No image with provided id found'
                    });
                } else {
                    fs.unlink(`./images/${imageURL.split('/').pop()}`)
                    .then((result) => {
                        res.status(200).json({
                            message: 'Image deleted successfully'
                        });
                    })
                    .catch((err) => {
                        console.error("Error deleting image: ", err);
                        res.status(500).json({
                            message:'Failed to delete image'
                        });
                    });
                }
            } else {
                res.status(200).json({
                    message:'Image deleted successfully'
                });
            }   
        }
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

    postImage,
    deleteImage
 }