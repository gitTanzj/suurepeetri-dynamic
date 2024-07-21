import { Request, Response } from 'express'; 
import fs from 'fs/promises';

const getAboutImages = async (req: Request, res: Response) => {
    const files = await fs.readdir('./images/about');
    res.status(200).json(files);    
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