// ------------------------------------------------------------------------------------------------
// REST API types
// ------------------------------------------------------------------------------------------------

import {
    NextFunction,
    Request,
    Response,
} from 'express';

import {
    IPagination
} from '@emavok/ts-common';

// ------------------------------------------------------------------------------------------------
/** Augmented request object containing a user object with an id and a request id */
// ------------------------------------------------------------------------------------------------
export interface IRequestWithId extends Request {
    reqId?: string;
}

// ------------------------------------------------------------------------------------------------
/** Augmented request object containing auth data */
// ------------------------------------------------------------------------------------------------
export interface IRequestWithAuth extends Request {
    user?: {
        id?: string | number;
    };
    token?: {
        id?: string | number;
    };
}

// ------------------------------------------------------------------------------------------------
/** Augmented request object containing a user object with an id and a request id */
// ------------------------------------------------------------------------------------------------
export interface IAugmentedRequest extends Request {
    user?: {
        id?: string | number;
    };
    token?: {
        id?: string | number;
    };
    reqId?: string;
}

// ------------------------------------------------------------------------------------------------
/** API endpoint controller function */
// ------------------------------------------------------------------------------------------------
export type ApiEndpointFunction = ( req: Request, res: Response ) => void;

// ------------------------------------------------------------------------------------------------
/** API middleware function */
// ------------------------------------------------------------------------------------------------
export type ApiMiddlewareFunction = ( req: Request, res: Response, next: NextFunction) => void;

// ------------------------------------------------------------------------------------------------
/** HTTP return codes */
// ------------------------------------------------------------------------------------------------
export enum EApiHttpCodes {
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    /* Duplicate key */
    CONFLICT = 409,
    /* Validation Errors */
    UNPROCESSABLE_ENTITY = 422,
    INTERNAL_ERROR = 500,
}

// ------------------------------------------------------------------------------------------------
/** HTTP cache control headers to disable caching */
// ------------------------------------------------------------------------------------------------
export const API_HTTP_CACHE_CONTROL_HEADERS = {
    'Cache-control': 'no-cache, must-revalidate, max-age=0',
    'Expires': 'Thu, 01 Jan 1970 01:00:00 GMT',
    'Pragma': 'no-cache',
};

// ------------------------------------------------------------------------------------------------
/** Filter operators */
// ------------------------------------------------------------------------------------------------
export enum EApiFilterOperator {
    EQUAL = '=',
    NOT_EQUAL = '!=',
    GREATER_THAN = '>',
    GREATER_EQUALS = '>=',
    LESS_THAN = '<',
    LESS_EQUALS = '<=',
    LIKE = '~',
    NOT_LIKE = '!~',
    ILIKE = '~~',
    NOT_ILIKE = '!~~',
    IS_NULL = '0',
    IS_NOT_NULL = '!0',
    IN = '[]',
    NOT_IN = '![]',
}

// ------------------------------------------------------------------------------------------------
/** Sort direction */
// ------------------------------------------------------------------------------------------------
export enum EApiSortDirection {
    /** Ascending */
    ASC = 'ASC',
    /** Descending */
    DESC = 'DESC',
    // ASC_NULL_FIRST
    // ASC_NULL_LAST
    // DESC_NULL_FIRST
    // DESC_NULL_LAST
}

// ------------------------------------------------------------------------------------------------
/** API filter criterion for accessing lists */
// ------------------------------------------------------------------------------------------------
export interface IApiFilterCriterion {
    /** attribute to filter */
    a: string;
    /** operator */
    o: EApiFilterOperator;
    /** value to compare to */
    v: any;
}

// ------------------------------------------------------------------------------------------------
/** API sort criterion  for accessing lists */
// ------------------------------------------------------------------------------------------------
export interface IApiSortCriterion {
    /** attribute to sort */
    a: string;
    /** sort direction */
    d: EApiSortDirection;
}

// ------------------------------------------------------------------------------------------------
/** API pagination criterion for accessing lists */
// ------------------------------------------------------------------------------------------------
export interface IApiPaginationCriterion {
    /** offset - index of first item to be returned */
    o: number;
    /** limit - number of items to be returned */
    l: number;
}

// ------------------------------------------------------------------------------------------------
/** API pagination criteria for accessing lists */
// ------------------------------------------------------------------------------------------------
export interface IApiListQueryParameter {
    /** Optional filter criteria */
    filter?: IApiFilterCriterion[];

    /** Optional pagination criterion */
    pagination?: IApiPaginationCriterion;

    /** Optional sort criteria */
    sort?: IApiSortCriterion[];
}


// ------------------------------------------------------------------------------------------------
/** REST API error types */
// ------------------------------------------------------------------------------------------------
export enum EApiErrors {
    AUTHENTICATION_ERROR = 'AuthenticationError',
    PERMISSION_DENIED_ERROR = 'PermissionDeniedError',
    NOT_FOUND_ERROR = 'NotFoundError',
    BAD_REQUEST_ERROR = 'BadRequestError',
    ALREADY_EXISTS_ERROR = 'AlreadyExistsError',
    VALIDATION_ERROR = 'ValidationError',
    INTERNAL_SERVER_ERROR = 'InternalServerError',
}

// ------------------------------------------------------------------------------------------------
/** REST API error dto */
// ------------------------------------------------------------------------------------------------
export interface IApiError extends Error {
    /** error name */
    name: string;
    /** error message */
    message: string;
    /** optional http status */
    status?: string | number;
    /** optional error code */
    code?: string | number;
    /** optional error details */
    data?: any;
    /** optional stack */
    stack?: any;
}

// ------------------------------------------------------------------------------------------------
/** REST API pagination response dto */
// ------------------------------------------------------------------------------------------------
export interface IApiPaginationResponse {
    /** start index of result list */
    offset: number;
    /** window size */
    limit: number;
    /** total number of entities */
    total: number;
}

// ------------------------------------------------------------------------------------------------
/** REST API response */
// ------------------------------------------------------------------------------------------------
export interface IApiResponse<TYPE> {
    /** payload is always wrapped in a 'data' object */
    data?: TYPE;
}

// ------------------------------------------------------------------------------------------------
/** REST API paginated response */
// ------------------------------------------------------------------------------------------------
export interface IApiPaginatedResponse<TYPE> extends IApiResponse<TYPE> {
    /** pagination information for lists */
    pagination: IPagination;
}

// ------------------------------------------------------------------------------------------------
/** REST API error response */
// ------------------------------------------------------------------------------------------------
export interface IApiErrorResponse extends IApiResponse<any> {
    /** error responses */
    error: IApiError;
}
