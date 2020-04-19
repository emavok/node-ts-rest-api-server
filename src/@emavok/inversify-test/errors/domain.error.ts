// ------------------------------------------------------------------------------------------------
// Domain error - extends default error object
// ------------------------------------------------------------------------------------------------

// ------------------------------------------------------------------------------------------------
// Custom domain error type to represent a domain error
// ------------------------------------------------------------------------------------------------
export class DomainError extends Error {
    // --------------------------------------------------------------------------------------------
    /**
     * Constructor
     * @param message Error message
     */
    // --------------------------------------------------------------------------------------------
    constructor(message: string) {
        super(message);
        // Ensure the name of this error is the same as the class name
        this.name = this.constructor.name;

        // This clips the constructor invocation from the stack trace.
        // It's not absolutely essential, but it does make the stack trace a little nicer.
        //  @see Node.js reference (bottom)
        Error.captureStackTrace(this, this.constructor);
    }
}
