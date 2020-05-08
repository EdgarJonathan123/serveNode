import { Router } from 'express';

import { userCtl } from '../controllers/UserCtl';

class UserRoutes{

    router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void {
        this.router.post('/createClient', userCtl.createClient);
        this.router.post('/existClient',userCtl.clientExist);
        this.router.get('/getUsers',userCtl.getUsers);
        this.router.get('/getUsers/:id',userCtl.getUserById);
        this.router.put('/updateUser',userCtl.updateUser);
        // this.router.post('/nuevaEncuesta',encuestaCtl.create);
        // this.router.post('/agregarPregunta',encuestaCtl.agregarPregunta);
        // this.router.put('/:id',encuestaCtl.update);
        // this.router.delete('/:id',encuestaCtl.delete);
    }

}

const userRoutes = new UserRoutes();
export default userRoutes.router;