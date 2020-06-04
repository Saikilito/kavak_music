"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = require("mysql2/promise");
const connection = () => {
    try {
        const connection = promise_1.createPool({
            host: process.env.HOST_DB || "localhost",
            user: process.env.USERNAME_DB,
            password: process.env.PASSWORD_DB,
            database: process.env.NAME_DB || "bquate_test_musica_2",
            waitForConnections: true,
        });
        return connection;
    }
    catch (error) {
        console.error(error);
        throw new Error('Error in the database connection');
    }
};
exports.default = connection;
