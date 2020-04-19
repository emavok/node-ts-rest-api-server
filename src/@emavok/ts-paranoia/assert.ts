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
    isStringEmpty,
    isStringNotEmpty,
    isType,
    isUndefined,
    isValidNumber,
} from './checks';

import { AssertionError } from './assertion.error';

export function assertType( value: any, type: ETypes, msg?: string ) {
    if (!isType(value, type)) {
        throw new AssertionError('assertType', value, { type: type }, msg );
    }
}

export function assertNull( value: any, msg?: string ) {
    if (!isNull(value)) {
        throw new AssertionError('assertNull', value, undefined, msg );
    }
}

export function assertNotNull( value: any, msg?: string ) {
    if (isNotNull(value)) {
        throw new AssertionError('assertNotNull', value, undefined, msg );
    }
}

export function assertUndefined( value: any, msg?: string ) {
    if (!isUndefined(value)) {
        throw new AssertionError('assertUndefined', value, undefined, msg );
    }
}

export function assertNotUndefined( value: any, msg?: string ) {
    if (!isNotUndefined(value)) {
        throw new AssertionError('assertNotUndefined', value, undefined, msg );
    }
}

export function assertNullOrUndefined( value: any, msg?: string ) {
    if (!isNullOrUndefined(value)) {
        throw new AssertionError('assertNullOrUndefined', value, undefined, msg );
    }
}

export function assertNotNullOrUndefined( value: any, msg?: string ) {
    if (!isNotNullOrUndefined(value)) {
        throw new AssertionError('assertNotNullOrUndefined', value, undefined, msg );
    }
}

export function assertString( value: any, msg?: string ) {
    if (!isString(value)) {
        throw new AssertionError('assertString', value, undefined, msg );
    }
}

export function assertStringEmpty( value: any, msg?: string ) {
    if (!isStringEmpty(value)) {
        throw new AssertionError('assertStringEmpty', value, undefined, msg );
    }
}

export function assertStringNotEmpty( value: any, msg?: string ) {
    if (!isStringNotEmpty(value)) {
        throw new AssertionError('assertStringNotEmpty', value, undefined, msg );
    }
}

export function assertNumber( value: any, msg?: string ) {
    if (!isNumber(value)) {
        throw new AssertionError('assertNumber', value, undefined, msg );
    }
}

export function assertValidNumber( value: any, msg?: string ) {
    if (!isValidNumber(value)) {
        throw new AssertionError('asassertValidNumber', value, undefined, msg );
    }
}

export function assertBoolean( value: any, msg?: string ) {
    if (!isBoolean(value)) {
        throw new AssertionError('assertBoolean', value, undefined, msg );
    }
}

export function assertObject( value: any, msg?: string ) {
    if (!isObject(value)) {
        throw new AssertionError('assertObject', value, undefined, msg );
    }
}

export function assertArray( value: any, msg?: string ) {
    if (!isArray(value)) {
        throw new AssertionError('assertArray', value, undefined, msg );
    }
}

export function assertIsoDate( value: any, msg?: string ) {
    if (!isIsoDate(value)) {
        throw new AssertionError('assertIsoDate', value, undefined, msg );
    }
}

export function assertMin( value: any, min: number, msg?: string ) {
    if (!isMin(value, min)) {
        throw new AssertionError('assertMin', value, { min: min }, msg );
    }
}

export function assertMax( value: any, max: number, msg?: string ) {
    if (!isMax(value, max)) {
        throw new AssertionError('assertMax', value, { max: max }, msg );
    }
}

export function assertMinLength( value: any, minLength: number, msg?: string ) {
    if (!isMinLength(value, minLength)) {
        throw new AssertionError('assertMinLength', value, { minLength: minLength }, msg );
    }
}

export function assertMaxLength( value: any, maxLength: number, msg?: string ) {
    if (!isMaxLength(value, maxLength)) {
        throw new AssertionError('assertMaxLength', value, { maxLength: maxLength }, msg );
    }
}

export function assertTrue( value: any, msg?: string ) {
    if (value !== true) {
        throw new AssertionError('assertTrue', value, undefined, msg );
    }
}

export function assertFalse( value: any, msg?: string ) {
    if (value !== false) {
        throw new AssertionError('assertFalse', value, undefined, msg );
    }
}

export function assertTruthy( value: any, msg?: string ) {
    if (!value) {
        throw new AssertionError('assertTruthy', value, undefined, msg );
    }
}

export function assertFalsy( value: any, msg?: string ) {
    if (value) {
        throw new AssertionError('assertFalsy', value, undefined, msg );
    }
}
