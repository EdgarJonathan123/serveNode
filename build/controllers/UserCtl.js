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
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = `delete from usuario where id = :id`;
            const binds = {
                id: req.params.id
            };
            console.log(binds);
            try {
                yield database.simpleExecute(query, binds);
                res.json({ message: "Usuario Eliminado" });
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
                yield database.simpleExecute(query, binds);
                res.json({ message: "Usuario Modificado con exito!" });
                // console.log('yes');
                // query = `select * from usuario`;
                // const usuarios = await database.simpleExecute(query);
                // console.log(usuarios);
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
                const response = yield database.simpleExecute(query, binds);
                res.json(response.rows);
                // console.log(response);
            }
            catch (err) {
                console.error(err);
            }
        });
    }
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let query = `select     id,nombre,apellido,
                                    contrasenia,correo,telefono,
                                    fotografia,genero,fecha_nacimiento,
                                    fecha_registro,direccion
                         from usuario
                         where rol = 3`;
                const response = yield database.simpleExecute(query);
                res.json(response.rows);
                console.log(response);
            }
            catch (err) {
                console.error(err);
            }
        });
    }
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
                // query = `select * from usuario`;
                // const encuestas = await database.simpleExecute(query);
                // console.log(encuestas);
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
        select rol
        from proyecto2.usuario
        where correo = :correo and contrasenia = :contrasenia`;
            const binds = {
                contrasenia: req.body.contrasenia,
                correo: req.body.correo
            };
            console.log(binds);
            try {
                const response = yield database.simpleExecute(query, binds);
                if (response.rows.length === 1) {
                    console.log(response.rows[0]);
                    res.status(200).json(response.rows[0]);
                }
                else {
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
