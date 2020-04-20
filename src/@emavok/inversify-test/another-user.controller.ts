// ------------------------------------------------------------------------------------------------
// Another User REST controller
// ------------------------------------------------------------------------------------------------

import {
    inject,
    injectable,
} from 'inversify';

import {
    assertStringNotEmpty,
    assertValidNumber,
} from '@emavok/ts-paranoia';

import {
    IApiController,
    IContext,
} from './common.types';

import {
    DI_USER_SERVICE,
    IUser,
    IUserService,
} from './user/user.types';

import {
    DI_LOGGER_SERVICE,
    ILogger,
    ILoggerService,
} from './base/base.types';
import { Controller } from './controller';

import {
    get,
    restController,
} from './decorators/rest.decorator';

@restController('/user')
@injectable()
// ------------------------------------------------------------------------------------------------
/** User REST controller */
// ------------------------------------------------------------------------------------------------
export class AnotherUserController extends Controller implements IApiController {

    /** user service */
    private _userService: IUserService;

    /** logger */
    private _logger: ILogger;

    // --------------------------------------------------------------------------------------------
    /** Constructor */
    // --------------------------------------------------------------------------------------------
    constructor(
        @inject(DI_LOGGER_SERVICE) loggerService: ILoggerService,
        @inject(DI_USER_SERVICE) userService: IUserService
    ) {
        super();
        this._logger = loggerService.getInstance(__filename);
        this._userService = userService;
        this._logger.info('Creating AnotherUserController');
    }

    // --------------------------------------------------------------------------------------------
    /** RequestHandler for getting a single user */
    // --------------------------------------------------------------------------------------------
    @get('/:id')
    public getOne(body: any, params: any, query: any) {
        this._logger.info('GET /user/:id - alternative version');
        const ctx: Partial<IContext> = {
            requestId: 'getAnotherUser-' + Date.now()
        };
        assertStringNotEmpty(params.id);
        const id: number = parseInt(params.id, 10);
        assertValidNumber(id);
        const user: IUser = this._userService.find(ctx, id);
        return user;
    }
}
