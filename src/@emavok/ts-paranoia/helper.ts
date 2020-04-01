// ------------------------------------------------------------------------------------------------
// Various helper functions
// ------------------------------------------------------------------------------------------------

import {
    isNullOrUndefined,
    isUndefined,
} from './checks';

export function getSafe<T>( value: T | undefined, defaultValue: T ): T {
    if (!isUndefined(value)) {
        return value;
    }
    return defaultValue;
}

export function getSafeNull<T>( value: T | undefined | null, defaultValue: T ): T {
    if (!isNullOrUndefined(value)) {
        return value;
    }
    return defaultValue;
}
