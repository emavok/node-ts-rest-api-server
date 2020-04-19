// ------------------------------------------------------------------------------------------------
// Default formatter function
// ------------------------------------------------------------------------------------------------

import { ELogLevel } from '../logger.types';

import { LOG_LEVEL_NAMES } from './logger.types';

// ------------------------------------------------------------------------------------------------
/**
 * Default formatter - formats a log message
 * @param sourceName Source class name
 * @param level Severity level of log message
 * @param msg Log message
 * @param data Optional data
 * @return Formatted log message
 */
// ------------------------------------------------------------------------------------------------
export function defaultFormatter(sourceName: string, level: ELogLevel, msg: string, data?: any): string {
    // split class name by @ or by node_modules
    let srcName: string = sourceName;
    if (srcName.indexOf('@') !== -1) {
        srcName = '@' + srcName.split('@')[1];
    }
    if (srcName.indexOf('node_modules') !== -1) {
        const split: string[] = srcName.split('node_modules');
        srcName = 'node_modules' + split[1];
    }

    let log: string = (new Date()).toISOString();
    log += ' ';
    if (srcName) {
        log += '[';
        log += srcName;
        log += '] ';
    }
    log += LOG_LEVEL_NAMES[level];
    log += ': ';
    log += msg;

    if (data) {
        log += ' | ';
        log += JSON.stringify(data);
    }
    return log;
}
