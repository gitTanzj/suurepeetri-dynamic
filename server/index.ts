import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
const PORT = 4000;
const app = express();

app.use(cors());

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