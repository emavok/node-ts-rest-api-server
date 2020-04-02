// ------------------------------------------------------------------------------------------------
/** Interface for dto for xFIS version endpoint */
// ------------------------------------------------------------------------------------------------
export interface IXfisVersionDto {
    /** Name of application */
    applicationName: string;
    /** Current version */
    version: string;
    /** Build time stamp if available */
    buildTimestamp: string;
    /** Additional information if available */
    info: string;
}
