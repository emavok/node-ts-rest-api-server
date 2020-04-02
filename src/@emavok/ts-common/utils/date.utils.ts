// ------------------------------------------------------------------------------------------------
//  Provides utility functions for date and time handling
// ------------------------------------------------------------------------------------------------

// ------------------------------------------------------------------------------------------------
//  External imports
// ------------------------------------------------------------------------------------------------

// Import moment
// See https://momentjs.com/docs/#/use-it/typescript/
// and https://github.com/RicoSuter/NSwag/issues/1859
import * as moment from 'moment';

// ------------------------------------------------------------------------------------------------
import {
    EUnitOfTime,
    IDateRange,
    IDateTimeViewOptions,
    TDate,
    TDateTime,
    TTime,
} from './datetime.types';

// ------------------------------------------------------------------------------------------------
/**
 * Converts a string or Date input to a Moment object
 * @param v Input to convert
 * @return Moment object
 */
// ------------------------------------------------------------------------------------------------
export function anyToMoment(v: Date | string): moment.Moment {
    if (typeof v === 'string') {
        return moment.default(v, moment.ISO_8601);
    }
    return moment.default(v);
}

// ------------------------------------------------------------------------------------------------
/** Provides utility functions for date and time handling */
// ------------------------------------------------------------------------------------------------
export class TDateUtils {

    // ---------------------------------------------------------------------------------------------
    /** Checks whether input is a valid date object
     *
     * #### Usage
     * ```
     * TDateUtils.isValidDate( new Date() )
     * => true
     *
     * TDateUtils.isValidDate( new Date('foo') )
     * => false
     *
     * TDateUtils.isValidDate( 'narf' )
     * => false
     *
     * TDateUtils.isValidDate( null )
     * => false
     *
     * TDateUtils.isValidDate( '2018-01-31T15:22:23Z' )
     * => true
     * ```
     *
     * @param v Date input to be checked
     * @return true if valid date, false otherwise
     */ // ----------------------------------------------------------------------------------------
    public static isValidDate(v: string | Date): boolean {
        const result = anyToMoment(v);
        return result.isValid();
    }

    // ---------------------------------------------------------------------------------------------
    /** Checks whether input is a valid datetime object
     *
     * #### Usage
     * ```
     * TDateUtils.isValidDatetime( new Date() )
     * => false
     *
     * TDateUtils.isValidDatetime( 'narf' )
     * => false
     *
     * TDateUtils.isValidDatetime( null )
     * => false
     *
     * TDateUtils.isValidDatetime( '15:22:23' )
     * => true
     * ```
     *
     * @param v time input to be checked
     * @return true if valid time, false otherwise
     */ // ----------------------------------------------------------------------------------------
     public static isValidTime(v: string): boolean {
        const result = anyToMoment( TDateUtils.convertTimeToDateTime( v ) );
        return result.isValid();
    }

    // ---------------------------------------------------------------------------------------------
    /** Converts a date-less time input into a full date of now for using date-related methods.
     *
     * #### Usage
     * ```
     * TDateUtils.convertTimeToDateTime( '13:40:02' )
     * => '2018-09-05T13:40:02'
     * ```
     *
     * @param v time input in HH:MM:SS to be converted
     * @return input time as ISO8601 date string
     */ // ----------------------------------------------------------------------------------------
    public static convertTimeToDateTime( time: TTime ): TDateTime {
        const defaultDate: Date = new Date();
        const defaultDateIso: string = defaultDate.toISOString().split('T')[0];
        return moment.default( `${defaultDateIso}T${time}` ).toISOString();
    }

    // ---------------------------------------------------------------------------------------------
    /** Checks whether input is a valid date range object
     *
     * #### Usage
     * ```
     * TDateUtils.isValidDate({
     *     start: new Date(),
     *     end: new Date(),
     * })
     * => true
     *
     * TDateUtils.isValidDate({
     *     start: new Date('foo'),
     *     end: new Date(),
     * })
     * => false
     *
     * TDateUtils.isValidDate({
     *     start: new Date(),
     *     end: new Date('narf'),
     * })
     * => false
     *
     * TDateUtils.isValidDate({
     *     start: new Date( null ),
     *     end: new Date(),
     * })
     * => false
     *
     * TDateUtils.isValidDate({
     *     start: new Date('2018-01-01T15:22:23Z'),
     *     end: new Date('2018-01-31T15:22:23Z'),
     * })
     * => true
     * ```
     *
     * @param v Date range input to be checked
     * @return true if valid date range, false otherwise
     */ // ----------------------------------------------------------------------------------------
     public static isValidDateRange(v: IDateRange): boolean {
        const resultStart = anyToMoment( v.start );
        const resultEnd = anyToMoment( v.end );
        return (resultStart.isValid() && resultEnd.isValid());
    }

