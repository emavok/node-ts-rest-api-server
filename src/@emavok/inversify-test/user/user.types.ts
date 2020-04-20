// ------------------------------------------------------------------------------------------------
// User types
// ------------------------------------------------------------------------------------------------

import {
    IContext,
    IRepository,
} from '../common.types';

export interface IUser {
    id: number;
    username: string;
}

export interface IUserRepository extends IRepository<number, IUser> {}

export interface IUserService {
    find(ctx: Partial<IContext>, user: number): IUser;
}

export const DI_USER_REPOSITORY = Symbol.for('UserRepository');

export const DI_USER_SERVICE = Symbol.for('UserService');

export const DI_USER_CONTROLLER = Symbol.for('UserController');
