// ------------------------------------------------------------------------------------------------
// Decorator that specifies a REST controller
// ------------------------------------------------------------------------------------------------

import {
    NextFunction,
    Request,
    Response,
    Router,
} from 'express';

import {
    assertArray,
    assertFunction,
    assertMin,
    assertNotNullOrUndefined,
    assertObject,
    assertStringNotEmpty,
    assertValidation,
    isNullOrUndefined,
    isUndefined,
    IValidationSchema,
} from '@emavok/ts-paranoia';

import { TApiMiddlewareFn } from '../common.types';
import { ApiForbiddenError } from '../errors/api-forbidden.error';

const S_REST_METADATA = Symbol.for('RestDecoratorMetadata');

// ------------------------------------------------------------------------------------------------
/** supported http methods */
// ------------------------------------------------------------------------------------------------
enum ERestMethod {
    GET = 'get',
    PUT = 'put',
    POST = 'post',
    DELETE = 'delete'
}

// ------------------------------------------------------------------------------------------------
/** metadata for rest method */
// ------------------------------------------------------------------------------------------------
interface IRestMethodMetadata {
    /** HTTP verb */
    method: ERestMethod;
    /** URI relative to controller URI */
    path: string;
    /** additional middleware functions */
    handler: TApiMiddlewareFn[];
}

// ------------------------------------------------------------------------------------------------
// Decorator for creating a REST controller
// ------------------------------------------------------------------------------------------------
export function controller(path: string): (target: any) => any {
    // overwrite contructor
    return (target: any): any => {
        // by returning a derived class
        return class extends target {
            constructor(...args: any[]) {
                // we must invoke super in derived classes
                super(...args);

                // add rest metadata info
                const that: any = this;
                that[S_REST_METADATA] = {
                    path: path
                };

                // ensure we have a router
                assertFunction(
                    this.getRouter,
                    'Class must extend Controller to be compatible with @controller decorator.'
                );

                // ensure we have a router object
                const router: Router = this.getRouter();
                assertNotNullOrUndefined(
                    router,
                    'Class must extend Controller to be compatible with @controller decorator.'
                );

                // debug - ensure we don't have controllers without methods
                let methodsAdded: number = 0;

                // loop over all properties in the target
                for (const propertyName of Object.keys(target.prototype)) {
                    // get the property descriptor
                    const descriptor = Object.getOwnPropertyDescriptor(target.prototype, propertyName);
                    if (isUndefined(descriptor)) {
                        continue;
                    }
                    // ensure we have a method here
                    const isMethod = descriptor.value instanceof Function;
                    if (!isMethod) {
                        continue;
                    }
                    // ensure we have REST metadata (i.e. it was decorated by a rest method decorator)
                    const info: IRestMethodMetadata = descriptor.value[S_REST_METADATA];
                    // if not a rest method handler
                    if (isUndefined(info)) {
                        continue;
                    }

                    // add rest method to router instance
                    router[info.method](path + info.path, ...info.handler, (req: Request, res: Response) => {
                        // invoke method and provide body, params and query
                        const result: any = descriptor.value.call( this,
                            req.body,
                            req.params,
                            req.query,
                            req
                        );
                        const statusCode: number = (info.method === ERestMethod.POST)
                            ? 201
                            : 200;
                        res.status(statusCode).json({
                            data: result
                        });
                    });

                    // increase number of methods in this controller
                    methodsAdded += 1;
                }
                // ensure we don't have a controller without methods
                assertMin(methodsAdded, 1, '@rest decorator used for class without decorated rest methods.');
            }
        };
    };
}

// ------------------------------------------------------------------------------------------------
/**
 * Decorator to register method as a GET endpoint
 * @param path URI relative to controller URI
 * @return Method decorator function
 */
// ------------------------------------------------------------------------------------------------
export function get( path: string ): any {
    // tslint:disable-next-line:only-arrow-functions
    return function( proto: any, key: string, descriptor: any): any {
        return addRestEndpoint( descriptor, ERestMethod.GET, path );
    };
}

// ------------------------------------------------------------------------------------------------
/**
 * Decorator to register method as a PUT endpoint
 * @param path URI relative to controller URI
 * @return Method decorator function
 */
// ------------------------------------------------------------------------------------------------
export function put( path: string ): any {
    // tslint:disable-next-line:only-arrow-functions
    return function( proto: any, key: string, descriptor: any): any {
        return addRestEndpoint( descriptor, ERestMethod.PUT, path );
    };
}

