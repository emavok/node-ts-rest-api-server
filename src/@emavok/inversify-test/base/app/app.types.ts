// ------------------------------------------------------------------------------------------------
// App service types
// ------------------------------------------------------------------------------------------------

import { Router } from 'express';

// ------------------------------------------------------------------------------------------------
/** Application interface */
// ------------------------------------------------------------------------------------------------
export interface IApplication {
    /**
     * Adds an endpoint to the public api
     * @param path Endpoint path - is prefixed by api/public
     * @param router Router object
     */
    addPublicEndpoint( path: string, router: Router ): void;
    /**
     * Adds an endpoint to the protected api
     * @param path Endpoint path - is prefixed by api/protected
     * @param router Router object
     */
    addProtectedEndpoint( path: string, router: Router ): void;
    /**
     * Starts the api server
     * @param port Optional port - defaults to 3000
     */
    start(port?: number): void;
}

// ------------------------------------------------------------------------------------------------
/** Application dependency injection symbol */
// ------------------------------------------------------------------------------------------------
export const DI_APPLICATION = Symbol('Application');

// ------------------------------------------------------------------------------------------------
/** REST endpoint mapping */
// ------------------------------------------------------------------------------------------------
export interface IEndpointMapping {
    path: string;
    router: Router;
}

// ------------------------------------------------------------------------------------------------
/** Public api endpoint array dependency injection symbol */
// ------------------------------------------------------------------------------------------------
export const DI_PUBLIC_ENDPOINTS = Symbol('PublicApiEndpoints');
