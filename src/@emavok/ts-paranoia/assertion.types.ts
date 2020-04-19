// ------------------------------------------------------------------------------------------------
// Assertion types
// ------------------------------------------------------------------------------------------------

export interface IAssertionErrorData {
    /** Name of assertion that failed */
    assertion: string;
    /** Value that failed the assertion */
    value?: any;
    /** Additional assertion details */
    details?: any;
}
