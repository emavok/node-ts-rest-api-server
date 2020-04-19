// ------------------------------------------------------------------------------------------------
// Here is where the application gets bootstrapped
// ------------------------------------------------------------------------------------------------

import { Container } from 'inversify';

import { BASE_CONTAINER_MODULE } from './base/base.container-module';

import { USER_CONTAINER_MODULE } from './user/user.container-module';

import {
    DI_USER_CONTROLLER,
    IUserController,
} from './user/user.types';

import { AnotherUserController } from './another-user.controller';

import {
    DI_PUBLIC_ENDPOINTS,
    IEndpointMapping,
} from './base/app/app.types';

import { IApiController } from './common.types';

// ------------------------------------------------------------------------------------------------
// create DI container
// ------------------------------------------------------------------------------------------------
export const APP_CONTAINER = new Container();

// ------------------------------------------------------------------------------------------------
// load DI container modules (which contain service registrations)
// ------------------------------------------------------------------------------------------------
APP_CONTAINER.load(BASE_CONTAINER_MODULE);
APP_CONTAINER.load(USER_CONTAINER_MODULE);

// ------------------------------------------------------------------------------------------------
// rebind specific services
// ------------------------------------------------------------------------------------------------
APP_CONTAINER.rebind<IUserController>(DI_USER_CONTROLLER).to(AnotherUserController);

// ------------------------------------------------------------------------------------------------
// bind public api mapping constant
// ------------------------------------------------------------------------------------------------
const PUBLIC_ENDPOINTS: IEndpointMapping[] = [
    { path: '/user', router: (APP_CONTAINER.get<IApiController>(DI_USER_CONTROLLER)).getRouter() }
];
APP_CONTAINER.bind<IEndpointMapping[]>(DI_PUBLIC_ENDPOINTS).toConstantValue(PUBLIC_ENDPOINTS);
