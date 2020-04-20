// ------------------------------------------------------------------------------------------------
// Decorator that specifies a REST controller
// ------------------------------------------------------------------------------------------------

import { assertFunction, assertNotNullOrUndefined } from '@emavok/ts-paranoia';

// tslint:disable-next-line:ban-types
export function rest<T extends new (...args: any[]) => any>(constructor: T) {
    return class extends constructor {
        constructor(...args: any[]) {
            super(...args);

            assertFunction(this.getRouter);
            assertNotNullOrUndefined(this.getRouter());
        }
    };
}
