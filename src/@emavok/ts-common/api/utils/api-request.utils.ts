// ------------------------------------------------------------------------------------------------
// Request utility class
// ------------------------------------------------------------------------------------------------

import { Request } from 'express';

// ------------------------------------------------------------------------------------------------

import { isNonEmptyString } from '@emavok/ts-paranoia';

import {
    IApiFilterCriterion,
    IApiListQueryParameter,
    IApiPaginationCriterion,
    IApiSortCriterion,
} from '../types/api.types';

// ------------------------------------------------------------------------------------------------
/** REST API request utilities class */
// ------------------------------------------------------------------------------------------------
export class ApiRequestUtils {

    // ----------------------------------------------------------------------------------------
    /**
     * Extracts list parameters from url query parameters
     * @param request Express' request object
     * @return Object containing extracted filter, sort and pagination parameters
     */
    // ----------------------------------------------------------------------------------------
    public static getListQueryParameter( request: Request ): IApiListQueryParameter {
        // extract and validate filter
        const filterStr: string = request.query.filter || request.query.f;
        let filter: IApiFilterCriterion[] | undefined;
        if (isNonEmptyString(filterStr)) {
            const filterObj: any = JSON.parse( filterStr );
            // TODO: validate
            filter = filterObj;
        }

        // extract and validate sort
        const sortStr: string = request.query.sort || request.query.s;
        let sort: IApiSortCriterion[] | undefined;
        if (isNonEmptyString(sortStr)) {
            const sortObj: any = JSON.parse( sortStr );
            // TODO: validate
            sort = sortObj;
        }

        // extract and validate pagination
        const paginationStr: string = request.query.pagination || request.query.p;
        let pagination: IApiPaginationCriterion | undefined;
        if (isNonEmptyString(paginationStr)) {
            const paginationObj: any = JSON.parse( paginationStr );
            // TODO: validate
            pagination = paginationObj;
        }

        // construct and return response
        const apiListQueryParameter: IApiListQueryParameter = {
            filter: filter,
            pagination: pagination,
            sort: sort,
        };
        return apiListQueryParameter;
    }
}
