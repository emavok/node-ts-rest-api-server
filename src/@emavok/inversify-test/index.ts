import 'reflect-metadata';

import {
    APP_CONTAINER
} from './bootstrap';

import {
    DI_APPLICATION,
    IApplication,
} from './base/app/app.types';

const app: IApplication = APP_CONTAINER.get<IApplication>(DI_APPLICATION);

app.start();
