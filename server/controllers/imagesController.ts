import { Request, Response } from 'express'; 

const getImages = (req: Request, res: Response) => {
    res.status(200).send('Images route works!')
}

export { getImages }