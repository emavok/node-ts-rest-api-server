// ------------------------------------------------------------------------------------------------
// User repository
// ------------------------------------------------------------------------------------------------

import {
    injectable
} from 'inversify';

import {
    IUser,
    IUserRepository,
} from './user.types';

import { IContext } from './common.types';

import { EntityNotFoundError } from './errors/not-found.error';

import { assertValidNumber } from '@emavok/ts-paranoia';

@injectable()
// ------------------------------------------------------------------------------------------------
/** User repository service */
// ------------------------------------------------------------------------------------------------
export class UserRepository implements IUserRepository {

    /** dummy user data */
    private _data: IUser[] = this._createData();

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
