// ------------------------------------------------------------------------------------------------
// Validator types
// ------------------------------------------------------------------------------------------------

// ------------------------------------------------------------------------------------------------
/** Supported property types */
// ------------------------------------------------------------------------------------------------
export enum ETypes {
    STRING = 'string',
    NUMBER = 'number',
    INTEGER = 'integer',
    BOOLEAN = 'boolean',
    ARRAY = 'array',
    OBJECT = 'object',
    DATE = 'date',
    FUNCTION = 'function',
}

// ------------------------------------------------------------------------------------------------
/** Alias - Validation property types enumeration */
// ------------------------------------------------------------------------------------------------
export type EPropertyTypes = ETypes;

// ------------------------------------------------------------------------------------------------
/** Validation schema definition */
// ------------------------------------------------------------------------------------------------
export interface IValidationSchema {
    /** type validator */
    type: EPropertyTypes;
    /** required validator */
    required?: boolean;
    /** min number validator */
    min?: number;
    /** max number validator */
    max?: number;
    /** min string length validator */
    minLength?: number;
    /** max string length validator  */
    maxLength?: number;
    /** min date validator */
    minDate?: string;
    /** max date validator */
    maxDate?: string;
    /** values validator - array of allowed values */
    values?: any[];
    /** object validator */
    properties?: {
        [key: string]: IValidationSchema;
    };
    /** array validator */
    items?: IValidationSchema;
    /** optional validation scheme name */
    $name?: string;
    /** optional validation scheme description */
    $description?: string;
}

// ------------------------------------------------------------------------------------------------
/** Validator function type */
// ------------------------------------------------------------------------------------------------
export type ValidatorFn = (key: string, schema: IValidationSchema, value: any, path: string) => null | ValidationErrors;

// ------------------------------------------------------------------------------------------------
/** Validation error details */
// ------------------------------------------------------------------------------------------------
export interface IValidationError {
    /** name of validator that failed */
    name: string;
    /** property key that violated */
    key: string;
    /** path to property key from value object root */
    keyPath: string;
    /** validator message */
    message: string;
    /** optional additional data */
    data?: any;
}

// ------------------------------------------------------------------------------------------------
/** Array of validation error details */
// ------------------------------------------------------------------------------------------------
export type ValidationErrors = IValidationError[];

// ------------------------------------------------------------------------------------------------
/** Error data for a ValidationError */
// ------------------------------------------------------------------------------------------------
export interface IValidationErrorData {
    /** detailed validation errors array */
    errors: ValidationErrors;
    /** value that failed validation */
    value?: any;
    /** validation schema */
    schema?: IValidationSchema;
}
