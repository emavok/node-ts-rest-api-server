// ------------------------------------------------------------------------------------------------
// Validator functions
// ------------------------------------------------------------------------------------------------

import {
    IValidationError,
    IValidationSchema,
    ValidationErrors,
    ValidatorFn,
} from '../validator.types';

import {
    isArray,
    isIn,
    isIsoDate,
    isMax,
    isMaxDate,
    isMaxLength,
    isMin,
    isMinDate,
    isMinLength,
    isNotNullOrUndefined,
    isNumber,
    isString,
    isType,
    isUndefined,
} from '../checks';

import {
    assertArray,
    assertIsoDate,
    assertNotNullOrUndefined,
    assertObject,
    assertValidNumber,
} from '../assert';

function createValidationError(
    name: string, msg: string, key: string, path: string, value: any, additionalData?: any
): IValidationError {
    const error: IValidationError = {
        key: key,
        keyPath: path,
        message: msg,
        name: name,
        data: {
            value: value,
            ...additionalData
        }
    };
    return error;
}

export function validatorRequired(
    key: string, def: IValidationSchema, value: any, path: string
): null | ValidationErrors {
    // check if required
    if (!def.required) {
        return null;
    }

    // required means not null or undefined
    if (isNotNullOrUndefined(value)) {
        return null;
    }

    const errors: ValidationErrors = [];
    errors.push(createValidationError(
        'ValidatorRequired',
        'Property \'' + key + '\' is required',
        key,
        path,
        value
    ));
    return errors;
}

export function validatorType(
    key: string, def: IValidationSchema, value: any, path: string
): null | ValidationErrors {
    // ignore if value is undefined
    if (isUndefined(value)) {
        return null;
    }

    if (isType(value, def.type)) {
        return null;
    }

    const errors: ValidationErrors = [];
    errors.push(createValidationError(
        'ValidatorType',
        '\'' + key + '\' is of invalid type. Expected type \'' + def.type + '\'',
        key,
        path,
        value,
        { type: def.type }
    ));
    return errors;
}

export function validatorMin(
    key: string, def: IValidationSchema, value: any, path: string
): null | ValidationErrors {
    assertValidNumber(def.min, 'validatorMin: \'min\' is not a valid number.');

    // ignore if not of type number
    if (!isNumber(value)) {
        return null;
    }

    // if value >= min its OK
    if (!isUndefined(def.min) && isMin(value, def.min)) {
        return null;
    }

    const errors: ValidationErrors = [];
    errors.push(createValidationError(
        'ValidatorMin',
        '\'' + key + '\' must have a minimum value of \'' + def.min + '\'',
        key,
        path,
        value,
        { min: def.min }
    ));
    return errors;
}

export function validatorValues(
    key: string, def: IValidationSchema, value: any, path: string
): null | ValidationErrors {
    assertArray(def.values, 'validatorValues: \'values\' is not an array.');

    // ignore if undefined
    if (isUndefined(value)) {
        return null;
    }

    // if value >= min its OK
    if (!isUndefined(def.values) && isIn(value, def.values)) {
        return null;
    }

    const errors: ValidationErrors = [];
    errors.push(createValidationError(
        'ValidatorValues',
        '\'' + key + '\' must be one of ' + JSON.stringify(def.values) + '.',
        key,
        path,
        value,
        { values: def.values }
    ));
    return errors;
}

export function validatorMax(
    key: string, def: IValidationSchema, value: any, path: string
): null | ValidationErrors {
    assertValidNumber(def.max, 'validatorMax: \'max\' is not a valid number.');

    // ignore if not of type number
    if (!isNumber(value)) {
        return null;
    }

    // if value <= max its OK
    if (!isUndefined(def.max) && isMax(value, def.max)) {
        return null;
    }

    const errors: ValidationErrors = [];
    errors.push(createValidationError(
        'ValidatorMax',
        '\'' + key + '\' must have a maximum value of \'' + def.max + '\'',
        key,
        path,
        value,
        { max: def.max }
    ));
    return errors;
}

export function validatorMinLength(
    key: string, def: IValidationSchema, value: any, path: string
): null | ValidationErrors {
    assertValidNumber(def.minLength, 'validatorMinLength: \'minLength\' is not a valid number.');

    // ignore if not of type string
    if (!isString(value)) {
        return null;
    }

    // if value >= min its OK
    if (!isUndefined(def.minLength) && isMinLength(value, def.minLength)) {
        return null;
    }

    const errors: ValidationErrors = [];
    errors.push(createValidationError(
        'ValidatorMinLength',
        '\'' + key + '\' must have a minimum length of \'' + def.minLength + '\' characters',
        key,
        path,
        value,
        { minLength: def.minLength }
    ));
    return errors;
}

export function validatorMaxLength(
    key: string, def: IValidationSchema, value: any, path: string
): null | ValidationErrors {
    assertValidNumber(def.maxLength, 'validatorMaxLength: \'maxLength\' is not a valid number.');

    // ignore if not of type string
    if (!isString(value)) {
        return null;
    }

    // if value <= max its OK
    if (!isUndefined(def.maxLength) && isMaxLength(value, def.maxLength)) {
        return null;
    }

    const errors: ValidationErrors = [];
    errors.push(createValidationError(
        'ValidatorMaxLength',
        '\'' + key + '\' must have a maximum value of \'' + def.maxLength + '\' characters.',
        key,
        path,
        value,
        { maxLength: def.maxLength }
    ));
    return errors;
}

