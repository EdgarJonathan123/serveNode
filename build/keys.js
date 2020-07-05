"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    database: {
        // user: "JONATHAN",
        // password: "123456",
        // connectString: "(DESCRIPTION =(LOAD_BALANCE = ON)(FAILOVER = ON)(ADDRESS =(PROTOCOL = TCP)(HOST = localhost)(PORT = 1521))(ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT=1521))(CONNECT_DATA=(SERVICE_NAME=XE)(FAILOVER_MODE=(TYPE=SELECT)(METHOD = BASIC))))",
        // poolMin: 10,
        // poolMax: 10,
        // poolIncrement:0
        user: "PROYECTO2",
        password: "123456",
        connectString: "(DESCRIPTION =(LOAD_BALANCE = ON)(FAILOVER = ON)(ADDRESS =(PROTOCOL = TCP)(HOST = localhost)(PORT = 1521))(ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT=1521))(CONNECT_DATA=(SERVICE_NAME=XE)(FAILOVER_MODE=(TYPE=SELECT)(METHOD = BASIC))))",
        poolMin: 10,
        poolMax: 10,
        poolIncrement: 0
        // host: 'localhost',
        // user: 'BD',
        // password: '123',
        // database: 'BDP2',
        // poolMin: 10,
        // poolMax: 10,
        // poolIncrement: 0
    }
};
