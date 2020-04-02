// ------------------------------------------------------------------------------------------------
// Middleware to add unique request ids
// ------------------------------------------------------------------------------------------------

import { Request, Response } from 'express';

import { v4 } from 'uuid';

// ------------------------------------------------------------------------------------------------
/** Augmented request object containing a user object with an id and a request id */
// ------------------------------------------------------------------------------------------------
interface IAugmentedRequest extends Request {
    reqId?: string;
}

// ------------------------------------------------------------------------------------------------
/** Middleware that adds unique request ids */
// ------------------------------------------------------------------------------------------------
export function requestIdMiddleware( request: IAugmentedRequest, response: Response, next: (error?: any) => void) {
    // create a request uuid
    request.reqId = v4();

    // call next to proceed
    next();
}
