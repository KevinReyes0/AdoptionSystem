'use strict';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import limiter from '../src/moddlewares/validar-cant-peticiones.js'

import  { dbConnection } from './mongo.js';

import authRoutes from '../src/auth/auth.routes.js';
import userRoutes from '../src/users/user.routes.js';
import petRotes from '../src/pet/pet.routes.js';
import dateRoutes from '../src/dates/date.routes.js'


const middlewares = (app) => {
    app.use(express.urlencoded({extended : false}));
    app.use(express.json());
    app.use(cors());
    app.use(helmet());
    app.use(morgan('dev'));
    app.use(limiter);

}

const routes = (app) => {

    app.use('/adoptionSystem/v1/auth', authRoutes);
    app.use('/adoptionSystem/v1/users', userRoutes);
    app.use('/adoptionSystem/v1/pets', petRotes);
    app.use('/adoptionSystem/v1/dates', dateRoutes);
}

const conectarDB = async () => {
    try {
        await dbConnection();
        console.log('Conexion exitosa con la base de datos');
    } catch (error) {
        console.log('Error al conectar con la base de datos', error);

    }
}

export const initServer = async () => {
    const app = express();
    const port = process.env.PORT || 3000;

    try{
        middlewares(app);
        conectarDB();
        routes(app);
        app.listen(port);
        console.log(`Server running on port ${port}`);
    }catch (err){
        console.log(`server init failed: ${err}`);
    }

}