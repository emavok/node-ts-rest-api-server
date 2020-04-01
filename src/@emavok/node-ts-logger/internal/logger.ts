// ------------------------------------------------------------------------------------------------
// Logger
// ------------------------------------------------------------------------------------------------

import {
    getSafe,
    isNullOrUndefined,
    validate,
    ValidationErrors,
} from '@emavok/ts-paranoia';

import {
    ELogLevel,
    ILogger,
    TLogAppenderFn,
    TLogFormatterFn,
} from '../logger.types';

import {
    ILoggerInstanceOptions,
    LOGGER_INSTANCE_OPTIONS_SCHEMA,
} from './logger.types';

import { defaultAppender } from './appender';

import { defaultFormatter } from './formatter';

// ------------------------------------------------------------------------------------------------
/** Default Logger class implementation */
// ------------------------------------------------------------------------------------------------
export class LoggerInstance implements ILogger {

    /** log message appender function */
    private _appender: TLogAppenderFn = defaultAppender;

    /** log message formatter function */
    private _formatter: TLogFormatterFn = defaultFormatter;

    /** maximum log level applied */
    private _logLevel: ELogLevel = ELogLevel.INFO;

    /** log source information */
    private _srcName: string = '';

    // ------------------------------------------------------------------------------------------------
    /** constructor */
    // ------------------------------------------------------------------------------------------------
    constructor( options?: ILoggerInstanceOptions ) {
        // if options are provided
        if (!isNullOrUndefined(options)) {
            // validate options object
            const err: ValidationErrors | null = validate( LOGGER_INSTANCE_OPTIONS_SCHEMA, options );
            // in case of error
            if (err !== null && err.length) {
                // print error log and use default settings
                this.error('Logger options validation error', err);
            } else {
                this._logLevel = getSafe(options.logLevel, ELogLevel.INFO);
                this._srcName = getSafe(options.sourceName, '');
                this._appender = getSafe(options.appender, defaultAppender);
                this._formatter = getSafe(options.formatter, defaultFormatter);
            }
        }
    }

    // ------------------------------------------------------------------------------------------------
    /** ILogger interface implementation */
    // ------------------------------------------------------------------------------------------------
    public error(msg: string, data?: any) {
        this._log(ELogLevel.ERROR, msg, data);
    }

    // ------------------------------------------------------------------------------------------------
    /** ILogger interface implementation */
    // ------------------------------------------------------------------------------------------------
    public warn(msg: string, data?: any) {
        this._log(ELogLevel.WARNING, msg, data);
    }

    // ------------------------------------------------------------------------------------------------
    /** ILogger interface implementation */
    // ------------------------------------------------------------------------------------------------
    public info(msg: string, data?: any) {
        this._log(ELogLevel.INFO, msg, data);
    }

    // ------------------------------------------------------------------------------------------------
    /** ILogger interface implementation */
    // ------------------------------------------------------------------------------------------------
    public verbose(msg: string, data?: any) {
        this._log(ELogLevel.VERBOSE, msg, data);
    }

    // ------------------------------------------------------------------------------------------------
    /** ILogger interface implementation */
    // ------------------------------------------------------------------------------------------------
    public debug(msg: string, data?: any) {
        this._log(ELogLevel.DEBUG, msg, data);
    }

    // ------------------------------------------------------------------------------------------------
    /** Logs a log message with associated data at a given log level
     * @param level Log level
     * @param msg Log message
     * @param data Optional additional data to log
     */
    // ------------------------------------------------------------------------------------------------
    private _log(level: ELogLevel, msg: string, data?: any ) {
        // ignore if level exceeds log level for this class
        if (level > this._logLevel) {
            return;
        }

        // create formated log message
        const log: string = this._formatter(this._srcName, level, msg, data);

        // append formatted log message
        this._appender(level, log);
    }
}