    // ---------------------------------------------------------------------------------------------
    /** Returns the current time stamp
     * @return Current date with time as TDateTime
     */
    // ---------------------------------------------------------------------------------------------
    public static now(): TDateTime {
        return moment.default().toISOString();
    }

    // ---------------------------------------------------------------------------------------------
    /** Returns the current date (without time)
     * @return Current date as TDate
     */
    // ---------------------------------------------------------------------------------------------
    public static today(): TDate {
        return moment.default().startOf('day').toISOString();
    }

    // ---------------------------------------------------------------------------------------------
    /** Converts a date time to a view representation "18.11.2018 16:43:59"
     * @return View representation of a date time
     */ // ----------------------------------------------------------------------------------------
    public static dateTimeToView(dt: TDateTime, options?: IDateTimeViewOptions): string {
        // this causes messy hard-to-trace errors - use null instead of undefined
        if (dt === undefined) {
            throw new Error('Undefined value passed to TDateUtils.dateTimeToView');
        }
        // create format string from options
        let format: string = '';
        if (options) {
            // repair contradictionary settings
            if (options.onlyDate && options.onlyTime) {
                options.onlyDate = false;
                options.onlyTime = false;
            }
            // if date should be included
            if (!options.onlyTime) {
                // check whether date should be reverted
                if (options.dateReversed) {
                    format += 'YYYY.MM.DD';
                } else {
                    format += 'DD.MM.YYYY';
                }
            }
            if (!options.onlyDate && !options.onlyTime) {
                format += ' ';
            }
            if (!options.onlyDate) {
                format += 'HH:mm:ss';
                if (options.showFractionalSeconds) {
                    format += '.SSS';
                }
            }
        } else {
            format = 'DD.MM.YYYY HH:mm:ss';
        }
        // should null values be rendered as empty or special string?
        if (options && options.allowNull && dt === null) {
            return options.renderNullAs || '';
        }
        const retval: string = anyToMoment(dt).format(format);
        return retval;
    }

    // ---------------------------------------------------------------------------------------------
    /** Converts a time to a view representation "16:43:59"
     * @param time time string
     * @return View representation of a time
     */ // ----------------------------------------------------------------------------------------
    public static timeToView( time: TTime ): TTime {
        // TODO: convert from multiple input convention to uniform format

        // convert time to full date
        const timeAsDate: TDateTime = TDateUtils.convertTimeToDateTime( time );
        // return model view representation of time
        const retval: TTime = TDateUtils.dateTimeToView( timeAsDate, { onlyTime: true } );
        return retval;
    }

    // ---------------------------------------------------------------------------------------------
    /** Converts a date time to a log representation (date reverted) "2018.11.18 16:43:59:987"
     * @return Log representation of a date time with reverted date including fractional seconds
     */ // ----------------------------------------------------------------------------------------
    public static dateTimeToLog(dt: TDateTime): string {
        const retval: string = TDateUtils.dateTimeToView(dt, { dateReversed: true, showFractionalSeconds: true });
        return retval;
    }

    // ---------------------------------------------------------------------------------------------
    /** Returns the time difference between two date-times
     * @param start Start time
     * @param end End time
     * @return Time difference in milliseconds
     */ // ----------------------------------------------------------------------------------------
    public static dateTimeInterval(start: TDateTime, end: TDateTime): number {
        const diffInMilliSeconds: number = anyToMoment(start).diff(anyToMoment(end));
        return diffInMilliSeconds;
    }

