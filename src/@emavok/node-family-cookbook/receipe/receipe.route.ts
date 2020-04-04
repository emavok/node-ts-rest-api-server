// ------------------------------------------------------------------------------------------------
// API route for receipes
// ------------------------------------------------------------------------------------------------

import {
    Response,
    Router,
} from 'express';

import {
    ApiRequestUtils,
    ApiResponseUtils,
    IApiListQueryParameter,
    IApiPaginatedResponse,
    IAugmentedRequest,
} from '@emavok/ts-common';

import { IReceipe } from './receipe.types';

import { ReceipeService } from './receipe.service';

// ------------------------------------------------------------------------------------------------
/**
 * Creates a router object with all receipe routes
 * @returns Router object
 */
// ------------------------------------------------------------------------------------------------
export function publicReceipeRoutes(): Router {
    const router: Router = Router();
    router.get('/', _getReceipe );
    return router;
}

// ------------------------------------------------------------------------------------------------
/**
 * Returns the router for GET receipe/
 * @param req Request object
 * @param res Response object
 */
// ------------------------------------------------------------------------------------------------
function _getReceipe( req: IAugmentedRequest, res: Response ) {
    Promise.resolve()
        .then( () => {
            // get list query parameter
            return ApiRequestUtils.getListQueryParameter(req);
        }).then( (listQueryParam: IApiListQueryParameter) => {
            // create service context object
            const ctx: any = {
                requestId: req.reqId,
                user: req.user,
                token: req.token
            };
            // get receipes
            return ReceipeService.getInstance().getAll(ctx, listQueryParam);
        }).then( (receipes: IApiPaginatedResponse<IReceipe[]>) => {
            ApiResponseUtils.success(res, receipes);
        }).catch( (err: any) => {
            ApiResponseUtils.error(res, err);
        });
}
