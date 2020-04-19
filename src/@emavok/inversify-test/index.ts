import 'reflect-metadata';

import {
    container
} from './container.config';

import express from 'express';

import {
    DI_USER_CONTROLLER,
    IUserController,
} from './user.types';

const app: express.Application = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true })) ;

const userController: IUserController = container.get<IUserController>(DI_USER_CONTROLLER);
app.use('/api/public/user', userController.getRouter() );

app.listen( 3000, () => {
    // tslint:disable-next-line:no-console
    console.log('Hurra');
});