export function validatorMinDate(
    key: string, def: IValidationSchema, value: any, path: string
): null | ValidationErrors {
    assertIsoDate(def.minDate, 'validatorMinDate: \'minDate\' is not a valid iso date.');

    // ignore if not of type date
    if (!isIsoDate(value)) {
        return null;
    }

    // if value >= min its OK
    if (!isUndefined(def.minDate) && isMinDate(value, def.minDate)) {
        return null;
    }

    const errors: ValidationErrors = [];
    errors.push(createValidationError(
        'ValidatorMinDate',
        '\'' + key + '\' must not be before \'' + def.minDate + '\'',
        key,
        path,
        value,
        { minDate: def.minDate }
    ));
    return errors;
}

export function validatorMaxDate(
    key: string, def: IValidationSchema, value: any, path: string
): null | ValidationErrors {
    assertIsoDate(def.maxDate, 'validatorMaxDate: \'maxDate\' is not a valid ISO date.');

    // ignore if not of type date
    if (!isIsoDate(value)) {
        return null;
    }

    // if value <= max its OK
    if (!isUndefined(def.maxDate) && isMaxDate(value, def.maxDate)) {
        return null;
    }

    const errors: ValidationErrors = [];
    errors.push(createValidationError(
        'ValidatorMaxDate',
        '\'' + key + '\' must not be after \'' + def.maxDate + '\'.',
        key,
        path,
        value,
        { maxDate: def.maxDate }
    ));
    return errors;
}

export function validatorObject(
    key: string, def: IValidationSchema, value: any, path: string
): null | ValidationErrors {
    assertObject(def.properties);
    const errors: ValidationErrors = [];

    // TS type guard
    if (def.properties !== undefined) {

        // TS type guard
        // convert property schema definitions to a not-null object
        const propSchemata: {
            [key: string]: IValidationSchema
        } = def.properties;

        // loop over all object properties
        Object.keys(propSchemata).forEach( (p: string) => {
            // validate this property based on its schema definition
            const subPath: string = (path && path.length) ? (path + '.' + key) : key;
            const err: ValidationErrors | null = validateProperty( p, propSchemata[p], value[p], subPath );
            if (err !== null && err.length > 0) {
                errors.push(...err);
            }
        });
    }
    if (errors.length > 0) {
        return errors;
    }
    return null;
    // errors.unshift({
    //     key: key,
    //     keyPath: path,
    //     message: '\'' + key + '\' does not conform to the object definition.',
    //     name: 'ObjectValidator',
    //     data: {
    //         value: value
    //     }
    // });
    // return errors;
}

export function validatorArray(
    key: string, def: IValidationSchema, value: any, path: string
): null | ValidationErrors {
    assertObject(def.items);
    const errors: ValidationErrors = [];

    // if values is not an array, ignore
    if (!isArray(value)) {
        return null;
    }

    if (def.items !== undefined) {
        const schema: IValidationSchema = def.items;

        // validate each array element
        value.forEach( (v: any, index: number) => {
            // validate this array element
            const subPath: string = (path && path.length) ? (path + '.' + key) : key;
            const err: ValidationErrors | null = validateProperty( '[' + index + ']', schema, v, subPath );
            if (err !== null && err.length > 0) {
                errors.push(...err);
            }
        });
    }

    if (errors.length > 0) {
        return errors;
    }
    return null;
    // errors.unshift({
    //     key: key,
    //     keyPath: path,
    //     message: '\'' + key + '\' does not conform to the object definition.',
    //     name: 'ObjectValidator',
    //     data: {
    //         value: value
    //     }
    // });
    // return errors;
}

export function validateProperty(
    key: string, def: IValidationSchema, value: any, path: string
): ValidationErrors | null {
    // check that we have a valid schema definition
    assertNotNullOrUndefined(def);

    const errors: ValidationErrors = [];

    // loop over all schema definition checks
    Object.keys( def ).forEach( (validatorName: string) => {
        // ignore properties that start with a dollar sign ($)
        if (/^\$/.test(validatorName)) {
            return;
        }

        // get corrsponding validator function from its name
        const validatorFn: ValidatorFn | null = getValidatorFn(validatorName);

        // if we have a valid validator fn
        if (validatorFn !== null) {
            // execute it
            const err: ValidationErrors | null = validatorFn( key, def, value, path );
            // if we have errors from this validator, add them to the total errors
            if (err !== null && err.length > 0) {
                errors.push(...err);
            }
        }
    });

    // only return error array if we have some
    if (errors.length > 0) {
        return errors;
    }
    // otherwise return null
    return null;
}

export function getValidatorFn( name: string ): ValidatorFn | null {
    switch (name) {
        case 'required':
            return validatorRequired;
        case 'min':
            return validatorMin;
        case 'max':
            return validatorMax;
        case 'minLength':
            return validatorMinLength;
        case 'maxLength':
            return validatorMaxLength;
        case 'minDate':
            return validatorMinDate;
        case 'maxDate':
            return validatorMaxDate;
        case 'type':
            return validatorType;
        case 'values':
            return validatorValues;
        case 'properties':
            return validatorObject;
        case 'items':
            return validatorArray;
        default:
    }
    return null;
}
