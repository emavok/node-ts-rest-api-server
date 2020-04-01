#!/usr/bin/env node
// ------------------------------------------------------------------------------------------------
// Main entry point
// ------------------------------------------------------------------------------------------------

import program from 'commander';

import fs from 'fs';

import { validate } from './validate';

// create a pseudo logger instance
const logger: any = {
    error: (msg: string, data?: any): void => {
        if (data !== undefined) {
            // tslint:disable-next-line:no-console
            console.error(msg, data);
        }
        // tslint:disable-next-line:no-console
        console.error(msg);
    },
    info: (msg: string, data?: any): void => {
        if (data !== undefined) {
            // tslint:disable-next-line:no-console
            console.log(msg, data);
        }
        // tslint:disable-next-line:no-console
        console.log(msg);
    }
};

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
    .requiredOption('-s, --schema <schema-json-file>', 'Validation schema json file')
    .requiredOption('-d, --data <data-json-file>', 'Data json file')
    .option('-c, --context <validation-context>', 'Optional validation context (if provided by schema)')
    .parse(process.argv);

// ------------------------------------------------------------------------------------------------
// perform validation

try {
    // load schema json
    logger.info('Loading \'' + program.schema + '\'...');
    const schemaJsonStr: string = fs.readFileSync(program.schema, { encoding: 'utf-8' });
    const schema: any = JSON.parse( schemaJsonStr );
    logger.info('Schema: ', JSON.stringify( schema, null, 2 ));

    // load data json
    logger.info('Loading \'' + program.data + '\'...');
    const dataJsonStr: string = fs.readFileSync(program.data, { encoding: 'utf-8' });
    const data: any = JSON.parse( dataJsonStr );
    logger.info('Data: ', JSON.stringify( data, null, 2 ));

    const err: any = validate( schema, data);
    if (err === null) {
        logger.info('Validation OK');
    } else {
        logger.info('Validation failed.');
        logger.info(JSON.stringify(err, null, 2));
    }
} catch (err) {
    logger.error(err);
}

// eof
