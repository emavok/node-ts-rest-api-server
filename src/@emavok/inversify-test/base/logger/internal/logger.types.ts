// ------------------------------------------------------------------------------------------------
// Inner (i.e. non-exported) logger types
// ------------------------------------------------------------------------------------------------

import {
    ETypes,
    IValidationSchema,
} from '@emavok/ts-paranoia';

import {
    ILoggerOptions,
} from '../logger.types';

// ------------------------------------------------------------------------------------------------
/** Log level name mapping */
// ------------------------------------------------------------------------------------------------
export const LOG_LEVEL_NAMES: string[] = [
    '0',
    'ERROR',
    'WARNING',
    'INFO',
    'VERBOSE',
    'DEBUG'
];

// ------------------------------------------------------------------------------------------------
/** Logger options validation schema */
// ------------------------------------------------------------------------------------------------
export const LOGGER_OPTIONS_SCHEMA: IValidationSchema = {
    type: ETypes.OBJECT,
    properties: {
        logLevel: {
            type: ETypes.INTEGER,
            min: 1,
            max: 5
        },
        appender: {
            type: ETypes.FUNCTION
        },
        formatter: {
            type: ETypes.FUNCTION
        }
    }
};

// ------------------------------------------------------------------------------------------------
/** Options interface for creating a new logger instance */
// ------------------------------------------------------------------------------------------------
export interface ILoggerInstanceOptions extends ILoggerOptions {
    sourceName?: string;
}

// ------------------------------------------------------------------------------------------------
/** Logger instance options validation schema */
// ------------------------------------------------------------------------------------------------
export const LOGGER_INSTANCE_OPTIONS_SCHEMA: IValidationSchema = {
    ...LOGGER_OPTIONS_SCHEMA,
    properties: {
        ...LOGGER_OPTIONS_SCHEMA.properties,
        sourceName: {
            type: ETypes.STRING
        },
    }
};
