// ------------------------------------------------------------------------------------------------
// Validation middleware
// ------------------------------------------------------------------------------------------------

import {
    NextFunction,
    Request,
    Response,
} from 'express';

import {
    hasValidationErrors,
    IValidationSchema,
    validate,
    ValidationErrors,
} from '@emavok/ts-paranoia';

import { IApiError } from '../types';

import {
    ApiErrorUtils,
    ApiResponseUtils,
} from '../utils';

// ------------------------------------------------------------------------------------------------
/**
 * Validation middleware function which validates request body against a validation schema
 * @param schema Validation schema to validate request.body against
 * @return Middleware function
 */
// ------------------------------------------------------------------------------------------------
export function mwValidateBody( schema: IValidationSchema )
: (( req: Request, res: Response, next: NextFunction) => void) {
    return ( req: Request, res: Response, next: NextFunction) => {
        const err: ValidationErrors | null = validate( schema, req.body );
        if (hasValidationErrors(err)) {
            // create validation error
            const validationError: IApiError = ApiErrorUtils.createValidationError(undefined, err);
            ApiResponseUtils.error(res, validationError);
            next(validationError);
        }
        next();
    };
}
