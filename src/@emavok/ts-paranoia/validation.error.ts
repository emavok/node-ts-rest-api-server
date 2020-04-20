// ------------------------------------------------------------------------------------------------
// Validation error
// ------------------------------------------------------------------------------------------------

import {
    IValidationErrorData,
    IValidationSchema,
    ValidationErrors,
} from './validator.types';

// ------------------------------------------------------------------------------------------------
// Custom error type to represent validation errors
// ------------------------------------------------------------------------------------------------
export class ValidationError extends Error {

    /** additional error information - details validation errors */
    public data: IValidationErrorData;

    /** error http status code */
    public statusCode: number = 422;

    // --------------------------------------------------------------------------------------------
    /**
     * Constructor
     * @param errors Array of validation error data
     * @param value Optional value that failed to validate against the schema
     * @param schema Optional validation schema definition
     * @param message Optional custom error message - defaults to 'Validation failed.'
     */
    // --------------------------------------------------------------------------------------------
    constructor(errors: ValidationErrors, value?: any, schema?: IValidationSchema, message?: string) {
        super(message || 'Validation failed.');
        // Ensure the name of this error is the same as the class name
        this.name = 'ValidationError';

        // This clips the constructor invocation from the stack trace.
        // It's not absolutely essential, but it does make the stack trace a little nicer.
        //  @see Node.js reference (bottom)
        Error.captureStackTrace(this, this.constructor);

        // set data to validation errors
        const data: IValidationErrorData = {
            errors: errors,
            value: value,
            schema: schema
        };
        this.data = data;
    }
}
