import { Request, Response } from 'express';
const database = require('../database');

class UserCtl {

    async deleteUser(req:Request,res:Response){

        let query = `delete from usuario where id = :id`;

        const binds = {
            id: req.params.id
        };

        console.log(binds);

        try {

            await database.simpleExecute(query, binds);
            res.json({message: "Usuario Eliminado"});

        } catch (error) {
            console.error(error);
        }
        
    }

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
                direccion           = :direccion
            where id = :id`;



            // genero              = :genero,
            // fecha_nacimiento    = :fecha_nacimiento,

        const binds = {
            id: req.body.ID,
            nombre: req.body.NOMBRE,
            apellido: req.body.APELLIDO,
            contrasenia: req.body.CONTRASENIA,
            correo: req.body.CORREO,
            telefono: req.body.TELEFONO,   
            genero: req.body.GENERO,
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
            res.json({message: "Usuario Modificado con exito!"});
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
            let query = `select     id,nombre,apellido,
                                    contrasenia,correo,telefono,
                                    fotografia,genero,fecha_nacimiento,
                                    fecha_registro,direccion
                         from usuario
                         where id = :id`;

            const binds = {
                id: req.params.id
            };

            const response = await database.simpleExecute(query, binds);
            res.json(response.rows);
            // console.log(response);

        } catch (err) {
            console.error(err);
        }

    }

    async getUsers(req: Request, res: Response) {

        try {
            let query = `select     id,nombre,apellido,
                                    contrasenia,correo,telefono,
                                    fotografia,genero,fecha_nacimiento,
                                    fecha_registro,direccion
                         from usuario
                         where rol = 3`;
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
        select rol
        from proyecto2.usuario
        where correo = :correo and contrasenia = :contrasenia`;

        const binds = {
            contrasenia: req.body.contrasenia,
            correo: req.body.correo
        };
        console.log(binds);

        try {
            const response = await database.simpleExecute(query, binds);
            if (response.rows.length === 1) {
                console.log(response.rows[0]);
                res.status(200).json(response.rows[0]);
            } else {
                res.status(404).end();
            }

        } catch (err) {
            console.error(err);
        }

    }


}

export const userCtl = new UserCtl();