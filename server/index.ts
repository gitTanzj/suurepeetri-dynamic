import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
const PORT = 4000;
const app = express();

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})