// ------------------------------------------------------------------------------------------------
/**
 * Decorator to register method as a POST endpoint
 * @param path URI relative to controller URI
 * @return Method decorator function
 */
// ------------------------------------------------------------------------------------------------
export function post( path: string ): any {
    // tslint:disable-next-line:only-arrow-functions
    return function( proto: any, key: string, descriptor: any): any {
        return addRestEndpoint( descriptor, ERestMethod.POST, path );
    };
}

// ------------------------------------------------------------------------------------------------
/**
 * Decorator to register method as a DELETE endpoint
 * @param path URI relative to controller URI
 * @return Method decorator function
 */
// ------------------------------------------------------------------------------------------------
export function remove( path: string ): any {
    // tslint:disable-next-line:only-arrow-functions
    return function( proto: any, key: string, descriptor: any): any {
        return addRestEndpoint( descriptor, ERestMethod.DELETE, path );
    };
}

// ------------------------------------------------------------------------------------------------
/**
 * Decorator to add a body json validation to a rest endpoint
 * @param schema Validation schema
 * @return Method decorator function
 */
// ------------------------------------------------------------------------------------------------
export function bodyValidation( schema: IValidationSchema ): any {
    assertObject(schema);
    // tslint:disable-next-line:only-arrow-functions
    return function( proto: any, key: string, descriptor: any): any {
        return addRestMiddleware( descriptor, (req: Request, res: Response, next: NextFunction) => {
            try {
                assertValidation(req.body, schema);
            } catch (err) {
                next(err);
            }
            next();
        });
    };
}

// ------------------------------------------------------------------------------------------------
/**
 * Decorator to secure a rest endpoint by role
 * @param role Target role that is required to access this method
 * @return Method decorator function
 */
// ------------------------------------------------------------------------------------------------
interface IExtendedRequest extends Request {
    user?: any;
    roles?: string[];
    permissions?: string[];
    groups?: any;
}

export function securedByRole( role: string ): any {
    assertStringNotEmpty(role);
    // tslint:disable-next-line:only-arrow-functions
    return function( proto: any, key: string, descriptor: any): any {
        return addRestMiddleware( descriptor, (req: IExtendedRequest, res: Response, next: NextFunction) => {
            try {
                assertArray(req.roles);
                const idx: number | undefined = req.roles?.findIndex((item: string) => (item === role));
                if (isUndefined(idx) || idx === -1) {
                    throw new ApiForbiddenError(req);
                }
            } catch (err) {
                next(err);
            }
            next();
        });
    };
}

// ------------------------------------------------------------------------------------------------
/**
 * Adds metadata for a rest endpoint to a method
 * @param descriptor Method property descriptor
 * @param method REST method verb
 * @param path Method URI relative to controller URI
 * @return Updated property descriptor
 */
// ------------------------------------------------------------------------------------------------
function addRestEndpoint( descriptor: any, method: ERestMethod, path: string ): any {
    // ensure we have a method
    assertFunction(
        descriptor.value,
        '@get decorator can only be used for methods within a @rest decorated controller class.'
    );
    // allow stacking of metadata - create metadata object not exists
    if (isNullOrUndefined(descriptor.value[S_REST_METADATA])) {
        descriptor.value[S_REST_METADATA] = {
            handler: []
        };
    }
    // add method and path
    descriptor.value[S_REST_METADATA].method = method;
    descriptor.value[S_REST_METADATA].path = path;
    return descriptor;
}

// ------------------------------------------------------------------------------------------------
/**
 * Adds metadata for a rest middleware to a method
 * @param descriptor Method property descriptor
 * @param handler Request handler
 * @return Updated property descriptor
 */
// ------------------------------------------------------------------------------------------------
function addRestMiddleware( descriptor: any, handler: TApiMiddlewareFn ): any {
    // ensure we have a method
    assertFunction(
        descriptor.value,
        '@get decorator can only be used for methods within a @rest decorated controller class.'
    );
    // allow stacking of metadata - create metadata object not exists
    if (isNullOrUndefined(descriptor.value[S_REST_METADATA])) {
        descriptor.value[S_REST_METADATA] = {
            handler: []
        };
    }
    // add handler
    descriptor.value[S_REST_METADATA].handler.push(handler);
    return descriptor;
}
