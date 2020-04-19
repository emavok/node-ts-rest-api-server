// ------------------------------------------------------------------------------------------------
// List types
// ------------------------------------------------------------------------------------------------

// ------------------------------------------------------------------------------------------------
/** Filter operators */
// ------------------------------------------------------------------------------------------------
export enum EFilterOperator {
    EQUAL = '=',
    NOT_EQUAL = '!=',
    GREATER_THAN = '>',
    GREATER_EQUALS = '>=',
    LESS_THAN = '<',
    LESS_EQUALS = '<=',
    LIKE = '~',
    NOT_LIKE = '!~',
    ILIKE = '~~',
    NOT_ILIKE = '!~~',
    IS_NULL = '0',
    IS_NOT_NULL = '!0',
    IN = '[]',
    NOT_IN = '![]',
}

// ------------------------------------------------------------------------------------------------
/** Sort direction */
// ------------------------------------------------------------------------------------------------
export enum ESortDirection {
    /** Ascending */
    ASC = 'ASC',
    /** Descending */
    DESC = 'DESC',
    // ASC_NULL_FIRST
    // ASC_NULL_LAST
    // DESC_NULL_FIRST
    // DESC_NULL_LAST
}

// ------------------------------------------------------------------------------------------------
/** Filter criterion for accessing lists */
// ------------------------------------------------------------------------------------------------
export interface IFilterCriterion {
    /** attribute to filter */
    a: string;
    /** operator */
    o: EFilterOperator;
    /** value to compare to */
    v: any;
}

// ------------------------------------------------------------------------------------------------
/** Sort criterion for accessing lists */
// ------------------------------------------------------------------------------------------------
export interface ISortCriterion {
    /** attribute to sort by */
    a: string;
    /** sort direction */
    d: ESortDirection;
}

// ------------------------------------------------------------------------------------------------
/** Pagination criterion for accessing lists */
// ------------------------------------------------------------------------------------------------
export interface IPaginationCriterion {
    /** offset - zero-based index of first item to be returned */
    o: number;
    /** limit - number of items to be returned */
    l: number;
}

// ------------------------------------------------------------------------------------------------
/** Pagination criteria for accessing lists */
// ------------------------------------------------------------------------------------------------
export interface IListQueryParameter {
    /** Optional filter criteria */
    filter?: IFilterCriterion[];

    /** Optional pagination criterion */
    pagination?: IPaginationCriterion;

    /** Optional sort criteria */
    sort?: ISortCriterion[];
}

// ------------------------------------------------------------------------------------------------
/** Pagination meta data */
// ------------------------------------------------------------------------------------------------
export interface IPagination {
    /** start index of result list */
    offset: number;
    /** window size */
    limit: number;
    /** total number of entities */
    total: number;
}

// ------------------------------------------------------------------------------------------------
/** Paginated list */
// ------------------------------------------------------------------------------------------------
export interface IPaginatedList<TYPE> {
    /** list data */
    rows: TYPE[];

    /** pagination information for lists */
    pagination: IPagination;
}
