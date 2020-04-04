// ------------------------------------------------------------------------------------------------
// Response utility class
// ------------------------------------------------------------------------------------------------

import { Response } from 'express';

// ------------------------------------------------------------------------------------------------

import { Logger } from '@emavok/node-ts-logger';

import { assertNotUndefined } from '@emavok/ts-paranoia';

import {
    API_HTTP_CACHE_CONTROL_HEADERS,
    EApiHttpCodes,
    IApiErrorResponse,
    IApiResponse,
} from '../types/api.types';

// ------------------------------------------------------------------------------------------------
/** REST API response utilities class */
// ------------------------------------------------------------------------------------------------
export class ApiResponseUtils {

    // ----------------------------------------------------------------------------------------
    /**
     * Success response for a successful api execution
     * @param response Express' response object
     * @param payload Response payload
     */
    // ----------------------------------------------------------------------------------------
    public static success(response: Response, payload: any) {
        const responseDto: IApiResponse<any> = ApiResponseUtils._createSuccessResponse(payload);
        return response
            .set(API_HTTP_CACHE_CONTROL_HEADERS)
            .status(EApiHttpCodes.OK)
            .json(responseDto);
    }

    // ----------------------------------------------------------------------------------------
    /**
     * Error response for an unsuccessful api execution
     * @param response Express' response object
     * @param error Error object - must at least contain name and message properties
     */
    // ----------------------------------------------------------------------------------------
    public static error(response: Response, error: any) {
        Logger.getGlobal().error(`${error.name}: ${error.message}`, { error: error });
        const errorResponse: IApiErrorResponse = ApiResponseUtils._createErrorResponse(error);
        return response
            .set(API_HTTP_CACHE_CONTROL_HEADERS)
            .status(error.status || EApiHttpCodes.INTERNAL_ERROR)
            .json(errorResponse);
    }

    // ----------------------------------------------------------------------------------------
    /**
     * Creates an success response from a payload object
     * @param payload Payload object
     * @return API success response object
     */
    // ----------------------------------------------------------------------------------------
    private static _createSuccessResponse( payload: any ): IApiResponse<any> {
        assertNotUndefined( payload, 'Missing payload parameter');
        const response: IApiResponse<any> = {
            data: payload,
        };
        return response;
    }

    // ----------------------------------------------------------------------------------------
    /**
     * Creates an error response from an error object
     * @param error Error object - must at least contain name and message properties
     * @return API error response object
     */
    // ----------------------------------------------------------------------------------------
    private static _createErrorResponse( error: any ): IApiErrorResponse {
        assertNotUndefined( error, 'Missing error parameter');
        const errorResponse: IApiErrorResponse = {
            error: {
                code: error.code,
                data: error.data,
                message: error.message,
                name: error.name,
                // FIXME
                // Should only return stack trace in debug mode, not in production
                stack: error.stack,
            },
        };
        return errorResponse;
    }
}
