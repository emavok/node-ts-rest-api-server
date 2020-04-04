// ------------------------------------------------------------------------------------------------
// Main application
// ------------------------------------------------------------------------------------------------

import express, { Router } from 'express';

import {
    ETypes,
    IValidationSchema,
    validate,
    ValidationErrors,
} from '@emavok/ts-paranoia';

import {
    ILogger,
    Logger,
} from '@emavok/node-ts-logger';

import {
    mwAddRequestId,
    mwLogPublicRequest,
} from '@emavok/ts-common';

import { publicReceipeRoutes } from '@emavok/node-family-cookbook';

// ------------------------------------------------------------------------------------------------

// ------------------------------------------------------------------------------------------------
/** Main server application */
// ------------------------------------------------------------------------------------------------
export class Server {

    /** express server instance */
    private _app: express.Application;

    /** logger instance */
    private _logger: ILogger;

    /** server config */
    private _config: any = null;

    // --------------------------------------------------------------------------------------------
    /** constructor */
    // --------------------------------------------------------------------------------------------
    constructor() {
        // Create logger instance
        this._logger = Logger.getInstance(__filename);

        // Create a new express application instance
        this._app = express();
    }

    // --------------------------------------------------------------------------------------------
    /** Starts the server */
    // --------------------------------------------------------------------------------------------
    public start( config: any ) {
        this._logger.info('Server startup...');

        // validate config
        this._validateConfig(config);

        // add generic middleware functions
        this._setupMiddleware(this._app);

        // add public routes
        this._setupPublicRoutes(this._app);

        // add protected routes
        this._setupProtectedRoutes(this._app);

        // start listening
        this._logger.verbose('Starting up http server...');
        const serverPort: number = config.http.port;
        this._app.listen(serverPort, () => {
            this._logger.info(`Server startup completed. Server listening on port ${serverPort}.` );
        });
    }

    // --------------------------------------------------------------------------------------------
    /** Adds general middleware functions */
    // --------------------------------------------------------------------------------------------
    private _setupMiddleware( app: express.Application ) {
        this._logger.verbose('Setting up common middleware...');

        // enable automatic parsing of application/json
        this._app.use(express.json());

        // enable automatic parsing of application/x-www-form-urlencoded
        this._app.use(express.urlencoded({ extended: true })) ;

        // add request id middleware
        this._app.use(mwAddRequestId);

    }

    // --------------------------------------------------------------------------------------------
    /** Adds public routes including logging middleware */
    // --------------------------------------------------------------------------------------------
    private _setupPublicRoutes(app: express.Application) {
        this._logger.verbose('Setting up public routes...');

        // create new Router instance
        const publicRoutes: Router = Router();

        // add public logging middleware
        publicRoutes.use(mwLogPublicRequest);

        // add public routes here
        // publicRoutes.use(createVersionRoute(this._version));

        // add public login route
        // publicRoutes.use('/security/auth', this._securityProvider.createPublicLoginRoute());

        publicRoutes.use('/receipes', publicReceipeRoutes() );

        // add router
        this._app.use('/api/public', publicRoutes );
    }

    // --------------------------------------------------------------------------------------------
    /** Adds protected routes including logging and security middleware */
    // --------------------------------------------------------------------------------------------
    private _setupProtectedRoutes(app: express.Application) {
        this._logger.verbose('Setting up protected routes...');

        // create new Router instance
        const securedRoutes: Router = Router();

        // add authentication middleware
        // securedRoutes.use(this._securityProvider.createAuthenticationMiddleware());

        // add secured logging middleware
        // securedRoutes.use(logSecuredRequestMiddleware);

        // add protected token refresh route
        // securedRoutes.use('/security/auth', this._securityProvider.createProtectedTokenRefreshRoute());
        // securedRoutes.use('/security', this._securityProvider.createProtectedMeRoute());

        // add secured routes here
        // securedRoutes.use(bzbwBudgetReportRoute);

        // add secured routes
        this._app.use('/api/secured', securedRoutes);
    }

    // --------------------------------------------------------------------------------------------
    /** Validates the server configuration */
    // --------------------------------------------------------------------------------------------
    private _validateConfig(config: any) {
        // validate config
        this._logger.verbose('Validating config...');

        // config validation scheme
        const scheme: IValidationSchema = {
            type: ETypes.OBJECT,
            properties: {
                http: {
                    type: ETypes.OBJECT,
                    properties: {
                        port: {
                            type: ETypes.INTEGER,
                            min: 0,
                            max: 65535,
                            required: true
                        }
                    }
                }
            }
        };

        // validate config against scheme
        const err: ValidationErrors | null = validate( scheme, config );
        if (err !== null && err.length > 0) {
            throw new Error('ConfigValidationError: ' + JSON.stringify(err, null, 2));
        }

        // copy config
        this._config = config;
        this._logger.debug('Config: ', this._config);
    }
}
