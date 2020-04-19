// ------------------------------------------------------------------------------------------------
// User REST controller
// ------------------------------------------------------------------------------------------------

import {
    inject,
    injectable,
} from 'inversify';

import {
    Request,
    Response,
    Router,
} from 'express';

import {
    assertStringNotEmpty,
    assertValidNumber,
    isNull,
} from '@emavok/ts-paranoia';

import { IContext } from '../common.types';

import {
    DI_USER_SERVICE,
    IUser,
    IUserController,
    IUserService,
} from './user.types';

import {
    DI_LOGGER_SERVICE,
    ILogger,
    ILoggerService,
} from '../base/base.types';

@injectable()
// ------------------------------------------------------------------------------------------------
/** User REST controller */
// ------------------------------------------------------------------------------------------------
export class UserController implements IUserController {

    /** user service */
    private _userService: IUserService;

    /** router */
    private _router: Router | null = null;

    /** logger */
    private _logger: ILogger;

    // --------------------------------------------------------------------------------------------
    /** Constructor */
    // --------------------------------------------------------------------------------------------
    constructor(
        @inject(DI_LOGGER_SERVICE) loggerService: ILoggerService,
        @inject(DI_USER_SERVICE) userService: IUserService
    ) {
        this._logger = loggerService.getInstance(__filename);
        this._userService = userService;
    }

    // --------------------------------------------------------------------------------------------
    /**
     * Returns the routing object for this controller
     * @return Router object
     */
    // --------------------------------------------------------------------------------------------
    public getRouter(): Router {
        // return existing if exists
        if (!isNull(this._router)) {
            return this._router;
        }

        // if not create new router object
        const router: Router = Router();
        router.get('/:id', this.getOne.bind(this) );

        // save and return
        this._router = router;
        return this._router;
    }

    // --------------------------------------------------------------------------------------------
    /** RequestHandler for getting a single user */
    // --------------------------------------------------------------------------------------------
    public getOne(req: Request, res: Response): void {
        try {
            this._logger.info('GET /user/:id - version');
            const ctx: Partial<IContext> = {
                requestId: 'getUser-' + Date.now()
            };
            assertStringNotEmpty(req.params.id);
            const id: number = parseInt(req.params.id, 10);
            assertValidNumber(id);
            const user: IUser = this._userService.find(ctx, id);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}
