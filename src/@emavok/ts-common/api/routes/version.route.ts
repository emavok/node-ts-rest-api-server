// ------------------------------------------------------------------------------------------------
// Version route
// ------------------------------------------------------------------------------------------------

import {
    Request,
    Response,
    Router,
} from 'express';

// ------------------------------------------------------------------------------------------------

import { IXfisVersionDto } from '../types/version-dto.types';

import { ApiResponseUtils } from '../utils/api-response.utils';

// ------------------------------------------------------------------------------------------------
/**
 * Factory function to create a router providing an xFIS version endpoint GET /version
 * @param versionJson Object with version json
 * @return Router object with version endpoint
 */
// ------------------------------------------------------------------------------------------------
export function createVersionRoute( versionJson: IXfisVersionDto ): Router {
    // create new Router instance
    const versionRoute: Router = Router();

    // add version endpoint
    versionRoute.get( '/version', ( req: Request, res: Response ) => {
        // just return version information
        return ApiResponseUtils.success(res, versionJson);
    });

    return versionRoute;
}
