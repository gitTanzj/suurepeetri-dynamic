import { Request, Response } from 'express';
import pool from '../utils/db';

interface AboutContent {
    ID: number,
    TITLE: string,
    CONTENT: string
}

interface ContactContent {
    ID: number,
    TITLE: string,
    EMAIL: string,
    PHONE_NUMBER: string,
    ADDRESS: string
}

interface HousingOptionContent {
    ID: number,
    TITLE: string,
    CONTENT: string,
    PAGE: string
}

const getAboutContent = async (req: Request, res: Response) => {
    try {
        const [rows, fields] = await pool.query('SELECT * FROM ABOUT_CONTENTS') as [AboutContent[], any];

        if (!rows.length) {
            return res.status(404).send('No content found');
        }

        const data = rows.map(row => ({
            id: row.ID,
            title: row.TITLE,
            content: row.CONTENT
        }));

        res.header('Content-Range', `about=0-1`).header('Access-Control-Expose-Headers', 'Content-Range');
        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching about content: ", error);
        res.status(500).send('Failed to fetch about content');
    }
}

const changeAboutContent = async (req: Request, res: Response) => {
    const { title, content } = req.body
    const id = req.params.id;
    await pool.query('UPDATE ABOUT_CONTENTS SET TITLE = ?, CONTENT = ? WHERE id = ?', [title, content, id])
    .then(response => {
        res.status(201).json({data: response})
    }).catch(err => {
        res.status(400).send('Failed to update about content')
    });
}

const getContactContent = async (req: Request, res: Response) => {
    try {
        const [rows, fields] = await pool.query('SELECT * FROM CONTACT_CONTENTS') as [ContactContent[], any];

        if (!rows.length) {
            return res.status(404).send('No content found');
        }

        const data = rows.map(row => ({
            id: row.ID,
            title: row.TITLE,
            email: row.EMAIL,
            phone_number: row.PHONE_NUMBER,
            address: row.ADDRESS
        }));

        res.header('Content-Range', `contact=0-1`).header('Access-Control-Expose-Headers', 'Content-Range');
        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching contact content: ", error);
        res.status(500).send('Failed to fetch contact content');
    }
}

const changeContactContent = async (req: Request, res: Response) => {
    const { title, email, phone_number, address } = req.body
    const id = req.params.id;
    await pool.query('UPDATE CONTACT_CONTENTS SET TITLE = ?, EMAIL = ?, PHONE_NUMBER = ?, ADDRESS = ? WHERE id = ?', [title, email, phone_number, address, id])
    .then(response => {
        res.status(201).json(response)
    }).catch(err => {
        res.status(400).send('Failed to update about content')
    });
}

const getHousingOptionsContent = async (req: Request, res: Response) => {
    try {
        const [rows, fields] = await pool.query('SELECT * FROM HOUSING_OPTIONS') as [HousingOptionContent[], any];

        if(!rows.length) {
            return res.status(404).send('No content found');
        }

        const data = rows.map(row => ({
            id: row.ID,
            title: row.TITLE,
            content: row.CONTENT,
            page: row.PAGE
        }));

        res.header('Content-Range', `housing=0-1`).header('Access-Control-Expose-Headers', 'Content-Range');
        res.status(200).json(data);
    } catch (error){
        console.error(`Error fetching housing options content: `, error);
        res.status(500).send(`Failed to fetch housing options content`);
    }
}

const getHousingOptionContent = async (req: Request, res: Response) => {
    const type = req.params.type;
    try {
        const [rows, fields] = await pool.query('SELECT * FROM HOUSING_OPTIONS WHERE PAGE = ?;', [type]) as [HousingOptionContent[], any];

        if (!rows.length) {
            return res.status(404).send('No content found');
        }

        const data = rows.map(row => ({
            id: row.ID,
            title: row.TITLE,
            content: row.CONTENT
        }));

        res.header('Content-Range', `${type}=0-1`).header('Access-Control-Expose-Headers', 'Content-Range');
        res.status(200).json(data);
    } catch (error) {
        console.error(`Error fetching ${type} content: `, error);
        res.status(500).send(`Failed to fetch ${type} content`);
    }
}

const changeHousingOptionContent = async (req: Request, res: Response) => {
    const type = req.params.type;
    const { title, content } = req.body;
    await pool.query('UPDATE HOUSING_OPTIONS SET TITLE = ?, CONTENT = ? WHERE PAGE = ?', [title, content, type])
    .then(response => {
        res.status(201).json(response)
    }).catch(err => {
        res.status(400).send('Failed to update about content')
    });
}



export {
    getAboutContent,
    getContactContent,
    getHousingOptionsContent,
    getHousingOptionContent,

    changeAboutContent,
    changeContactContent,
    changeHousingOptionContent
}