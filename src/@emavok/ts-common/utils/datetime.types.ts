// ------------------------------------------------------------------------------------------------
//  Types for date-utils and time-related input-components
// ------------------------------------------------------------------------------------------------

/** Date day-only as ISO-string */
export type TDate = string;

/** Date as ISO-string */
export type TDateTime = string;

/** Date hour-only as ISO-string */
export type TTime = string;

/** Amount of milliseconds */
export type TDuration = number;

/** Time range between two day-dates */
export interface IDateRange {
    start: TDate;
    end: TDate;
}

/** Time range between two millisecond-dates */
export interface IDateTimeRange {
    start: TDateTime;
    end: TDateTime;
}

/** Options for date-utils methods */
export interface IDateTimeViewOptions {
    onlyDate?: boolean;
    onlyTime?: boolean;
    dateReversed?: boolean;
    showFractionalSeconds?: boolean;
    allowNull?: boolean;
    renderNullAs?: string;
}

/** unit of time */
export enum EUnitOfTime {
    YEAR = 'year',
    MONTH = 'month',
    DAY = 'day',
    HOUR = 'hour',
    MINUTE = 'minute',
    SECOND = 'second',
    MILLISECOND = 'millisecond'
}
