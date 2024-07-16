import { Request, Response } from 'express';
import pool from '../utils/db';

interface aboutContent {
    id: number,
    title: string,
    content: string
}

const getAboutContent = async (req: Request, res: Response) => {
    const data = await pool.query('SELECT * FROM ABOUT_CONTENTS')
    const aboutContent = data[0]
    res.status(200).json(aboutContent)
}

const getContactContent = (req: Request, res: Response) => {

}

const getTentContent = (req: Request, res: Response) => {

}

const getMansionContent = (req: Request, res: Response) => {

}

export {
    getAboutContent,
    getContactContent,
    getTentContent,
    getMansionContent
}