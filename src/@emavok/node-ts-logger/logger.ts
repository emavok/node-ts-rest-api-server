// ------------------------------------------------------------------------------------------------
// Logger
// ------------------------------------------------------------------------------------------------

import {
    assertObject,
    getSafe,
    hasValidationErrors,
    isNull,
    validate,
    ValidationErrors,
} from '@emavok/ts-paranoia';

import {
    ELogLevel,
    ILogger,
    ILoggerOptions,
} from './logger.types';

import { defaultAppender } from './internal/appender';

import { defaultFormatter } from './internal/formatter';

import {
    ILoggerInstanceOptions,
    LOGGER_OPTIONS_SCHEMA,
} from './internal/logger.types';

import { LoggerInstance } from './internal/logger';

// ------------------------------------------------------------------------------------------------
/** Logger class */
// ------------------------------------------------------------------------------------------------
export class Logger {

    // --------------------------------------------------------------------------------------------
    /**
     * Set logger options
     * @param opts Option object - empty keys set default values
     */
    // --------------------------------------------------------------------------------------------
    public static set options( opts: ILoggerOptions ) {
        assertObject(opts);

        // validate options
        const err: ValidationErrors | null = validate( LOGGER_OPTIONS_SCHEMA, opts );
        if (hasValidationErrors(err)) {
            throw new Error('Invalid logger options.');
        }

        // create new options object using default fallbacks
        this._options = {
            logLevel: getSafe( opts.logLevel, ELogLevel.INFO ),
            appender: getSafe( opts.appender, defaultAppender ),
            formatter: getSafe( opts.formatter, defaultFormatter ),
        };
    }

    // --------------------------------------------------------------------------------------------
    /**
     * Returns a copy of the current logger options
     * @returns Option object
     */
    // --------------------------------------------------------------------------------------------
    public static get options(): ILoggerOptions {
        // if options are not yet initialized
        if (isNull(this._options)) {
            // create default options using setter
            this.options = {};
        }
        // return an options copy
        return {
            ...this._options
        };
    }

    // --------------------------------------------------------------------------------------------
    /**
     * Creates a new logger instance
     * @param sourceName Optional logging source identifier (hint: use __filename)
     * @returns New logger instance
     */
    // --------------------------------------------------------------------------------------------
    public static getInstance( sourceName?: string ): ILogger {
        const opts: ILoggerInstanceOptions = {
            ...this._options,
            sourceName: sourceName,
        };
        const loggerInstance: ILogger = new LoggerInstance( opts );
        return loggerInstance;
    }

    // --------------------------------------------------------------------------------------------
    /**
     * Returns the global logger instance
     * @returns Global logger instance
     */
    // --------------------------------------------------------------------------------------------
    public static getGlobal(): ILogger {
        if (isNull(this._instance)) {
            this._instance = Logger.getInstance();
        }
        return this._instance;
    }

    /** Global logger instance reference */
    private static _instance: ILogger | null = null;

    /** Global logger options object */
    private static _options: ILoggerOptions | null = null;
}
