import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
const PORT = 4000;
const app = express();

const imagesDirectory = path.join(__dirname, '/images');

app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: ['Content-Type', 'User-Agent', 'Range'],
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req: Request, res: Response, next: Function) => {
    console.log(req.method, req.path, req.ip);
    next();
});

app.get('/', (req: Request, res: Response) => {
    res.send('This is the Suurepeetri website API!')
})

app.use('/images', express.static(imagesDirectory));

import imagesRouter from './routes/images';
app.use('/api/images', imagesRouter);

import contentsRouter from './routes/contents';
app.use('/api/contents', contentsRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});