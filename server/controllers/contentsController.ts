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
            return res.status(404).json({
                message:'No content found'
            });
        }

        const data = rows.map(row => ({
            id: row.ID,
            title: row.TITLE,
            content: row.CONTENT
        }));

        res.header('Content-Range', `count=0-${data.length - 1}/${data.length}`).header('Access-Control-Expose-Headers', 'Content-Range');
        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching about content: ", error);
        res.status(500).json({
            message: 'Failed to fetch about content'
        });
    }
}

const getOneAboutContent = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const [rows, fields] = await pool.query('SELECT * FROM ABOUT_CONTENTS WHERE ID = ?', [id]) as [AboutContent[], any];

        if (!rows.length) {
            return res.status(404).json({
                message:'No content found'
            });
        }

        const data = rows.map(row => ({
            id: row.ID,
            title: row.TITLE,
            content: row.CONTENT
        }));

        res.header('Content-Range', `count=0-1`).header('Access-Control-Expose-Headers', 'Content-Range');
        res.status(200).json(data[0]);
    } catch (error) {
        console.error("Error fetching about content: ", error);
        res.status(500).json({
            message: 'Failed to fetch about content'
        });
    }
}

const changeAboutContent = async (req: Request, res: Response) => {
    const { title, content } = req.body
    const id = req.params.id;
    try {
        await pool.query('UPDATE ABOUT_CONTENTS SET TITLE = ?, CONTENT = ? WHERE ID = ?', [title, content, id]);

        const updatedData = {
            id: id,
            title: title,
            content: content
        };

        res.status(201).json(updatedData);
    } catch (err) {
        console.error("Failed to update about content: ", err);
        res.status(400).json({
            message:'Failed to update about content'
        });
    }
}

const getContactContent = async (req: Request, res: Response) => {
    try {
        const [rows, fields] = await pool.query('SELECT * FROM CONTACT_CONTENTS') as [ContactContent[], any];

        if (!rows.length) {
            return res.status(404).json({
                message: 'No content found'
            });
        }

        const data = rows.map(row => ({
            id: row.ID,
            title: row.TITLE,
            email: row.EMAIL,
            phone_number: row.PHONE_NUMBER,
            address: row.ADDRESS
        }));

        res.header('Content-Range', `count=0-${data.length - 1}/${data.length}`).header('Access-Control-Expose-Headers', 'Content-Range');
        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching contact content: ", error);
        res.status(500).json({
            message: 'Failed to fetch contact content'
        });
    }
}

const getOneContactContent = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const [rows, fields] = await pool.query('SELECT * FROM CONTACT_CONTENTS WHERE ID = ?', [id]) as [ContactContent[], any];

        if (!rows.length) {
            return res.status(404).json({
                message: 'No content found'
            });
        }

        const data = rows.map(row => ({
            id: row.ID,
            title: row.TITLE,
            email: row.EMAIL,
            phone_number: row.PHONE_NUMBER,
            address: row.ADDRESS
        }));

        res.header('Content-Range', `count=0-1`).header('Access-Control-Expose-Headers', 'Content-Range');
        res.status(200).json(data[0]);
    } catch (error) {
        console.error("Error fetching contact content: ", error);
        res.status(500).json({
            message:'Failed to fetch contact content'
        });
    }

}

const changeContactContent = async (req: Request, res: Response) => {
    const { title, email, phone_number, address } = req.body
    const id = req.params.id;
    try {
        await pool.query('UPDATE CONTACT_CONTENTS SET TITLE = ?, EMAIL = ?, PHONE_NUMBER = ?, ADDRESS = ? WHERE ID = ?',[title, email, phone_number, address, id]);

        const updatedData = {
            id: id,
            title: title,
            email: email,
            phone_number: phone_number,
            address: address
        };

        res.status(201).json(updatedData);
    } catch (err) {
        console.error("Failed to update contact content: ", err);
        res.status(400).json({
            message:'Failed to update contact content'
        });
    }
}

const getHousingOptionsContent = async (req: Request, res: Response) => {
    try {
        const [rows, fields] = await pool.query('SELECT * FROM HOUSING_OPTIONS') as [HousingOptionContent[], any];

        if (!rows.length) {
            return res.status(404).json({
                message: 'No content found'
            });
        }

        const data = rows.map(row => ({
            id: row.ID,
            title: row.TITLE,
            content: row.CONTENT,
            page: row.PAGE
        }));

        res.header('Content-Range', `count=0-${data.length - 1}/${data.length}`).header('Access-Control-Expose-Headers', 'Content-Range');
        res.status(200).json(data);
    } catch (error){
        console.error(`Error fetching housing options content: `, error);
        res.status(500).json({
            message:`Failed to fetch housing options content`
        });
    }
}

const getHousingOptionContent = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const [rows, fields] = await pool.query('SELECT * FROM HOUSING_OPTIONS WHERE ID = ?;', [id]) as [HousingOptionContent[], any];

        if (!rows.length) {
            return res.status(404).json({
                message: 'No content found'
            });
        }

        const data = rows.map(row => ({
            id: row.ID,
            title: row.TITLE,
            content: row.CONTENT,
            page: row.PAGE
        }));

        res.header('Content-Range', `count=0-1`).header('Access-Control-Expose-Headers', 'Content-Range');
        res.status(200).json(data[0]);
    } catch (error) {
        console.error(`Error fetching content: `, error);
        res.status(500).json({
            message:`Failed to fetch content`
        });
    }
}

const changeHousingOptionContent = async (req: Request, res: Response) => {
    const { title, content, page } = req.body
    const id = req.params.id;
    try {
        await pool.query('UPDATE HOUSING_OPTIONS SET TITLE = ?, CONTENT = ? WHERE ID = ?', [title, content, id]);

        const updatedData = {
            id: id,
            title: title,
            content: content,
            page: page
        };

        res.status(201).json(updatedData);
    } catch (err) {
        console.error(`Failed to update ${page} content: `, err);
        res.status(400).json({
            message:`Failed to update ${page} content`
        });
    }
}



export {
    getAboutContent,
    getOneAboutContent,

    getContactContent,
    getOneContactContent,

    getHousingOptionsContent,
    getHousingOptionContent,

    changeAboutContent,
    changeContactContent,
    changeHousingOptionContent
}