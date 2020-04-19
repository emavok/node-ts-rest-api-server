// ------------------------------------------------------------------------------------------------
// Receipe repository
// ------------------------------------------------------------------------------------------------

import {
    IListQueryParameter,
    IPaginatedList,
    IPagination,
} from '@emavok/ts-common';

import { IReceipe } from './receipe.types';

// ------------------------------------------------------------------------------------------------
// Receipe repository
// ------------------------------------------------------------------------------------------------
export class ReceipeRepository {
    // --------------------------------------------------------------------------------------------
    // Gets or creates the repository instance
    // --------------------------------------------------------------------------------------------
    public static getInstance(): ReceipeRepository {
        if (!this._instance) {
            this._instance = new ReceipeRepository();
        }
        return this._instance;
    }

    /** global repository instance */
    private static _instance: ReceipeRepository;

    // --------------------------------------------------------------------------------------------
    /** Private constructor */
    // --------------------------------------------------------------------------------------------
    private constructor() {
        // nothing to do
    }

    // --------------------------------------------------------------------------------------------
    /**
     * Returns all receipes based on list query parameters
     * @param ctx Service context
     * @param param Query parameter for list access
     * @returns Promise of a paginated receipe[]
     */
    // --------------------------------------------------------------------------------------------
    public getAll( ctx: any, param: IListQueryParameter ): Promise<IPaginatedList<IReceipe>> {
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
                const pagination: IPagination = {
                    offset: 0,
                    limit: 10,
                    total: 3
                };
                const response: IPaginatedList<IReceipe> = {
                    rows: data,
                    pagination: pagination
                };
                return response;
            });
    }
}
