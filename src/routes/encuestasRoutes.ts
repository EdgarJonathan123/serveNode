import { Router } from 'express';

import { usuario } from '../controllers/encuestaCtl';

class EncuestaRoutes{

    router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void {
        this.router.post('/crearCliente', usuario.createClient);
        // this.router.post('/nuevaEncuesta',encuestaCtl.create);
        // this.router.post('/agregarPregunta',encuestaCtl.agregarPregunta);
        // this.router.put('/:id',encuestaCtl.update);
        // this.router.delete('/:id',encuestaCtl.delete);

        //otro comentario
    }

}

const encuestaRoutes = new EncuestaRoutes();
export default encuestaRoutes.router;