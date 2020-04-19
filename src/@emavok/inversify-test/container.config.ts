import { Container } from 'inversify';

import {
    DI_USER_CONTROLLER,
    DI_USER_REPOSITORY,
    DI_USER_SERVICE,
    IUserController,
    IUserRepository,
    IUserService,
} from './user.types';

import { UserRepository } from './user.repository';

import { UserService } from './user.service';

import { UserController } from './user.controller';

export const container = new Container();
container.bind<IUserRepository>(DI_USER_REPOSITORY).to(UserRepository);
container.bind<IUserService>(DI_USER_SERVICE).to(UserService);
container.bind<IUserController>(DI_USER_CONTROLLER).to(UserController);
