"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const encuestaCtl_1 = require("../controllers/encuestaCtl");
class EncuestaRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/crearCliente', encuestaCtl_1.usuario.createClient);
        // this.router.post('/nuevaEncuesta',encuestaCtl.create);
        // this.router.post('/agregarPregunta',encuestaCtl.agregarPregunta);
        // this.router.put('/:id',encuestaCtl.update);
        // this.router.delete('/:id',encuestaCtl.delete);
    }
}
const encuestaRoutes = new EncuestaRoutes();
exports.default = encuestaRoutes.router;
