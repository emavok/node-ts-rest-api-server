// ------------------------------------------------------------------------------------------------
// App service
// ------------------------------------------------------------------------------------------------

import {
    inject,
    injectable,
} from 'inversify';

import express, {
    NextFunction,
    Request,
    Response,
    Router,
} from 'express';

import { isValidInteger } from '@emavok/ts-paranoia';

import {
    DI_LOGGER_SERVICE,
    ILogger,
    ILoggerService,
} from '../base.types';

import {
    DI_PUBLIC_ENDPOINTS,
    IApplication,
    IEndpointMapping,
} from './app.types';

@injectable()
// ------------------------------------------------------------------------------------------------
/** Main rest api application */
// ------------------------------------------------------------------------------------------------
export class Application implements IApplication {

    private _app: express.Application = express();

    private _logger: ILogger;

    private _publicEndpoints: IEndpointMapping[] = [];

    // --------------------------------------------------------------------------------------------
    /**
     * Constructor
     * @param loggerService Logger service instance
     */
    // --------------------------------------------------------------------------------------------
    constructor(
        @inject(DI_LOGGER_SERVICE) loggerService: ILoggerService,
        @inject(DI_PUBLIC_ENDPOINTS) publicEndpoints: IEndpointMapping[]
    ) {
        this._logger = loggerService.getInstance(__filename);
        this._logger.info('Creating Application');
        this._publicEndpoints = publicEndpoints;

        // setup common middleware
        this._app.use(express.json());
        this._app.use(express.urlencoded({ extended: true })) ;
    }

    // --------------------------------------------------------------------------------------------
    /**
     * Adds an endpoint to the public api
     * @param path Endpoint path - is prefixed by api/public
     * @param router Router object
     */
    // --------------------------------------------------------------------------------------------
    public addPublicEndpoint( path: string, router: Router ) {
        const p: string = '/api/public' + path;
        this._logger.info('Adding endpoint ' + p);
        this._app.use( p, router );
    }

    // --------------------------------------------------------------------------------------------
    /**
     * Adds an endpoint to the protected api
     * @param path Endpoint path - is prefixed by api/protected
     * @param router Router object
     */
    // --------------------------------------------------------------------------------------------
    public addProtectedEndpoint( path: string, router: Router ) {
        const p: string = '/api/protected' + path;
        this._logger.info('Adding endpoint ' + p);
        this._app.use( p, router );
    }

    // --------------------------------------------------------------------------------------------
    /**
     * Starts the api server
     * @param port Optional port - defaults to 3000
     */
    // --------------------------------------------------------------------------------------------
    public start( port?: number ) {
        // add all public endpoints
        this._publicEndpoints.forEach( (endpoint: IEndpointMapping) => {
            this.addPublicEndpoint(endpoint.path, endpoint.router);
        });
        // add error handler
        this._app.use( (err: any, req: Request, res: Response, next: NextFunction) => {
            this._logger.error(err.name + ': ' + err.message );
            res.status( err.status || err.statusCode || 500).json(err);
        });

        let httpPort: number = 3000;
        if (isValidInteger(port)) {
            httpPort = port;
        }
        this._app.listen( httpPort, () => {
            this._logger.info(`Server listening on port ${httpPort}...`);
        });
    }
}
