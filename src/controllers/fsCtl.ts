import { Request, Response } from 'express';
const database = require('../database');

class FileController {


    async prueba(req: Request, res: Response)
    {

        console.log(req.body);

        res.json({ message: 'Comunicacion Exitosa' });
        

        // res.json({Response: "Folder created"});
    }
    

}

export const fsController = new FileController();