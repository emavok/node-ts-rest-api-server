// ------------------------------------------------------------------------------------------------
// Assertion error
// ------------------------------------------------------------------------------------------------

import {
    IAssertionErrorData
} from './assertion.types';

// ------------------------------------------------------------------------------------------------
// Custom error type to represent an assertion errors
// ------------------------------------------------------------------------------------------------
export class AssertionError extends Error {

    /** additional error information - details assertion errors */
    public data: IAssertionErrorData;

    // --------------------------------------------------------------------------------------------
    /**
     * Constructor
     * @param assertion Name of assertion that failed
     * @param value Optional value that failed to validate against the schema
     * @param details Optional additiona assertion details
     * @param message Optional custom error message - defaults to 'Validation failed.'
     */
    // --------------------------------------------------------------------------------------------
    constructor(assertion: string, value?: any, details?: any, message?: string) {
        super(message || 'Assertion failed.');
        // Ensure the name of this error is the same as the class name
        this.name = 'AssertionError';

        // This clips the constructor invocation from the stack trace.
        // It's not absolutely essential, but it does make the stack trace a little nicer.
        //  @see Node.js reference (bottom)
        Error.captureStackTrace(this, this.constructor);

        // set data to assertion errors
        const data: IAssertionErrorData = {
            assertion: assertion,
            value: value,
            details: details
        };
        this.data = data;
    }
}
