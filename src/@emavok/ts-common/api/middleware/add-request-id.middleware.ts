// ------------------------------------------------------------------------------------------------
// Middleware to add unique request ids
// ------------------------------------------------------------------------------------------------

import { Response } from 'express';

import { v4 } from 'uuid';

import { IRequestWithId } from '../types';

// ------------------------------------------------------------------------------------------------
/** Middleware that adds unique request ids */
// ------------------------------------------------------------------------------------------------
export function mwAddRequestId( request: IRequestWithId, response: Response, next: (error?: any) => void) {
    // create a request uuid
    request.reqId = v4();

    // call next to proceed
    next();
}
