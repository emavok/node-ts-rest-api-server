// ------------------------------------------------------------------------------------------------
// Common types
// ------------------------------------------------------------------------------------------------

import {
    NextFunction,
    Request,
    Response,
    Router,
} from 'express';

// ------------------------------------------------------------------------------------------------
/** REST API controller function */
// ------------------------------------------------------------------------------------------------
export type TApiControllerFn = ( req: Request, res: Response ) => void;

// ------------------------------------------------------------------------------------------------
/** REST API middleware function */
// ------------------------------------------------------------------------------------------------
export type TApiMiddlewareFn = ( req: Request, res: Response, next: NextFunction) => void;

// ------------------------------------------------------------------------------------------------
/** REST API controller */
// ------------------------------------------------------------------------------------------------
export interface IApiController {
    getRouter(): Router;
}

// ------------------------------------------------------------------------------------------------
/** Service calling context object */
// ------------------------------------------------------------------------------------------------
export interface IContext {
    requestId: string;
    transaction: any;
}

// ------------------------------------------------------------------------------------------------
/** Service calling context object */
// ------------------------------------------------------------------------------------------------
export interface IRepository<ID_TYPE, TYPE> {
    create(ctx: Partial<IContext>, user: Partial<TYPE>): TYPE;
    find(ctx: Partial<IContext>, id: ID_TYPE): TYPE;
    // update(ctx: Partial<IContext>, user: TYPE): TYPE;
    // remove(ctx: Partial<IContext>, id: ID_TYPE): void;
    // findMany(): TYPE[];
}
