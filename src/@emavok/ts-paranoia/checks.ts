// ------------------------------------------------------------------------------------------------
// Various check functions
// ------------------------------------------------------------------------------------------------

import { ETypes } from './validator.types';

export function isNull( value: any ): value is null {
    return (value === null);
}

export function isNotNull( value: any ): boolean {
    return !isNull(value);
}

export function isUndefined( value: any ): value is undefined {
    return (value === undefined);
}

export function isNotUndefined( value: any ): boolean {
    return !isUndefined(value);
}

export function isNullOrUndefined( value: any ): value is undefined | null {
    return (value === undefined || value === null);
}

export function isNotNullOrUndefined( value: any ): boolean {
    return !isNullOrUndefined(value);
}

export function isString( value: any ): value is string {
    return (typeof value === ETypes.STRING);
}

export function isNumber( value: any ): value is number {
    return (typeof value === ETypes.NUMBER);
}

export function isValidNumber( value: any ): value is number {
    return (typeof value === ETypes.NUMBER && Number.isFinite(value) && !isNaN(value));
}

export function isInteger( value: any ): value is number {
    return (typeof value === ETypes.NUMBER && Number.isInteger(value));
}

export function isValidInteger( value: any ): value is number {
    return (typeof value === ETypes.NUMBER && Number.isInteger(value) && Number.isFinite(value) && !isNaN(value));
}

export function isBoolean( value: any ): value is boolean {
    return (typeof value === ETypes.BOOLEAN);
}

export function isObject( value: any ): value is object {
    return (typeof value === ETypes.OBJECT);
}

export function isArray( value: any ): boolean {
    return (Array.isArray(value));
}

export function isIsoDate( value: any ): boolean {
    // regexp for iso dates with optional time part
    const isoRegex: RegExp = /^(\d{4})-(\d{2})-(\d{2})(T(\d{2})\:(\d{2})\:(\d{2})(\.(\d{3})))?/;
    // check for type string, basic iso format and if it parses into a valid date
    if (typeof value === ETypes.STRING &&
        isoRegex.test(value) &&
        (new Date(value).toString() !== 'Invalid Date')
    ) {
        return true;
    }
    return false;
}

// tslint:disable-next-line:ban-types
export function isFunction( value: any ): value is Function {
    return (typeof value === 'function');
}

export function isType( value: any, type: ETypes ): boolean {
    // type checks differ
    switch (type) {
        case ETypes.INTEGER:
            if (isInteger(value)) {
                return true;
            }
            break;
        case ETypes.DATE:
            if (isIsoDate(value)) {
                return true;
            }
            break;
        case ETypes.ARRAY:
            if (isArray(value)) {
                return true;
            }
            break;
        case ETypes.FUNCTION:
            if (isFunction(value)) {
                return true;
            }
            break;
        default:
            // primitives
            if (typeof value === type) {
                return true;
            }
    }
    return false;
}

export function isIn( value: any, values: any[] ): boolean {
    if (!isArray(values)) {
        throw new Error('isIn: invalid \'values\' parameter value.');
    }
    const idx: number = values.findIndex( (item) => (item === value) );
    return (idx !== -1);
}

export function isMin( value: any, min: number ): boolean {
    if (typeof min !== 'number' || isNaN(min)) {
        throw new Error('isMin: invalid \'min\' parameter value.');
    }
    return (isNumber(value) && (value >= min));
}

export function isMax( value: any, max: number ): boolean {
    if (typeof max !== 'number' || isNaN(max)) {
        throw new Error('isMax: invalid \'max\' parameter value.');
    }
    return (isNumber(value) && (value <= max));
}

export function isMinLength( value: any, minLength: number ): boolean {
    if (typeof minLength !== 'number' || isNaN(minLength)) {
        throw new Error('isMinLength: invalid \'minLength\' parameter value.');
    }
    return (isString(value) && (value.length >= minLength));
}

export function isMaxLength( value: any, maxLength: number ): boolean {
    if (typeof maxLength !== 'number' || isNaN(maxLength)) {
        throw new Error('isMaxLength: invalid \'maxLength\' parameter value.');
    }
    return (isString(value) && (value.length <= maxLength));
}

export function isMinDate( value: any, minDate: string ): boolean {
    if (!isIsoDate(minDate)) {
        throw new Error('isMinDate: invalid \'minDate\' parameter value.');
    }
    if (!isIsoDate(value)) {
        return false;
    }
    const vTimestamp: number = new Date(value).getTime();
    const minTimestamp: number = new Date(minDate).getTime();
    return (vTimestamp >= minTimestamp);
}

export function isMaxDate( value: any, maxDate: string ): boolean {
    if (!isIsoDate(maxDate)) {
        throw new Error('isMaxDate: invalid \'maxDate\' parameter value.');
    }
    if (!isIsoDate(value)) {
        return false;
    }
    const vTimestamp: number = new Date(value).getTime();
    const maxTimestamp: number = new Date(maxDate).getTime();
    return (vTimestamp <= maxTimestamp);
}

export function isArrayEmpty( value: any[] ): boolean {
    if (!isArray(value)) {
        throw new Error('isArrayEmpty: value is not an array.');
    }
    return value.length === 0;
}

export function isNotArrayEmpty( value: any[] ): boolean {
    if (!isArray(value)) {
        throw new Error('isNotArrayEmpty: value is not an array.');
    }
    return value.length > 0;
}

export function isStringEmpty( value: string ): boolean {
    if (!isString(value)) {
        throw new Error('isStringEmpty: value is not a string.');
    }
    return value.length === 0;
}

export function isNotStringEmpty( value: any[] ): boolean {
    if (!isString(value)) {
        throw new Error('isNotStringEmpty: value is not a string.');
    }
    return value.length > 0;
}
