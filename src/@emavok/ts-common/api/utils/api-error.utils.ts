// ------------------------------------------------------------------------------------------------
// API error utility class
// ------------------------------------------------------------------------------------------------

import {
    EApiErrors,
    EApiHttpCodes,
    IApiError,
} from '../types';

// ------------------------------------------------------------------------------------------------
/** REST API error utilities class */
// ------------------------------------------------------------------------------------------------
export class ApiErrorUtils {

    // ----------------------------------------------------------------------------------------
    /**
     * Creates an 400 BadRequestError
     * @param message Optional custom error message
     * @param details Optional error details
     * @return Error object
     */
    // ----------------------------------------------------------------------------------------
    public static createBadRequestError(message?: string, details?: any): IApiError {
        return ApiErrorUtils.createError(
            EApiErrors.BAD_REQUEST_ERROR,
            message || 'Malformed request',
            details,
            EApiHttpCodes.BAD_REQUEST,
        );
    }
    // ----------------------------------------------------------------------------------------
    /**
     * Creates an 401 AuthenticationError
     * @param message Optional custom error message
     * @param details Optional error details
     * @return Error object
     */
    // ----------------------------------------------------------------------------------------
    public static createAuthenticationError(message?: string, details?: any): IApiError {
        return ApiErrorUtils.createError(
            EApiErrors.AUTHENTICATION_ERROR,
            message || 'Not authenticated',
            details,
            EApiHttpCodes.UNAUTHORIZED,
        );
    }

    // ----------------------------------------------------------------------------------------
    /**
     * Creates an 403 PermissionDeniedError
     * @param message Optional custom error message
     * @param details Optional error details
     * @return Error object
     */
    // ----------------------------------------------------------------------------------------
    public static createPermissionDeniedError(message?: string, details?: any): IApiError {
        return ApiErrorUtils.createError(
            EApiErrors.PERMISSION_DENIED_ERROR,
            message || 'Permission denied',
            details,
            EApiHttpCodes.FORBIDDEN,
        );
    }

    // ----------------------------------------------------------------------------------------
    /**
     * Creates an 404 NotFoundError
     * @param message Optional custom error message
     * @param details Optional error details
     * @return Error object
     */
    // ----------------------------------------------------------------------------------------
    public static createNotFoundError(message?: string, details?: any): IApiError {
        return ApiErrorUtils.createError(
            EApiErrors.NOT_FOUND_ERROR,
            message || 'Not found',
            details,
            EApiHttpCodes.NOT_FOUND,
        );
    }

    // ----------------------------------------------------------------------------------------
    /**
     * Creates an 409 AlreadyExistsError
     * @param message Optional custom error message
     * @param details Optional error details
     * @return Error object
     */
    // ----------------------------------------------------------------------------------------
    public static createAlreadyExistsError(message?: string, details?: any): IApiError {
        return ApiErrorUtils.createError(
            EApiErrors.ALREADY_EXISTS_ERROR,
            message || 'Already exists',
            details,
            EApiHttpCodes.CONFLICT,
        );
    }

    // ----------------------------------------------------------------------------------------
    /**
     * Creates an 422 ValidationError
     * @param message Optional custom error message
     * @param details Optional error details
     * @return Error object
     */
    // ----------------------------------------------------------------------------------------
    public static createValidationError(message?: string, details?: any): IApiError {
        return ApiErrorUtils.createError(
            EApiErrors.VALIDATION_ERROR,
            message || 'Validation failed',
            details,
            EApiHttpCodes.UNPROCESSABLE_ENTITY,
        );
    }

    // ----------------------------------------------------------------------------------------
    /**
     * Creates an 500 InternalServerError
     * @param message Optional custom error message
     * @param details Optional error details
     * @return Error object
     */
    // ----------------------------------------------------------------------------------------
    public static createInternalServerError(message?: string, details?: any): IApiError {
        return ApiErrorUtils.createError(
            EApiErrors.INTERNAL_SERVER_ERROR,
            message || 'Internal server error',
            details,
            EApiHttpCodes.INTERNAL_ERROR,
        );
    }

    // ----------------------------------------------------------------------------------------
    /**
     * Creates an IApiError from various details
     * @param name Error name
     * @param message Error message
     * @param details Optional error details
     * @param status HTTP status code
     * @return Error object
     */
    // ----------------------------------------------------------------------------------------
    private static createError(
        name: string,
        message: string,
        details: any | undefined,
        status: number,
    ): IApiError {
        const error: IApiError = new Error();
        error.name = name;
        error.message = message;
        error.details = details;
        error.status = status;
        return error;
    }
}
