// ------------------------------------------------------------------------------------------------
// User container module
// ------------------------------------------------------------------------------------------------

import {
    ContainerModule,
    interfaces,
} from 'inversify';

import {
    DI_USER_CONTROLLER,
    DI_USER_REPOSITORY,
    DI_USER_SERVICE,
    IUserRepository,
    IUserService,
} from './user.types';

import { UserRepository } from './user.repository';

import { UserService } from './user.service';

import { UserController } from './user.controller';

import { IApiController } from '../common.types';

export const USER_CONTAINER_MODULE = new ContainerModule(
    (
        bind: interfaces.Bind,
        unbind: interfaces.Unbind,
        isBound: interfaces.IsBound,
        rebind: interfaces.Rebind
    ) => {
        bind<IUserRepository>(DI_USER_REPOSITORY).to(UserRepository);
        bind<IUserService>(DI_USER_SERVICE).to(UserService);
        bind<IApiController>(DI_USER_CONTROLLER).to(UserController);
    }
);
