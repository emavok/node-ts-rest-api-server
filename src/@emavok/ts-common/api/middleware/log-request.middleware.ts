// ------------------------------------------------------------------------------------------------
// Middleware to log requests
// ------------------------------------------------------------------------------------------------

import { Response } from 'express';

// ------------------------------------------------------------------------------------------------

import { Logger } from '@emavok/node-ts-logger';

import { isNullOrUndefined } from '@emavok/ts-paranoia';
import { IAugmentedRequest } from '../types/api.types';

// ------------------------------------------------------------------------------------------------
/** Middleware that logs authenticated requests */
// ------------------------------------------------------------------------------------------------
export function mwLogSecuredRequest(
    request: IAugmentedRequest,
    response: Response,
    next: (error?: any) => void,
) {
    let userId: string = '<unset>';
    let requestId: string = '<unset>';
    let tokenId: string = '<unset>';

    // get user id from request object if exists
    if (!isNullOrUndefined(request.user) &&
        !isNullOrUndefined(request.user.id)) {
        // make it a string - regardless whether id is a string or number
        userId = '' + request.user.id;
    }

    // get request id from request object if exists
    if (!isNullOrUndefined(request.reqId)) {
        // make it a string - regardless whether id is a string or number
        requestId = '' + request.reqId;
    }

    // get authentication token id from request object if exists
    if (!isNullOrUndefined(request.token) &&
        !isNullOrUndefined(request.token.id)) {
        // make it a string - regardless whether id is a string or number
        tokenId = '' + request.token.id;
    }

    // create logging message
    const logMsg: string = `${request.method} ${request.originalUrl}`;
    const logData: any = {
        userId: userId,
        reqId: requestId,
        tokenId: tokenId
    };
    Logger.getGlobal().info(logMsg, logData);

    // call next to proceed
    next();
}

// ------------------------------------------------------------------------------------------------
/** Middleware that logs public requests */
// ------------------------------------------------------------------------------------------------
export function mwLogPublicRequest(
    request: IAugmentedRequest,
    response: Response,
    next: (error?: any) => void,
) {
    let requestId: string = '<unset>';

    // get request id from request object if exists
    if (!isNullOrUndefined(request.reqId)) {
        // make it a string - regardless whether id is a string or number
        requestId = '' + request.reqId;
    }

    // create logging message
    const logMsg: string = `${request.method} ${request.originalUrl}`;
    const logData: any = {
        reqId: requestId
    };
    Logger.getGlobal().info(logMsg, logData);

    // call next to proceed
    next();
}
