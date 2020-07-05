import { Router } from 'express';
import { fsController } from '../controllers/fsCtl'


class fileRoutes{
    
    router: Router = Router();
    
    constructor(){
        this.config();
    }
    
    config(): void{
        this.router.post('/prueba',fsController.prueba)
    }

}

const fsRoutes = new fileRoutes();
export default fsRoutes.router;