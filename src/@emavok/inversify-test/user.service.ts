// ------------------------------------------------------------------------------------------------
// User service
// ------------------------------------------------------------------------------------------------

import {
    inject,
    injectable,
} from 'inversify';

import { isNullOrUndefined } from '@emavok/ts-paranoia';

import {
    DI_USER_REPOSITORY,
    IUser,
    IUserRepository,
    IUserService,
} from './user.types';

import { IContext } from './common.types';

@injectable()
// ------------------------------------------------------------------------------------------------
/** User service */
// ------------------------------------------------------------------------------------------------
export class UserService implements IUserService {

    /** user repository service */
    private _userRepository: IUserRepository;

    // --------------------------------------------------------------------------------------------
    /** Constructor */
    // --------------------------------------------------------------------------------------------
    constructor(
        @inject(DI_USER_REPOSITORY) userRepository: IUserRepository
    ) {
        this._userRepository = userRepository;
    }

    // --------------------------------------------------------------------------------------------
    /**
     * Finds a user by its id - throws an NotFoundError if not found
     * @param ctx Service context object (for transations, etc.)
     * @param id User identifier
     * @retval User entity
     */
    // --------------------------------------------------------------------------------------------
    public find(ctx: Partial<IContext>, user: number): IUser {
        if (isNullOrUndefined(ctx.transaction)) {
            ctx.transaction = 1;
        }
        return this._userRepository.find(ctx, user);
    }
}
