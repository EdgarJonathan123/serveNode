import { Request, Response } from 'express';
const database = require('../database');

class UserCtl {

    async updateUser(req: Request, res: Response) {

        let query = `
            update usuario  
            set 
                nombre              = :nombre,
                apellido            = :apellido,
                contrasenia         = :contrasenia,
                correo              = :correo,
                telefono            = :telefono,
                genero              = :genero,
                foto                = :foto,
                direccion           = :direccion
            where idusuario = :id`;



            // genero              = :genero,
            // fecha_nacimiento    = :fecha_nacimiento,

        const binds = {
            id: req.body.IDUSUARIO,
            nombre: req.body.NOMBRE,
            apellido: req.body.APELLIDO,
            contrasenia: req.body.CONTRASENIA,
            correo: req.body.CORREO,
            telefono: req.body.TELEFONO,
            foto: req.body.FOTO,    
            genero: req.body.GENERO,
            // fecha_nacimiento: req.body.FECHA_NACIMIENTO,
            direccion: req.body.DIRECCION
            // tipo_cliente: 3,
            // credito: 0,
            // ganancia: 0
        };

        // console.log('Consulta: ',query);
        // console.log('Variables: ',binds);
        // console.log('id: ',req.body.IDUSUARIO);

        try {
            await database.simpleExecute(query, binds);
            res.json({message: "yes"});
            // console.log('yes');

            // query = `select * from usuario`;
            // const usuarios = await database.simpleExecute(query);
            // console.log(usuarios);

        } catch (error) {
            console.error(error);
        }
    }

    async getUserById(req: Request, res: Response) {
        try {
            let query = `select     idusuario,nombre,apellido,
                                    contrasenia,correo,telefono,
                                    foto,genero,fecha_nacimiento,
                                    fecha_registro,direccion
                         from usuario
                         where idusuario = :id`;



            const binds = {
                id: req.params.id
            };

            const response = await database.simpleExecute(query, binds);
            res.json(response.rows);
            console.log(response);

        } catch (err) {
            console.error(err);
        }

    }

    async getUsers(req: Request, res: Response) {

        try {
            let query = `select     idusuario,nombre,apellido,
                                    contrasenia,correo,telefono,
                                    foto,genero,fecha_nacimiento,
                                    fecha_registro,direccion
                         from usuario
                         where tipo_cliente = 3`;
            const response = await database.simpleExecute(query);
            res.json(response.rows);
            console.log(response);

        } catch (err) {
            console.error(err);
        }

    }

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
            // query = `select * from usuario`;
            // const encuestas = await database.simpleExecute(query);
            // console.log(encuestas);

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