"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const UserRoutes_1 = __importDefault(require("./routes/UserRoutes"));
const database = require('./database');
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.set('trust proxy', 'loopback,192.168.1.11');
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use('/user', UserRoutes_1.default);
        // this.app.use('/home',encuesta Routes);
        // this.app.use('/paises',paisRoutes);
        // this.app.use('/profs/',profsRoutes);
        // this.app.use('/inventores',inventoresRoutes)
        // this.app.use('/inventos',inventosRoutes);
        // this.app.use('/reportes',reportsRoutes);
    }
    start() {
        database.initialize();
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
