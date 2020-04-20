// ------------------------------------------------------------------------------------------------
// API forbidden error
// ------------------------------------------------------------------------------------------------

import { Request } from 'express';

import { ApiError } from './api.error';

import { EApiHttpCodes } from '@emavok/ts-common';

interface IExtendedRequest extends Request {
    user?: any;
}

// ------------------------------------------------------------------------------------------------
// Custom api error type
// ------------------------------------------------------------------------------------------------
export class ApiForbiddenError extends ApiError {

    /** additional error data */
    public data: {
        /** user */
        user: any;
    };

    // --------------------------------------------------------------------------------------------
    /**
     * Constructor
     * @param req Request object
     */
    // --------------------------------------------------------------------------------------------
    constructor(req: IExtendedRequest) {
        super(
            EApiHttpCodes.FORBIDDEN,
            'Forbidden',
            req
        );
        this.data = {
            user: req.user
        };
    }
}
