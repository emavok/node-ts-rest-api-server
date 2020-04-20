// ------------------------------------------------------------------------------------------------
// API error - extends domain error
// ------------------------------------------------------------------------------------------------

import { Request } from 'express';

import { DomainError } from './domain.error';

// ------------------------------------------------------------------------------------------------
// Custom api error type
// ------------------------------------------------------------------------------------------------
export class ApiError extends DomainError {

    /** request data */
    public requestData: {
        /** endpoint path */
        path: string,
        /** request method */
        method: string;
        /** request parameters */
        params: any;
        /** request query parameters */
        query: any;
    };

    /** http status code */
    public statusCode: number;

    // --------------------------------------------------------------------------------------------
    /**
     * Constructor
     * @param statusCode HTTP status code
     * @param message Error message
     * @param req Request object
     */
    // --------------------------------------------------------------------------------------------
    constructor(statusCode: number, message: string, req: Request) {
        super(message);
        this.statusCode = statusCode;
        this.requestData = {
            path: req.path,
            method: req.method,
            params: req.params,
            query: req.query
        };
    }
}
