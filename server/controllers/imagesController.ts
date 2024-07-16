import { Request, Response } from 'express'; 

const getGalleryImages = (req: Request, res: Response) => {
    res.status(200).send('Images route works!')
}

export { getGalleryImages }