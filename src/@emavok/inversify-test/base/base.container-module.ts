// ------------------------------------------------------------------------------------------------
// Base container module
// ------------------------------------------------------------------------------------------------

import {
    ContainerModule,
    interfaces,
} from 'inversify';

import {
    DI_LOGGER_SERVICE,
    ILoggerService,
} from './logger/logger.types';

import { LoggerService } from './logger/logger.service';

import {
    DI_APPLICATION,
    IApplication,
} from './app/app.types';

import { Application } from './app/app.service';

export const BASE_CONTAINER_MODULE = new ContainerModule(
    (
        bind: interfaces.Bind,
        unbind: interfaces.Unbind,
        isBound: interfaces.IsBound,
        rebind: interfaces.Rebind
    ) => {
        bind<ILoggerService>(DI_LOGGER_SERVICE).to(LoggerService);
        bind<IApplication>(DI_APPLICATION).to(Application);
    }
);
