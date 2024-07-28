import { Request, Response } from 'express'; 
import fs from 'fs/promises';
import pool from '../utils/db';

interface Image {
    ID: number,
    TITLE: string,
    URL: string
}

const getAboutImages = async (req: Request, res: Response) => {
     try {
        const [rows, fields] = await pool.query('SELECT * FROM ABOUT_IMAGES') as [Image[], any];
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
    const files = await fs.readdir('./images/tent');
    res.status(200).json(files);    
}

const getMansionImages = async (req: Request, res: Response) => {
    const files = await fs.readdir('./images/mansion');
    res.status(200).json(files);    
}

const getGalleryImages = async (req: Request, res: Response) => {
    const directories = (await fs.readdir('./images')).filter((dir) => {
        return dir !== 'about' && dir !== 'contact';
    });
    const files = await Promise.all(directories.map(async (directory) => {
        const dirFiles = await fs.readdir(`./images/${directory}`);
        return dirFiles.map((file) => `${directory}/${file}`);
    }));
    res.status(200).json(files.flat());
}

const getContactImages = async (req: Request, res: Response) => {
    const files = await fs.readdir('./images/contact');
    res.status(200).json(files);
}

export {
    getGalleryImages,
    getAboutImages,
    getTentImages,
    getMansionImages,
    getContactImages
 }