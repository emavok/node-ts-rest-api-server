// ------------------------------------------------------------------------------------------------
// User repository
// ------------------------------------------------------------------------------------------------

import {
    inject,
    injectable,
} from 'inversify';

import {
    IUser,
    IUserRepository,
} from './user.types';

import { IContext } from '../common.types';

import { EntityNotFoundError } from '../errors/not-found.error';

import { assertValidNumber, assertUndefined, assertStringNotEmpty, getSafe } from '@emavok/ts-paranoia';

import {
    DI_LOGGER_SERVICE,
    ILogger,
    ILoggerService,
} from '../base/base.types';
import { ConflictError } from '../errors/conflict.error';

@injectable()
// ------------------------------------------------------------------------------------------------
/** User repository service */
// ------------------------------------------------------------------------------------------------
export class UserRepository implements IUserRepository {

    /** dummy user data */
    private _data: IUser[] = this._createData();

    /** logger instance */
    private _logger: ILogger;

    // --------------------------------------------------------------------------------------------
    /** constructor */
    // --------------------------------------------------------------------------------------------
    constructor(
        @inject(DI_LOGGER_SERVICE) loggerService: ILoggerService,
    ) {
        this._logger  = loggerService.getInstance(__filename);
        this._logger.info('Creating UserRepository');
    }

    // --------------------------------------------------------------------------------------------
    /**
     * Finds a user by its id - throws an NotFoundError if not found
     * @param ctx Service context object (for transations, etc.)
     * @param id User identifier
     * @retval User entity
     */
    // --------------------------------------------------------------------------------------------
    public find(ctx: Partial<IContext>, id: number): IUser {
        // id must be valid (i.e. not NAN, INF, ...) number
        assertValidNumber(id);

        // find entity with id within data
        const idx: number = this._data.findIndex( (usr: IUser) => {
            return (usr.id === id);
        });
        // if not found
        if (idx === -1) {
            // throw an error
            throw new EntityNotFoundError('user', id);
        }
        // return a copy otherwise
        return {
            ...this._data[idx]
        };
    }

    // --------------------------------------------------------------------------------------------
    /**
     * Creates a new user
     * @param ctx Service context object (for transations, etc.)
     * @param user User data
     * @retval User entity
     */
    // --------------------------------------------------------------------------------------------
    public create(ctx: Partial<IContext>, user: Partial<IUser>): IUser {
        // no id must be provided
        assertUndefined(user.id);
        // but a username
        assertStringNotEmpty(user.username);

        // see if a user with that username already exists
        const idx: number = this._data.findIndex( (usr: IUser) => {
            return (usr.username === user.username);
        });
        // if found
        if (idx !== -1) {
            // throw an error
            throw new ConflictError();
        }
        // get max id
        const maxId: number = this._data.reduce( (latest: number, item: IUser) => {
            if (item.id > latest) {
                latest = item.id;
            }
            return latest;
        }, 0);
        // create new user and append it to the data
        const newUser: IUser = {
            id: maxId + 1,
            username: getSafe(user.username, '')
        };
        this._data.push(newUser);
        // return a copy
        return {
            ...newUser
        };
    }

    // --------------------------------------------------------------------------------------------
    /** creates dummy data */
    // --------------------------------------------------------------------------------------------
    private _createData(): IUser[] {
        return [
            {
                id: 1,
                username: 'koos'
            }, {
                id: 2,
                username: 'salma'
            }, {
                id: 3,
                username: 'david'
            }, {
                id: 4,
                username: 'andrea'
            }, {
                id: 5,
                username: 'nora'
            }
        ];
    }
}
