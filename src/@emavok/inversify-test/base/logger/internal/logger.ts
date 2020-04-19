// ------------------------------------------------------------------------------------------------
// Logger
// ------------------------------------------------------------------------------------------------

import {
    assertValidation,
    getSafe,
    isNullOrUndefined,
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
    private _sourceName: string = '';

    // ------------------------------------------------------------------------------------------------
    /** constructor */
    // ------------------------------------------------------------------------------------------------
    constructor( options?: ILoggerInstanceOptions ) {
        this.setOptions(options);
    }

    // ------------------------------------------------------------------------------------------------
    /**
     * Set logger instance options
     * @param options Optional logger instance options
     */
    // ------------------------------------------------------------------------------------------------
    public setOptions( options?: ILoggerInstanceOptions ) {
        // if options are provided
        if (!isNullOrUndefined(options)) {
            // validate options object
            assertValidation( options, LOGGER_INSTANCE_OPTIONS_SCHEMA );
        }

        // ensure we have an options object
        const opts: ILoggerInstanceOptions = getSafe<ILoggerInstanceOptions>(options, {});

        // get values with default fallback
        this._logLevel = getSafe(opts.logLevel, ELogLevel.INFO);
        this._sourceName = getSafe(opts.sourceName, '');
        this._appender = getSafe(opts.appender, defaultAppender);
        this._formatter = getSafe(opts.formatter, defaultFormatter);
    }

    // ------------------------------------------------------------------------------------------------
    /**
     * Set logger instance options
     * @param options Optional logger instance options
     */
    // ------------------------------------------------------------------------------------------------
    public getOptions(): ILoggerInstanceOptions {
        const opts: ILoggerInstanceOptions = {};
        opts.logLevel = this._logLevel;
        opts.sourceName = this._sourceName;
        opts.appender = this._appender;
        opts.formatter = this._formatter;
        return opts;
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
        const log: string = this._formatter(this._sourceName, level, msg, data);

        // append formatted log message
        this._appender(level, log);
    }
}
