"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const database = require('../database');
class Usuario {
    createClient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
            console.log(query);
            // res.json(query);
            try {
                yield database.simpleExecute(query, binds);
                res.json({ message: 'Se ejecuto  esa onda jaja a saber que paso olv xd' });
                query = `select * from usuario`;
                const encuestas = yield database.simpleExecute(query);
                console.log(encuestas);
            }
            catch (err) {
                console.error(err);
            }
        });
    }
    crearUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
                yield database.simpleExecute(query);
                res.json({ message: 'Encuesta guardada' });
            }
            catch (err) {
                console.error(err);
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = `INSERT INTO encuesta(nombre) VALUES ('${req.body.nombre}') `;
            yield database.simpleExecute(query);
            res.json({ message: 'Encuesta guardada' });
        });
    }
    agregarPregunta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //Pregunta
            let query = `INSERT INTO pregunta(nombre) VALUES('${req.body.nombre}')`;
            yield database.simpleExecute(query);
            let query2 = `SELECT id_pregunta 
                      FROM pregunta
                      WHERE nombre = '${req.body.nombre}'`;
            const response = yield database.simpleExecute(query2);
            console.log(response.rows[0].ID_PREGUNTA);
            //Encuesta-Pregunta
            let query3 = `INSERT INTO encuesta_pregunta(id_encuesta,id_pregunta) VALUES(${req.body.id},${response.rows[0].ID_PREGUNTA})`;
            yield database.simpleExecute(query3);
            res.json({ message: 'Pregunta agregada' });
        });
    }
    update(req, res) {
        res.json({ text: 'Updating a game ' + req.params.id });
    }
    delete(req, res) {
        let query = `DELETE FROM encuesta
                     WHERE id = ${req.params.id}`;
        res.json({ text: 'Deleting a poll' });
    }
}
exports.usuario = new Usuario();
