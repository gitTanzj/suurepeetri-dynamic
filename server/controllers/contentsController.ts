import { Request, Response } from 'express';
import pool from '../utils/db';

interface AboutContent {
    id: number,
    title: string,
    content: string
}

interface Results {
    rows: AboutContent[]
}

const getAboutContent = async (req: Request, res: Response) => {
    const [rows, fields] = await pool.query('SELECT * FROM ABOUT_CONTENTS') as [AboutContent[], any];
    
    console.log(rows[0])
    res.header('Content-Range', `about=0-${rows.length - 1}`).header('Access-Control-Expose-Headers', 'Content-Range');
    res.status(200).json({ data: rows as AboutContent[] });
}

const changeAboutContent = async (req: Request, res: Response) => {
    const { title, content } = req.body
    await pool.query('UPDATE ABOUT_CONTENTS SET TITLE = ?, CONTENT = ? WHERE id = 1', [title, content])
    .then(response => {
        res.status(201).json(response)
    }).catch(err => {
        res.status(400).send('Failed to update about content')
    });
}

const getContactContent = async (req: Request, res: Response) => {
    const [results] = await pool.query('SELECT * FROM CONTACT_CONTENTS')
    res.status(200).json(results)
}

const changeContactContent = async (req: Request, res: Response) => {
    const { title, email, phone_number, address } = req.body
    await pool.query('UPDATE CONTACT_CONTENTS SET TITLE = ?, EMAIL = ?, PHONE_NUMBER = ?, ADDRESS = ? WHERE id = 1', [title, email, phone_number, address])
    .then(response => {
        res.status(201).json(response)
    }).catch(err => {
        res.status(400).send('Failed to update about content')
    });
}

const getHousingOptionContent = async (req: Request, res: Response) => {
    const type = req.params.type;
    const [results] = await pool.query('SELECT * FROM HOUSING_OPTIONS WHERE PAGE = ?;', [type])
    res.status(200).json(results)
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
    getHousingOptionContent,

    changeAboutContent,
    changeContactContent,
    changeHousingOptionContent
}