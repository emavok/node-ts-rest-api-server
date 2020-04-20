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
    ETypes,
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
    bodyValidation,
    controller,
    get,
    post,
} from './decorators/rest.decorator';

@controller('/user')
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

    // --------------------------------------------------------------------------------------------
    /** RequestHandler for creating a single user */
    // --------------------------------------------------------------------------------------------
    @post('')
    @bodyValidation({
        type: ETypes.OBJECT,
        properties: {
            username: {
                type: ETypes.STRING,
                required: true
            }
        }
    })
    public createOne(body: any, params: any, query: any) {
        this._logger.info('POST /user - alternative version');
        const ctx: Partial<IContext> = {
            requestId: 'createAnotherUser-' + Date.now()
        };
        const user: IUser = this._userService.create(ctx, body);
        return user;
    }
}
