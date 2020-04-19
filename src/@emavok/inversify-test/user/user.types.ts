// ------------------------------------------------------------------------------------------------
// User types
// ------------------------------------------------------------------------------------------------

import {
    IApiController,
    IContext,
    IRepository,
    TApiControllerFn,
} from '../common.types';

export interface IUser {
    id: number;
    username: string;
}

export interface IUserRepository extends IRepository<number, IUser> {}

export interface IUserService {
    find(ctx: Partial<IContext>, user: number): IUser;
}

export interface IUserController extends IApiController {
    // getAll: TApiControllerFn;
    getOne: TApiControllerFn;
    // create: TApiControllerFn;
    // update: TApiControllerFn;
    // remove: TApiControllerFn;
}

export const DI_USER_REPOSITORY = Symbol('UserRepository');

export const DI_USER_SERVICE = Symbol('UserService');

export const DI_USER_CONTROLLER = Symbol('UserController');
