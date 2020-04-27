import { Request, Response } from 'express';
const database = require('../database');

class UserCtl {

    async createClient(req: Request, res: Response) {

        let query = `
        begin
        setClient(
                    :nombre, 
                    :apellido,
                    :contrasenia,
                    :correo,
                    :telefono,
                    :foto,
                    :genero,
                    :fecha_nacimiento,
                    :direccion,
                    :tipo_cliente,  
                    :credito,
                    :ganancia
                 );
        end;`;

        const binds = {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            contrasenia: req.body.contrasenia,
            correo: req.body.correo,
            telefono: req.body.telefono,
            foto: req.body.foto,
            genero: req.body.genero,
            fecha_nacimiento: req.body.fecha_nacimiento,
            direccion: req.body.direccion,
            tipo_cliente: 3,
            credito: 0,
            ganancia: 0
        };


        try {
            await database.simpleExecute(query, binds);
            res.json({ message: 'yes' });
            query = `select * from usuario`;
            const encuestas = await database.simpleExecute(query);
            console.log(encuestas);

        } catch (err) {
            console.error(err);
        }
    }

    async clientExist(req: Request, res: Response) {

        //agregamos un comentario xd olv 
        let query = `
        select tipo_cliente
        from usuario
        where correo = :correo and contrasenia = :contrasenia`;

        const binds = {
            contrasenia: req.body.contrasenia,
            correo: req.body.correo
        };

        console.log(binds);

        try {

            const response = await database.simpleExecute(query, binds);

            if (response.rows.length === 1) {
                res.status(200).json(response.rows[0]);
            } else {
                console.log('Que paso amiguito xd');
                res.status(404).end();
            }

        } catch (err) {
            console.error(err);
        }

    }


}

export const userCtl = new UserCtl();