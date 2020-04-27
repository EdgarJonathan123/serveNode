import { Request, Response } from 'express';
const database = require('../database');

class Usuario {


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
            nombre:             req.body.nombre,
            apellido:           req.body.apellido,
            contrasenia:        req.body.contrasenia,
            correo:             req.body.correo,
            telefono:           req.body.telefono,
            foto:               req.body.foto,
            genero:             req.body.genero,
            fecha_nacimiento:   req.body.fecha_nacimiento,
            direccion:          req.body.direccion,
            tipo_cliente:       3,
            credito:            0,
            ganancia:           0
        };


        console.log(query);
        // res.json(query);


        try {
            await database.simpleExecute(query,binds);
            res.json({ message: 'Se ejecuto  esa onda jaja a saber que paso olv xd' });
            query = `select * from usuario`;
            const encuestas = await database.simpleExecute(query);
            console.log(encuestas);

        } catch (err) {
            console.error(err);
        }



    }



    async crearUsuario(req: Request, res: Response) {

        let query;

        query = `SET DEFINE OFF;
        Insert into JONATHAN.CARRITO (TOTAL,CARRITO_ID) values ('0','1');`;


        query =
            `Insert into JONATHAN.USUARIO
                    (
                        nombre,apellido,
                        contrasenia,correo,
                        telefono,foto,
                        genero,fecha_nacimiento,
                        fecha_registro,direccion,
                        credito_disponible,ganancia_obtenida,
                        tipo_cliente,carrito_carrito_id
                    )
                    values
                    (
                        '${req.body.nombre}','${req.body.apellido}',
                        '${req.body.contrasenia}','${req.body.correo}',
                        '${req.body.telefono}','${req.body.foto}',
                         ${req.body.genero},to_date('${req.body.fecha_nacimiento}','DD/MM/RR') ,
                         to_date('${req.body.fecha_registro}','DD/MM/RR'),'${req.body.direccion}',
                        ${req.body.credito_disponible},${req.body.ganancia_obtenida},
                        ${req.body.tipo_cliente},${req.body.carrito_carrito_id}
                    )`;


        console.log(query);
        //res.json(query);


        try {
            await database.simpleExecute(query);
            res.json({ message: 'Encuesta guardada' });
        } catch (err) {
            console.error(err);
        }



    }

    async create(req: Request, res: Response) {
        let query = `INSERT INTO encuesta(nombre) VALUES ('${req.body.nombre}') `;
        await database.simpleExecute(query);
        res.json({ message: 'Encuesta guardada' });
    }

    async agregarPregunta(req: Request, res: Response) {
        //Pregunta
        let query = `INSERT INTO pregunta(nombre) VALUES('${req.body.nombre}')`;
        await database.simpleExecute(query);
        let query2 = `SELECT id_pregunta 
                      FROM pregunta
                      WHERE nombre = '${req.body.nombre}'`;
        const response = await database.simpleExecute(query2);
        console.log(response.rows[0].ID_PREGUNTA);
        //Encuesta-Pregunta
        let query3 = `INSERT INTO encuesta_pregunta(id_encuesta,id_pregunta) VALUES(${req.body.id},${response.rows[0].ID_PREGUNTA})`;
        await database.simpleExecute(query3);
        res.json({ message: 'Pregunta agregada' });
    }

    update(req: Request, res: Response) {
        res.json({ text: 'Updating a game ' + req.params.id })
    }

    delete(req: Request, res: Response) {
        let query = `DELETE FROM encuesta
                     WHERE id = ${req.params.id}`
        res.json({ text: 'Deleting a poll' })
    }

}

export const usuario = new Usuario();