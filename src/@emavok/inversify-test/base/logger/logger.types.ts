// ------------------------------------------------------------------------------------------------
// Logger types
// ------------------------------------------------------------------------------------------------

// ------------------------------------------------------------------------------------------------
/** Definition of log levels */
// ------------------------------------------------------------------------------------------------
export enum ELogLevel {
    ERROR = 1,
    WARNING = 2,
    INFO = 3,
    VERBOSE = 4,
    DEBUG = 5,
}

// ------------------------------------------------------------------------------------------------
/**
 * Function to log a message
 * @param msg Log message
 * @param data Optional data
 */
// ------------------------------------------------------------------------------------------------
export type TLogFn = (msg: string, data?: any) => void;

// ------------------------------------------------------------------------------------------------
/**
 * Log message formatter function
 * @param sourceName Source class name
 * @param level Severity level of log message
 * @param msg Log message
 * @param data Optional data
 * @return Formatted log message
 */
// ------------------------------------------------------------------------------------------------
export type TLogFormatterFn = (sourceName: string, level: ELogLevel, msg: string, data?: any) => string;

// ------------------------------------------------------------------------------------------------
/**
 * Log message appender function
 * @param level Severity level of log message
 * @param msg Log message
 */
// ------------------------------------------------------------------------------------------------
export type TLogAppenderFn = (level: ELogLevel, msg: string) => void;

// ------------------------------------------------------------------------------------------------
/** Logger options interface */
// ------------------------------------------------------------------------------------------------
export interface ILoggerOptions {
    logLevel?: ELogLevel;
    formatter?: TLogFormatterFn;
    appender?: TLogAppenderFn;
}

// ------------------------------------------------------------------------------------------------
/** Logger interface */
// ------------------------------------------------------------------------------------------------
export interface ILogger {

    /** logs an error */
    error: TLogFn;

    /** logs a warning */
    warn: TLogFn;

    /** logs an info */
    info: TLogFn;

    /** logs a verbose info */
    verbose: TLogFn;

    /** logs a debug info */
    debug: TLogFn;
}

// ------------------------------------------------------------------------------------------------
/** Logger service interface */
// ------------------------------------------------------------------------------------------------
export interface ILoggerService {
    /** returns the global logger instance */
    getGlobal(): ILogger;
    /** returns a new instance specific to that source (file) name */
    getInstance(sourceName: string): ILogger;
}

// ------------------------------------------------------------------------------------------------
/** Logger service symbol for dependency injection */
// ------------------------------------------------------------------------------------------------
export const DI_LOGGER_SERVICE = Symbol('LoggerService');
