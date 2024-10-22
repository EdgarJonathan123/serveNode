import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import encuestaRoutes from './routes/encuestasRoutes'
import userRoutes from './routes/UserRoutes';
import fsRoutes from './routes/fsRoutes';

const database = require('./database');

class Server {

    public app: Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void {
        this.app.set('port', process.env.PORT || 3000);
        this.app.set('trust proxy', 'loopback,192.168.1.13');

        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
    }

    routes(): void {
        this.app.use('/user', userRoutes);
        this.app.use('/fs',fsRoutes); // /fs/prueba

        

        // this.app.use('/home',encuesta Routes);
        // this.app.use('/paises',paisRoutes);
        // this.app.use('/profs/',profsRoutes);
        // this.app.use('/inventores',inventoresRoutes)
        // this.app.use('/inventos',inventosRoutes);
        // this.app.use('/reportes',reportsRoutes);
    }

    start(): void {
        database.initialize();
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }

}

const server = new Server();
server.start();