    // --------------------------------------------------------------------------------------------
    /** Converts a customer-specific partial string into a date object
     * allows various syntax for date input:
     *
     * - various delimiter: . or - or /
     *   => Example: 1.1.2012
     *   => Example: 1-1-2012
     *   => Example: 1/1/2012
     *
     * - short year notation:
     *   => Example: 1.1.12 => 01.01.2012
     *   => Example: 1.1.79 => 01.01.1979
     *   => Example: 1.1. 1.1.YEAR (where YEAR is the current year)
     *
     * - basic validation checks, return null on error
     *
     * #### Usage
     * ```
     * DateUtils.convertCustomDateStringToDate( '1.2.80' )
     * => returns a date object with ISO-date 1980-02-01
     * ```
     *
     * @param v Date input as text
     * @return ISO string date
     */ // ----------------------------------------------------------------------------------------
    public static convertCustomDateStringToDate(value: string): string {
        if (!value) {
            return value;
        }
        let day: number;
        let month: number;
        let year: number;
        let tokens: string[];
        let result: moment.Moment;

        // replace all slashes and dashes by dots
        if (!value || !value.replace) {
            return value;
        }
        tokens = value.replace(/\//g, '.').replace(/-/g, '.').split('.');

        // interpret and check values
        day = parseInt(tokens[0], 10);
        if (isNaN(day) || (day < 1) || (day > 31)) {
            return value;
        }
        month = parseInt(tokens[1], 10);
        if (isNaN(month) || (month < 1) || (month > 12)) {
            return value;
        }
        // year may be omitted => replace with current year
        if (!tokens[2] || !tokens[2].length) {
            tokens[2] = (new Date()).getFullYear().toString();
        }
        year = parseInt(tokens[2], 10);
        if (isNaN(year)) {
            return value;
        }
        // year may contain only last two digits => add century
        if (year < 100) {
            if (year < 30) {
                year += 2000;
            } else {
                year += 1900;
            }
        }
        // make them strings
        const yearStr: string = year + '';
        const monthStr: string = month + '';
        const dayStr: string = day + '';
        // construct iso string from values and
        // ensure that values are padded with leading zero's.
        // otherwise it wont be recognized as iso string
        const isoStr: string =
            yearStr.padStart( 4, '0')
            + '-' + monthStr.padStart( 2, '0' )
            + '-' + dayStr.padStart( 2, '0');
        // convert iso string to moment object and check it's validity
        result = anyToMoment(isoStr);
        if (result.isValid()) {
            return isoStr;
        }
        // return an invalid date
        return value;
    }

    // --------------------------------------------------------------------------------------------
    /** Converts a customer-specific partial string into a TDateTime string
     * allows various syntax for date input: HH:MM:SS, H:M:S, HH/MM/SS, H/M/S, HH-MM-SS, H-M-S.
     *
     * - various delimiter: . or - or /
     *   => Example: 16:25:39 // returns 16:25:39
     *   => Example: 16.25.39 // returns 16:25:39
     *   => Example: 16-25-39 // returns 16:25:39
     *
     * - digit completion:
     *   => Example: 6:5:9 // returns 06:05:09
     *   => Example: 6:5 // returns 06:05:00
     *
     * - basic validation checks, return null on error
     *
     * #### Usage
     * ```
     * DateUtils.convertCustomTimeStringToDateTime( '6.5' )
     * => returns a date object with ISO-date 1980-02-01T06:06:09
     * ```
     *
     * @param v Date input as text
     * @return ISO string date
     */ // ----------------------------------------------------------------------------------------
     public static convertCustomTimeStringToDateTime(value: string): TDateTime {
        let hours: number;
        let minutes: number;
        let seconds: number;
        let tokens: string[] = [];
        let time: TTime;

        // replace all dots and dashes by columns
        if (!value || !value.replace) {
            return value;
        }
        tokens = value.replace(/\./g, ':').replace(/-/g, ':').split(':');

        // interpret and check values
        hours = parseInt(tokens[0], 10);
        if (isNaN(hours) || (hours < 0) || (hours > 23)) {
            return value;
        }
        minutes = parseInt(tokens[1], 10);
        if (isNaN(minutes) || (minutes < 0) || (minutes > 59)) {
            return value;
        }
        // seconds are optional
        if ( tokens[2] ) {
            // if seconds entered
            seconds = parseInt(tokens[2], 10);
            if (isNaN(seconds) || (seconds < 0) || (seconds > 59)) {
                return value;
            }
        } else {
            // if seconds not entered
            seconds = 0;
        }

        // prepend digit if necessary
        const hoursStr: string = hours < 10 ? hours.toString().padStart( 2, '0' ) : hours.toString();
        const minutesStr: string = minutes < 10 ? minutes.toString().padStart( 2, '0' ) : minutes.toString();
        const secondsStr: string = seconds < 10 ? seconds.toString().padStart( 2, '0' ) : seconds.toString();

        // create time string
        time = [ hoursStr, minutesStr, secondsStr ].join( ':' );

        // convert time to full date
        const dateTime: TDateTime = TDateUtils.convertTimeToDateTime( time );
        // successfully return time if valid
        const result = anyToMoment(dateTime);
        if (result.isValid()) {
            return dateTime;
        }

        // return an invalid date
        return value;
     }

    // --------------------------------------------------------------------------------------------
    /** Converts a date object or ISO string to German date representation
     *
     * #### Usage
     * ```
     * DateUtils.convertDateToGermanString(new Date('2017-05-02'))
     * => returns a string '02.05.2017'
     *
     * DateUtils.convertDateToGermanString('2017-05-02')
     * => returns a string '02.05.2017'
     * ```
     *
     * @param v Date input to be converted into a German date string
     * @return German-specific string representation of Date
     */ // ----------------------------------------------------------------------------------------
    public static convertDateToGermanString(date: Date | string): string {
        const result = anyToMoment(date);
        if (result.isValid()) {
            return result.format('DD.MM.YYYY');
        }
        return '';
    }

    // --------------------------------------------------------------------------------------------
    /** Converts a date object or ISO string to German date representation
     *
     * #### Usage
     * ```
     * DateUtils.convertDateToGermanString(new Date('2017-05-02T18:30:52'))
     * => returns a string '02.05.2017 18:30:52'
     * ```
     *
     * @param v Date input to be converted into a German date string
     * @return German-specific string representation of date with time
     */ // ----------------------------------------------------------------------------------------
    public static convertDateToGermanDateTimeString(date: Date | string): string {
        const result = anyToMoment(date);
        if (result.isValid()) {
            return result.format('DD.MM.YYYY HH:mm:ss');
        }
        return '';
    }

    // --------------------------------------------------------------------------------------------
    /** Converts a date object or ISO string to German date representation
     *
     * #### Usage
     * ```
     * DateUtils.convertDateToGermanString(new Date('2017-05-02T18:30:52'))
     * => returns a string '18:30:52'
     * ```
     *
     * @param v Date input to be converted into a German date string
     * @return German-specific string representation of time only
     */ // ----------------------------------------------------------------------------------------
    public static convertDateToGermanTimeString(date: Date | string): string {
        const result = anyToMoment(date);
        if (result.isValid()) {
            return result.format('HH:mm');
        }
        return '';
    }

    // --------------------------------------------------------------------------------------------
    /** Converts date object into an ISO string without time part (all zero)
     *
     * #### Usage
     * ```
     * // use Date object as input
     * TDateUtils.convertDateToIsoString( new Date() )
     * => 2017-05-2017T00:00:00:000Z
     * ```
     *
     * @param v Date input to be converted into a string
     * @return Locale-specific string representation of Date
     */ // ----------------------------------------------------------------------------------------
    public static convertDateToIsoString(v: Date | string, withZeroTime?: boolean): string {
        /*
        let tmpDate: Date = new Date(v);
        tmpDate.setUTCHours(0, 0, 0, 0);
        return tmpDate.toISOString();
        */
        let str: string = anyToMoment(v).format('YYYY-MM-DD');
        if (withZeroTime) {
            str += 'T00:00:00.000Z';
        }
        return str;
    }

    // --------------------------------------------------------------------------------------------
    /** Converts a date object or ISO string to logfile date-time representation
     *
     * #### Usage
     * ```
     * DateUtils.convertDateToLogDateTimeString(new Date('2017-05-02T18:30:52'))
     * => returns a string '2017.05.02 18:30:52'
     * ```
     *
     * @param v Date input to be converted into a German date string
     * @return Logfile date-time string representation of provided timestamp
     */ // ----------------------------------------------------------------------------------------
    public static convertDateToLogDateTimeString(date: Date | string): string {
        const result = anyToMoment(date);
        if (result.isValid()) {
            return result.format('DD.MM.YYYY HH:mm:ss');
        }
        return '';
    }

    // --------------------------------------------------------------------------------------------
    /** Returns the current time stamp as log file date-time string
     *
     * #### Usage
     * ```
     * DateUtils.getLogDateTimeString()
     * => returns a string '2017.05.02 18:30:52' of the current date-time
     * ```
     *
     * @return Logfile date-time string representation of current time
     */ // ----------------------------------------------------------------------------------------
    public static getLogDateTimeString(): string {
        const retval: string = TDateUtils.convertDateToLogDateTimeString(new Date());
        return retval;
    }

    // --------------------------------------------------------------------------------------------
    /** Converts date or us-local string input to a date object
     *
     * #### Usage
     * ```
     * // use Date object as input
     * TDateUtils.convertAnyToDate( new Date() )
     *
     * // use us-US date string as input
     * TDateUtils.convertAnyToDate( '2017-01-05' )
     *
     * ```
     *
     * @param v Date or string input to be converted into a Date
     * @return Date object or null if invalid
     */ // ----------------------------------------------------------------------------------------
    public static convertAnyToDate(v: any): Date | null {
        const result = anyToMoment(v);
        if (result.isValid()) {
            return result.toDate();
        }
        return null;
    }

    // --------------------------------------------------------------------------------------------
    /** Checks whether first date is before second date with optional precision
     *
     * #### Usage
     * ```
     * TDateUtils.isBefore( new Date(), '2099-01-01' )
     * => true
     *
     * TDateUtils.isBefore( '2010-01-01', new Date('2010-01-01') )
     * => false
     *
     * TDateUtils.isBefore( '2010-01-01T01:01', '2010-01-01T23:59', 'day' )
     * => false
     * ```
     *
     * @param a First date input to be checked
     * @param b Second date input to be checked
     * @param percision Optional precision argument
     * @return true if a < b, false otherwise
     */ // ----------------------------------------------------------------------------------------
    public static isBefore(a: any, b: any, precision?: TDateUnit): boolean {
        return anyToMoment(a).isBefore(anyToMoment(b), precision);
    }

    // --------------------------------------------------------------------------------------------
    /** Checks whether first date is after second date with optional precision
     *
     * #### Usage
     * ```
     * TDateUtils.isAfter( new Date(), '2000-01-01' )
     * => true
     *
     * TDateUtils.isAfter( '2010-01-01', new Date('2010-01-01') )
     * => false
     *
     * TDateUtils.isAfter( '2010-01-01T23:00', '2010-01-01T00:00', 'day' )
     * => false
     * ```
     *
     * @param a First date input to be checked
     * @param b Second date input to be checked
     * @param percision Optional precision argument
     * @return true if a > b, false otherwise
     */ // ----------------------------------------------------------------------------------------
    public static isAfter(a: any, b: any, precision?: TDateUnit): boolean {
        return anyToMoment(a).isAfter(anyToMoment(b), precision);
    }

    // --------------------------------------------------------------------------------------------
    /** Checks whether first date equals second date with optional precision
     *
     * #### Usage
     * ```
     * TDateUtils.isEqual( new Date(), '2000-01-01' )
     * => false
     *
     * TDateUtils.isEqual( '2010-01-01', new Date('2010-01-01') )
     * => true
     *
     * TDateUtils.isEqual( '2010-01-01T23:00', '2010-01-01T00:00', 'day' )
     * => true
     * ```
     *
     * @param a First date input to be checked
     * @param b Second date input to be checked
     * @param percision Optional precision argument
     * @return true if a = b, false otherwise
     */ // ----------------------------------------------------------------------------------------
    public static isEqual(a: any, b: any, precision?: TDateUnit): boolean {
        return anyToMoment(a).isSame(anyToMoment(b), precision);
    }

    // --------------------------------------------------------------------------------------------
    /** Returns the minimum of two date or date-time values
     *
     * #### Usage
     * ```
     * TDateUtils.min( '2019-01-31', '1999-12-20' )
     * => '1999-12-20'
     *
     * TDateUtils.min( '2010-05-07T08:00', '2010-05-07T10:00' )
     * => '2010-05-07T08:00'
     * ```
     *
     * @param a First date input to compare
     * @param b Second date input to compare
     * @return null if a or b are invalid dates, a if a < b, b otherwise
     */ // ----------------------------------------------------------------------------------------
     public static min(a: any, b: any): any {
        // get a moment instance of both values
        const am: moment.Moment = anyToMoment(a);
        const bm: moment.Moment = anyToMoment(b);
        // if either one is invalid
        if (!am.isValid() || !bm.isValid()) {
            // return null
            return null;
        }
        if (am.isBefore(bm)) {
            return a;
        }
        return b;
    }

    // --------------------------------------------------------------------------------------------
    /** Returns the maximum of two date or date-time values
     *
     * #### Usage
     * ```
     * TDateUtils.min( '2019-01-31', '1999-12-20' )
     * => '1999-12-20'
     *
     * TDateUtils.min( '2010-05-07T08:00', '2010-05-07T10:00' )
     * => '2010-05-07T08:00'
     * ```
     *
     * @param a First date input to compare
     * @param b Second date input to compare
     * @return null if a or b are invalid dates, a if a > b, b otherwise
     */ // ----------------------------------------------------------------------------------------
     public static max(a: any, b: any): any {
        // get a moment instance of both values
        const am: moment.Moment = anyToMoment(a);
        const bm: moment.Moment = anyToMoment(b);
        // if either one is invalid
        if (!am.isValid() || !bm.isValid()) {
            // return null
            return null;
        }
        if (am.isAfter(bm)) {
            return a;
        }
        return b;
    }

    // --------------------------------------------------------------------------------------------
    /**
     * @deprecated Use incrementBy( date: TDateTime, amount: number, unit: EUnitOfTime ): TDateTime
     *
     * Increment given date by days
     *
     * #### Usage
     * ```
     * TDateUtils.incrementDateByDays( new Date(), 5 )
     * => 'Fri Feb 02 2018 09:29:37 GMT+0100 (Mitteleuropäische Zeit)'
     * ```
     *
     * @param a date to be incremented from
     * @param b amount of days to be added
     * @return incremented date
     */ // ----------------------------------------------------------------------------------------
    public static incrementDateByDays(a: Date, b: number): Date {
        const date = a;
        date.setDate(date.getDate() + b);
        return date;
    }

    // --------------------------------------------------------------------------------------------
    /**
     * Increment a date by some amount of time
     *
     * #### Usage
     * ```
     * TDateUtils.incrementBy( '2019-02-04', 5, EUnitOfTime.DAYS )
     * => '2019-02-09T00:00:00'
     *
     * TDateUtils.incrementBy( '2010-01-01T08:00', 2, EUnitOfTime.HOURS )
     * => '2010-01-01T10:00'
     * ```
     *
     * @param date Starting date-time
     * @param amount Amount in units of time
     * @param unitOfTime A unit of time (days, years, hours, ...)
     * @return incremented date
     */ // ----------------------------------------------------------------------------------------
    public static incrementBy( date: TDateTime | Date, amount: number, unitOfTime: EUnitOfTime ): TDateTime {
        // get a moment instance of both values
        const am: moment.Moment = anyToMoment( date );
        return am.add( amount, unitOfTime ).toISOString();
    }

    // --------------------------------------------------------------------------------------------
    /** Decrement given date by days
     *
     * #### Usage
     * ```
     * TDateUtils.decrementDateByDays( new Date(), 5 )
     * => 'Fri Feb 02 2018 09:29:37 GMT+0100 (Mitteleuropäische Zeit)'
     *
     * TDateUtils.decrementDateByDays( '2010-01-01', 5 )
     * => 'Wed Jan 06 2010 01:00:00 GMT+0100 (Mitteleuropäische Zeit)'
     * ```
     *
     * @param a date to be incremented from
     * @param b amount of days to be added
     * @return incremented date
     */ // ----------------------------------------------------------------------------------------
    public static decrementDateByDays(a: Date, b: number): Date {
        const date = a;
        date.setDate(date.getDate() - b);
        return date;
    }

    // --------------------------------------------------------------------------------------------
    /**
     * Decrement a date by some amount of time
     *
     * #### Usage
     * ```
     * TDateUtils.decrementBy( '2019-02-04', 5, EUnitOfTime.DAYS )
     * => '2019-01-30T00:00:00'
     *
     * TDateUtils.decrementBy( '2010-01-01T08:00', 2, EUnitOfTime.HOURS )
     * => '2010-01-01T06:00'
     * ```
     *
     * @param date Starting date-time
     * @param amount Amount in units of time
     * @param unitOfTime A unit of time (days, years, hours, ...)
     * @return decremented date
     */ // ----------------------------------------------------------------------------------------
     public static decrementBy( date: TDateTime | Date, amount: number, unitOfTime: EUnitOfTime ): TDateTime {
        // get a moment instance of both values
        const am: moment.Moment = anyToMoment( date );
        return am.subtract( amount, unitOfTime ).toISOString();
    }

    // ---------------------------------------------------------------------------------------------
    /** Formats a date model value (= iso string) to show it in view (= german formatted date)
     * @param date Date model value to convert to view value
     * @return Date view value
     */
    // ---------------------------------------------------------------------------------------------
    public static formatDateModelToView( date: string ): string {
        // ignore nulls, empty values and invalid data
        if ( ! date || ! this.isValidDate(date) ) {
            return date;
        }
        const retval: string = this.dateTimeToView( date, { onlyDate: true } );
        return retval;
    }

    // ---------------------------------------------------------------------------------------------
    /** Unformats a Date view representation to obtain its model value
     * @param date Date view value to convert to model value
     * @return Date model value
     */
    // ---------------------------------------------------------------------------------------------
    public static formatDateViewToModel( date: string ): string {
        // hope for the best that conversion works
        const retval: string = this.convertCustomDateStringToDate( date );
        return retval;
    }

    // ---------------------------------------------------------------------------------------------
    /** Unformats a Time view representation to obtain its model value
     * @param time Time view value to convert to model value
     * @return Time model value
     */
    // ---------------------------------------------------------------------------------------------
    public static formatTimeViewToModel( time: string ): string {
        // hope for the best that conversion works
        const dateTime: TDateTime = this.convertCustomTimeStringToDateTime( time );
        const timeModel: TTime = this.dateTimeToView( dateTime, { onlyTime: true } );
        return timeModel;
    }

    // ---------------------------------------------------------------------------------------------
    /** Formats a time model value (= iso string) to show it in view (= german formatted time)
     * @param time Time model value to convert to view value
     * @return Time view value
     */
    // ---------------------------------------------------------------------------------------------
    public static formatTimeModelToView( time: TTime ): string {
        // ignore nulls, empty values and invalid data
        if ( ! time || ! this.isValidTime(time) ) {
            return time;
        }
        return time;
    }

    // ---------------------------------------------------------------------------------------------
    /** Decomposes a date into its parts
     * @param date Date object of iso string
     * @return Structure containing all date time parts { year, month, day, hour, minute, second, millisecond }
     */
    // ---------------------------------------------------------------------------------------------
    public static decompose( date: Date | TDate | TDateTime ): any {
        const momentDt: moment.Moment = anyToMoment( date );
        const fields: number[] = momentDt.toArray();
        const result: any = {
            year: fields[0],
            month: fields[1],
            day: fields[2],
            hour: fields[3],
            minute: fields[4],
            second: fields[5],
            millisecond: fields[6],
        };
        return result;
    }

    // ---------------------------------------------------------------------------------------------
    /** Composes a date from its parts
     * @param date Object with date parts { year, month, day, hour, minute, second, millisecond }
     * @return TDateTime
     */
    // ---------------------------------------------------------------------------------------------
    public static compose( date: any ): TDateTime {
        const momentDt: moment.Moment = moment.default([
            date.year,
            date.month,
            date.day,
            date.hour,
            date.minute,
            date.second,
            date.millisecond,
        ]);
        // return as default iso format
        return momentDt.format();
    }
}

/** Unit of date - ['year', 'month', 'day', 'hour', 'minute', 'second', ... ] (and a few more) */
export type TDateUnit = moment.unitOfTime.StartOf;
