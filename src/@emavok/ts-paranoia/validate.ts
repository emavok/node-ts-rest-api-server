// ------------------------------------------------------------------------------------------------
// Main validate function
// ------------------------------------------------------------------------------------------------

import {
    IValidationSchema,
    ValidationErrors,
} from './validator.types';

import {
    validateProperty,
} from './internal/validators';

import {
    isArrayEmpty,
    isNull,
} from './checks';

import { ValidationError } from './validation.error';

// ------------------------------------------------------------------------------------------------
/**
 * Validates a value against a validation schema
 * @param def Validation schema
 * @param value Value to validate
 * @return Null if it validates or an array of validation errors
 */
// ------------------------------------------------------------------------------------------------
export function validate(
    def: IValidationSchema, value: any
): ValidationErrors | null {
    return validateProperty( '$', def, value, '' );
}

// ------------------------------------------------------------------------------------------------
/**
 * Type guard to check whether validation errors exist
 * @param err Array of validation errors or null
 * @return True if validation errors exist, false otherwise
 */
// ------------------------------------------------------------------------------------------------
export function hasValidationErrors( err: ValidationErrors | null ): err is ValidationErrors {
    if (isNull(err) || isArrayEmpty(err)) {
        return false;
    }
    return true;
}

// ------------------------------------------------------------------------------------------------
/**
 * Validates a value against a validation schema and throws a ValidationError on failure
 * @param def Validation schema
 * @param value Value to validate
 */
// ------------------------------------------------------------------------------------------------
export function assertValidation( value: any, def: IValidationSchema ) {
    const errors: ValidationErrors | null = validate( def, value );
    if (hasValidationErrors(errors)) {
        throw new ValidationError(errors, value, def );
    }
}
