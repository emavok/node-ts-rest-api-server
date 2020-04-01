// ------------------------------------------------------------------------------------------------
// Default appender function
// ------------------------------------------------------------------------------------------------

import { ELogLevel } from '../logger.types';

// ------------------------------------------------------------------------------------------------
/**
 * Log message appender function
 * @param level Severity level of log message
 * @param msg Log message
 */
// ------------------------------------------------------------------------------------------------
export function defaultAppender(level: ELogLevel, msg: string): void {
    switch (level) {
        case ELogLevel.ERROR:
            // tslint:disable-next-line:no-console
            console.error(msg);
            break;
        case ELogLevel.WARNING:
            // tslint:disable-next-line:no-console
            console.warn(msg);
            break;
        default:
            // tslint:disable-next-line:no-console
            console.log(msg);
    }
}
