import { Request, Response } from 'express';
import pool from '../utils/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

interface userData {
    ID: number,
    USERNAME: string,
    PASSWORD: string
}

const adminRegister = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query('INSERT INTO USERS (username, password) VALUES (?, ?)', [username, hashedPassword]);
    res.status(201).send('User registered');
}

const adminLogin = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const [rows, fields] = await pool.query('SELECT * FROM USERS WHERE username = ?', [username]) as [userData[], any];

        if (!rows.length) {
            return res.status(404).send('No content found');
        }

        const user = rows.map(row => ({
            id: row.ID,
            username: row.USERNAME,
            password: row.PASSWORD
        }))[0];

        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ id: user.id }, process.env.JWS_SECRET || '', { expiresIn: '1h' });
            res.json({ token });
        } else {
            res.status(401).send('Invalid credentials');
        }
    } catch (error) {
        console.error("Error fetching admin data: ", error);
    };
};

export {
    adminLogin,
    adminRegister
}