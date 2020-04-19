// ------------------------------------------------------------------------------------------------
// Logger service
// ------------------------------------------------------------------------------------------------

import {
    injectable,
} from 'inversify';

import { assertStringNotEmpty } from '@emavok/ts-paranoia';

import {
    ILogger,
    ILoggerService,
} from './logger.types';

import { LoggerInstance } from './internal/logger';

import { ILoggerInstanceOptions } from './internal/logger.types';

@injectable()
// ------------------------------------------------------------------------------------------------
/** Logger service */
// ------------------------------------------------------------------------------------------------
export class LoggerService implements ILoggerService {

    /** global logger instance */
    private _instance: LoggerInstance = new LoggerInstance();

    // --------------------------------------------------------------------------------------------
    /**
     * Returns the global logger instance
     * @retval Logger instance
     */
    // --------------------------------------------------------------------------------------------
    public getGlobal(): ILogger {
        return this._instance;
    }

    // --------------------------------------------------------------------------------------------
    /**
     * Creates and returns a specific logger instance
     * @param sourceName Source file name
     * @retval Logger instance associated with that source file name
     */
    // --------------------------------------------------------------------------------------------
    public getInstance(sourceName: string): ILogger {
        assertStringNotEmpty(sourceName);
        // derive options from global logger instance options
        const opts: ILoggerInstanceOptions = {
            ...this._instance.getOptions(),
            sourceName: sourceName
        };
        // create and return a new instance
        return new LoggerInstance(opts);
    }
}
