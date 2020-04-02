// ------------------------------------------------------------------------------------------------
// Schema definitions for REST API server config
// ------------------------------------------------------------------------------------------------

import * as Joi from '@hapi/joi';

// ------------------------------------------------------------------------------------------------

import { ValidationUtils } from '../../base/utils/validation.utils';

import { IRestApiServerConfig } from '../types/server-config.types';

// ------------------------------------------------------------------------------------------------
/** Utility class to create REST API server config validation schemata */
// ------------------------------------------------------------------------------------------------
export class RestApiServerConfigSchema {
    // --------------------------------------------------------------------------------------------
    /**
     * Validates the rest api server config
     * @param value DTO to validate
     * @param throwError Optional. Whether or not to throw an exception on validation error. Defaults to false.
     * @return Validation result
     */
    // --------------------------------------------------------------------------------------------
    public static validateRestApiServerConfig(
        value: IRestApiServerConfig,
        throwOnError?: boolean,
    ): Joi.ValidationResult {
        const schema: Joi.ObjectSchema = RestApiServerConfigSchema.createIRestApiServerConfigSchema();
        return ValidationUtils.validate( schema, value, throwOnError );
    }

    // --------------------------------------------------------------------------------------------
    /** Creates a validation schema for IRestApiServerConfig */
    // --------------------------------------------------------------------------------------------
    public static createIRestApiServerConfigSchema(): Joi.ObjectSchema {
        const schema: Joi.ObjectSchema = Joi.object({
            port: Joi.number().min(0).required(),
        });
        return schema;
    }
}
