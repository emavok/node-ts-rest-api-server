#!/usr/bin/env node
// ------------------------------------------------------------------------------------------------
// Main entry point
// ------------------------------------------------------------------------------------------------

import program from 'commander';

import fs from 'fs';

import { Server } from './app/server';

import {
    ILogger,
    Logger,
} from '@emavok/node-ts-logger';

// ------------------------------------------------------------------------------------------------
// setup global logging and error handling
const logger: ILogger = Logger.getGlobal();

// ------------------------------------------------------------------------------------------------
// setup error handler to catch unhandled exceptions and unhandle rejections
process
    .on('unhandledRejection', (reason, p) => {
        logger.error(`Unhandled Rejection at Promise. Reason: ${reason}`, { promise: p, reason: reason });
    })
    .on('uncaughtException', (err) => {
        logger.error('Uncaught Exception thrown.', { error: err });
        process.exit(1);
    });

// ------------------------------------------------------------------------------------------------
// load command line arguments
program
    .option('-c, --config-file <path-to-config-file>', 'Configuration file', './config/serverConfig.json')
    .parse(process.argv);

// ------------------------------------------------------------------------------------------------
// load config
const configStr: string = fs.readFileSync(program.configFile, 'utf-8');
const config: any = JSON.parse(configStr);

// start server
const server: Server = new Server();
server.start(config);

// eof
