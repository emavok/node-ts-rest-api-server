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

import { IContext } from '../common.types';

import {
    DI_LOGGER_SERVICE,
    ILogger,
    ILoggerService,
} from '../base/base.types';

@injectable()
// ------------------------------------------------------------------------------------------------
/** User service */
// ------------------------------------------------------------------------------------------------
export class UserService implements IUserService {

    /** user repository service */
    private _userRepository: IUserRepository;

    /** logger instance */
    private _logger: ILogger;

    // --------------------------------------------------------------------------------------------
    /** Constructor */
    // --------------------------------------------------------------------------------------------
    constructor(
        @inject(DI_LOGGER_SERVICE) loggerService: ILoggerService,
        @inject(DI_USER_REPOSITORY) userRepository: IUserRepository
    ) {
        this._logger = loggerService.getInstance(__filename);
        this._logger.info('Creating UserService');
        this._userRepository = userRepository;
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
        this._logger.info('create');
        if (isNullOrUndefined(ctx.transaction)) {
            ctx.transaction = 1;
        }
        return this._userRepository.create(ctx, user);
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
        this._logger.info('findById');
        if (isNullOrUndefined(ctx.transaction)) {
            ctx.transaction = 1;
        }
        return this._userRepository.find(ctx, user);
    }
}
