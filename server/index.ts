import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
const PORT = 4000;
const app = express();

app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'DELETE', 'PUT']
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World!')
})

import imagesRouter from './routes/images';
app.get('/images', imagesRouter)

import contentsRouter from './routes/contents';
app.get('/contents', contentsRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})