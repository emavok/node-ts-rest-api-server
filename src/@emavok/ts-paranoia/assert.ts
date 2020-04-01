// ------------------------------------------------------------------------------------------------
// Various assertion functions
// ------------------------------------------------------------------------------------------------

import { ETypes } from './validator.types';

import {
    isArray,
    isBoolean,
    isIsoDate,
    isMax,
    isMaxLength,
    isMin,
    isMinLength,
    isNotNull,
    isNotNullOrUndefined,
    isNotUndefined,
    isNull,
    isNullOrUndefined,
    isNumber,
    isObject,
    isString,
    isType,
    isUndefined,
    isValidNumber,
} from './checks';

export function assertType( value: any, type: ETypes, msg?: string ) {
    if (!isType(value, type)) {
        throw new Error(msg || 'assertType failed.' );
    }
}

export function assertNull( value: any, msg?: string ) {
    if (!isNull(value)) {
        throw new Error(msg || 'assertNull failed.' );
    }
}

export function assertNotNull( value: any, msg?: string ) {
    if (isNotNull(value)) {
        throw new Error(msg || 'assertNotNull failed.');
    }
}

export function assertUndefined( value: any, msg?: string ) {
    if (!isUndefined(value)) {
        throw new Error(msg || 'assertUndefined failed');
    }
}

export function assertNotUndefined( value: any, msg?: string ) {
    if (!isNotUndefined(value)) {
        throw new Error(msg || 'assertNotUndefined failed');
    }
}

export function assertNullOrUndefined( value: any, msg?: string ) {
    if (!isNullOrUndefined(value)) {
        throw new Error(msg || 'assertNullOrUndefined failed');
    }
}

export function assertNotNullOrUndefined( value: any, msg?: string ) {
    if (!isNotNullOrUndefined(value)) {
        throw new Error(msg || 'assertNotNullOrUndefined failed');
    }
}

export function assertString( value: any, msg?: string ) {
    if (!isString(value)) {
        throw new Error(msg || 'assertString failed');
    }
}

export function assertNumber( value: any, msg?: string ) {
    if (!isNumber(value)) {
        throw new Error(msg || 'assertNumber failed');
    }
}

export function assertValidNumber( value: any, msg?: string ) {
    if (!isValidNumber(value)) {
        throw new Error(msg || 'assertValidNumber failed');
    }
}

export function assertBoolean( value: any, msg?: string ) {
    if (!isBoolean(value)) {
        throw new Error(msg || 'assertBoolean failed');
    }
}

export function assertObject( value: any, msg?: string ) {
    if (!isObject(value)) {
        throw new Error(msg || 'assertObject failed');
    }
}

export function assertArray( value: any, msg?: string ) {
    if (!isArray(value)) {
        throw new Error(msg || 'assertArray failed');
    }
}

export function assertIsoDate( value: any, msg?: string ) {
    if (!isIsoDate(value)) {
        throw new Error(msg || 'assertIsoDate failed');
    }
}

export function assertMin( value: any, min: number, msg?: string ) {
    if (!isMin(value, min)) {
        throw new Error(msg || 'assertMin failed');
    }
}

export function assertMax( value: any, max: number, msg?: string ) {
    if (!isMax(value, max)) {
        throw new Error(msg || 'assertMax failed');
    }
}

export function assertMinLength( value: any, minLength: number, msg?: string ) {
    if (!isMinLength(value, minLength)) {
        throw new Error(msg || 'assertMinLength failed');
    }
}

export function assertMaxLength( value: any, maxLength: number, msg?: string ) {
    if (!isMaxLength(value, maxLength)) {
        throw new Error(msg || 'assertMaxLength failed');
    }
}

export function assertTrue( value: any, msg?: string ) {
    if (value !== true) {
        throw new Error(msg || 'assertTrue failed.' );
    }
}

export function assertFalse( value: any, msg?: string ) {
    if (value !== false) {
        throw new Error(msg || 'assertFalse failed.' );
    }
}

export function assertTruthy( value: any, msg?: string ) {
    if (!value) {
        throw new Error(msg || 'assertTruthy failed.' );
    }
}

export function assertFalsy( value: any, msg?: string ) {
    if (value) {
        throw new Error(msg || 'assertFalsy failed.' );
    }
}
