// ------------------------------------------------------------------------------------------------
// API route for receipes
// ------------------------------------------------------------------------------------------------

import {
    IApiListQueryParameter,
    IApiPaginatedResponse,
    IApiPaginationResponse,
} from '@emavok/ts-common';

import { IReceipe } from './receipe.types';

// ------------------------------------------------------------------------------------------------
// API route for receipes
// ------------------------------------------------------------------------------------------------
export class ReceipeService {
    // --------------------------------------------------------------------------------------------
    // Gets or creates the service instance
    // --------------------------------------------------------------------------------------------
    public static getInstance(): ReceipeService {
        if (!this._instance) {
            this._instance = new ReceipeService();
        }
        return this._instance;
    }

    /** global service instance */
    private static _instance: ReceipeService;

    // --------------------------------------------------------------------------------------------
    /** Private constructor */
    // --------------------------------------------------------------------------------------------
    private constructor() {
        // nothing to do
    }

    // --------------------------------------------------------------------------------------------
    /**
     * Returns all receipes based on list filter parameters
     * @param ctx Service context
     * @param listQueryParam Query parameter for list access
     * @returns Promise of a paginated receipe[] response
     */
    // --------------------------------------------------------------------------------------------
    public getAll( ctx: any, listQueryParam: IApiListQueryParameter ): Promise<IApiPaginatedResponse<IReceipe[]>> {
        return Promise.resolve()
            .then( () => {
                const data: IReceipe[] = [
                    {
                        id: 1,
                        title: 'Gulasch',
                    }, {
                        id: 2,
                        title: 'Spätzle',
                    }, {
                        id: 3,
                        title: 'Ratatouille'
                    }
                ];
                const pagination: IApiPaginationResponse = {
                    offset: 0,
                    limit: 10,
                    total: 3
                };
                const response: IApiPaginatedResponse<IReceipe[]> = {
                    data: data,
                    pagination: pagination
                };
                return response;
            });
    }
}
