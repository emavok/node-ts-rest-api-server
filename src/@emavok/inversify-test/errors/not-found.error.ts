// ------------------------------------------------------------------------------------------------
// EntityNotFound error - represents an entity not found
// ------------------------------------------------------------------------------------------------

import { DomainError } from './domain.error';

// ------------------------------------------------------------------------------------------------
// Domain error to represent an entity not found error
// ------------------------------------------------------------------------------------------------
export class EntityNotFoundError extends DomainError {

    /** error data */
    public data: {
        /** entity name */
        entity: string,
        /** entity id */
        id: number
    };

    // --------------------------------------------------------------------------------------------
    /**
     * Constructor
     * @param message Error message
     */
    // --------------------------------------------------------------------------------------------
    constructor(entity: string, id: number) {
        super(`Entity {entity} with id {id} not found.`);
        this.data = {
            entity: entity,
            id: id
        };
    }
}
