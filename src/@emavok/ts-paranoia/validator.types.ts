// ------------------------------------------------------------------------------------------------
// Validator types
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

export type EPropertyTypes = ETypes;

export interface IValidationSchema {
    type: EPropertyTypes;
    required?: boolean;
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    minDate?: string;
    maxDate?: string;
    values?: any[];
    properties?: {
        [key: string]: IValidationSchema;
    };
    items?: IValidationSchema;
    $name?: string;
    $description?: string;
}

export type ValidatorFn = (key: string, def: IValidationSchema, value: any, path: string) => null | ValidationErrors;

export interface IValidationError {
    name: string;
    key: string;
    keyPath: string;
    message: string;
    data?: any;
}

export type ValidationErrors = IValidationError[];
