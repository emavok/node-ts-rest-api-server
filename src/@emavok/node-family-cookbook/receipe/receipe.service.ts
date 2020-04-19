// ------------------------------------------------------------------------------------------------
// API route for receipes
// ------------------------------------------------------------------------------------------------

import {
    IListQueryParameter,
    IPaginatedList,
} from '@emavok/ts-common';

import { IReceipe } from './receipe.types';

import { ReceipeRepository } from './receipe.repository';

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
    public getAll( ctx: any, listQueryParam: IListQueryParameter ): Promise<IPaginatedList<IReceipe>> {
        return ReceipeRepository.getInstance().getAll( ctx, listQueryParam );
    }
}
