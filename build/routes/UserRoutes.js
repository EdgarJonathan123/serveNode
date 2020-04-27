"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserCtl_1 = require("../controllers/UserCtl");
class UserRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/createClient', UserCtl_1.userCtl.createClient);
        this.router.post('/existClient', UserCtl_1.userCtl.clientExist);
        // this.router.post('/nuevaEncuesta',encuestaCtl.create);
        // this.router.post('/agregarPregunta',encuestaCtl.agregarPregunta);
        // this.router.put('/:id',encuestaCtl.update);
        // this.router.delete('/:id',encuestaCtl.delete);
    }
}
const userRoutes = new UserRoutes();
exports.default = userRoutes.router;
