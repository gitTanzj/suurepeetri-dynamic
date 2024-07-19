import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
const PORT = 4000;
const app = express();

app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: ['Content-Type', 'User-Agent', 'Range'],
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log(req.method, req.path, req.ip);
});

app.get('/', (req, res) => {
    res.send('This is the Suurepeetri website API!')
})

import imagesRouter from './routes/images';
app.use('/api/images', imagesRouter)

import contentsRouter from './routes/contents';
app.use('/api/contents', contentsRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})