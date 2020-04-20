// ------------------------------------------------------------------------------------------------
// Decorator that specifies a REST controller
// ------------------------------------------------------------------------------------------------

import {
    Request,
    Response,
    Router,
} from 'express';

import {
    assertFunction,
    assertMin,
    assertNotNullOrUndefined,
    isNullOrUndefined,
    isUndefined,
} from '@emavok/ts-paranoia';

import { TApiMiddlewareFn } from '../common.types';

enum ERestMethod {
    GET = 'get',
    PUT = 'put',
    POST = 'post',
    DELETE = 'delete'
}

interface IRestMethod {
    method: ERestMethod;
    path: string;
    handler: TApiMiddlewareFn[];
}

// export function rest<T extends new (...args: any[]) => any>(target: T) {
export function restController(path: string): (target: any) => any {
    return (target: any): any => {
        return class extends target {
            constructor(...args: any[]) {
                super(...args);

                // add __rest info
                this.__rest = {
                    path: path
                };

                assertFunction(
                    this.getRouter,
                    'Class must extend Controller to with compatible with @restController decorator.'
                );

                const router: Router = this.getRouter();
                assertNotNullOrUndefined(
                    router,
                    'Class must extend Controller to with compatible with @restController decorator.'
                );

                let methodsAdded: number = 0;

                // loop over all properties in the target
                for (const propertyName of Object.keys(target.prototype)) {
                    // get the property descriptor
                    const descriptor = Object.getOwnPropertyDescriptor(target.prototype, propertyName);
                    if (isUndefined(descriptor)) {
                        continue;
                    }
                    // extract some information
                    const isMethod = descriptor.value instanceof Function;
                    const info: IRestMethod = descriptor.value.__rest as IRestMethod;
                    // if not a rest method handler
                    if (!isMethod || isUndefined(info)) {
                        continue;
                    }

                    // add all registered methods to router instance
                    router[info.method](path + info.path, ...info.handler, (req: Request, res: Response) => {
                        try {
                            // invoke method
                            const result: any = descriptor.value.apply(this,
                                req.body,
                                req.params,
                                req.query
                            );
                            const statusCode: number = (info.method === ERestMethod.POST)
                                ? 201
                                : 200;
                            res.status(statusCode).json(result);
                        } catch (err) {
                            res.status(500).json(err);
                        }
                    });
                    methodsAdded += 1;
                }
                assertMin(methodsAdded, 1, '@rest decorator used for class without decorated rest methods.');
            }
        };
    };
}

function decorateRestMethod( descriptor: any, method: ERestMethod, path: string ) {
    assertFunction(
        descriptor.value,
        '@get decorator can only be used for methods within a @rest decorated controller class.'
    );
    if (isNullOrUndefined(descriptor.value.__rest)) {
        descriptor.value.__rest = {
            handler: []
        };
    }
    descriptor.value.__rest.method = ERestMethod.GET;
    descriptor.value.__rest.path = path;
    return descriptor;
}

export function get( path: string ): any {
    // tslint:disable-next-line:only-arrow-functions
    return function( proto: any, key: string, descriptor: any): any {
        decorateRestMethod( descriptor, ERestMethod.GET, path );
    };
}

export function restPut( path: string ): any {
    // tslint:disable-next-line:only-arrow-functions
    return function( proto: any, key: string, descriptor: any): any {
        decorateRestMethod( descriptor, ERestMethod.PUT, path );
    };
}

export function restPost( path: string ): any {
    // tslint:disable-next-line:only-arrow-functions
    return function( proto: any, key: string, descriptor: any): any {
        decorateRestMethod( descriptor, ERestMethod.POST, path );
    };
}

export function restDelete( path: string ): any {
    // tslint:disable-next-line:only-arrow-functions
    return function( proto: any, key: string, descriptor: any): any {
        decorateRestMethod( descriptor, ERestMethod.DELETE, path );
    };
}
