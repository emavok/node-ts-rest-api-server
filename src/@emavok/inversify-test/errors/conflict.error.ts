// ------------------------------------------------------------------------------------------------
// Conflict error - represents an entity already exists
// ------------------------------------------------------------------------------------------------

import { DomainError } from './domain.error';

// ------------------------------------------------------------------------------------------------
// Domain error to represent an entity already exists
// ------------------------------------------------------------------------------------------------
export class ConflictError extends DomainError {

    /** error data */
    public data: any;

    public statusCode: number = 409;

    // --------------------------------------------------------------------------------------------
    /**
     * Constructor
     * @param message Error message
     */
    // --------------------------------------------------------------------------------------------
    constructor() {
        super(`Entity already exists.`);
    }
}
