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
class UserCtl {
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
            try {
                yield database.simpleExecute(query, binds);
                res.json({ message: 'yes' });
                query = `select * from usuario`;
                const encuestas = yield database.simpleExecute(query);
                console.log(encuestas);
            }
            catch (err) {
                console.error(err);
            }
        });
    }
    clientExist(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
                const response = yield database.simpleExecute(query, binds);
                if (response.rows.length === 1) {
                    res.status(200).json(response.rows[0]);
                }
                else {
                    console.log('Que paso amiguito xd');
                    res.status(404).end();
                }
            }
            catch (err) {
                console.error(err);
            }
        });
    }
}
exports.userCtl = new UserCtl();
