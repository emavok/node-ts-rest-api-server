// ------------------------------------------------------------------------------------------------
// Schema definitions for API dtos
// ------------------------------------------------------------------------------------------------

import * as Joi from '@hapi/joi';

// ------------------------------------------------------------------------------------------------

import { ValidationUtils } from '../../base/utils/validation.utils';

import {
    IApiFilterCriterion,
    IApiPaginationCriterion,
    IApiSortCriterion,
} from '../types/api.types';

// ------------------------------------------------------------------------------------------------
/** Utility class to create Config Validation Schemata */
// ------------------------------------------------------------------------------------------------
export class ApiSchema {
    // --------------------------------------------------------------------------------------------
    /**
     * Validates an api filter criteria dto
     * @param value DTO to validate
     * @param throwError Optional. Whether or not to throw an exception on validation error. Defaults to false.
     * @return Validation result
     */
    // --------------------------------------------------------------------------------------------
    public static validateApiFilterCriteria(
        value: IApiFilterCriterion[],
        throwOnError?: boolean,
    ): Joi.ValidationResult {
        const schema: Joi.ArraySchema = ApiSchema.createIApiFilterCriterionArraySchema();
        return ValidationUtils.validate( schema, value, throwOnError );
    }

    // --------------------------------------------------------------------------------------------
    /**
     * Validates an api sort criteria dto
     * @param value DTO to validate
     * @param throwError Optional. Whether or not to throw an exception on validation error. Defaults to false.
     * @return Validation result
     */
    // --------------------------------------------------------------------------------------------
    public static validateApiSortCriteria( value: IApiSortCriterion[], throwOnError?: boolean ): Joi.ValidationResult {
        const schema: Joi.ArraySchema = ApiSchema.createIApiSortCriterionArraySchema();
        return ValidationUtils.validate( schema, value, throwOnError );
    }

    // --------------------------------------------------------------------------------------------
    /**
     * Validates an api pagination criteria dto
     * @param value DTO to validate
     * @param throwError Optional. Whether or not to throw an exception on validation error. Defaults to false.
     * @return Validation result
     */
    // --------------------------------------------------------------------------------------------
    public static validateApiPaginationCriteria(
        value: IApiPaginationCriterion[],
        throwOnError?: boolean,
    ): Joi.ValidationResult {
        const schema: Joi.ObjectSchema = ApiSchema.createIApiPaginationCriterionSchema();
        return ValidationUtils.validate( schema, value, throwOnError );
    }

    // --------------------------------------------------------------------------------------------
    /** Creates a validation schema for EApiFilterOperator */
    // --------------------------------------------------------------------------------------------
    private static createEApiFilterOperatorSchema(): Joi.StringSchema {
        const schema: Joi.StringSchema = Joi
            .string()
            .required()
            .valid(
                '=',
                '!=',
                '>',
                '>=',
                '<',
                '<=',
                '~',
                '!~',
                '~~',
                '!~~',
                '0',
                '!0',
                '[]',
                '![]',
            );
        return schema;
    }

    // --------------------------------------------------------------------------------------------
    /** Creates a validation schema for EApiSortDirection */
    // --------------------------------------------------------------------------------------------
    private static createEApiSortDirectionSchema(): Joi.StringSchema {
        const schema: Joi.StringSchema = Joi
            .string()
            .required()
            .valid(
                'ASC',
                'DESC',
            );
        return schema;
    }

    // --------------------------------------------------------------------------------------------
    /** Creates a validation schema for IApiFilterCriterion */
    // --------------------------------------------------------------------------------------------
    private static createIApiFilterCriterionSchema(): Joi.ObjectSchema {
        const schema: Joi.ObjectSchema = Joi.object({
            a: Joi.string().required().min(1),
            o: ApiSchema.createEApiFilterOperatorSchema,
            v: Joi.any(),
        });
        return schema;
    }

    // --------------------------------------------------------------------------------------------
    /** Creates a validation schema for IApiFilterCriterion */
    // --------------------------------------------------------------------------------------------
    private static createIApiFilterCriterionArraySchema(): Joi.ArraySchema {
        const schema: Joi.ArraySchema = Joi
            .array()
            .items(ApiSchema.createIApiFilterCriterionSchema());
        return schema;
    }
    // --------------------------------------------------------------------------------------------
    /** Creates a validation schema for IApiSortCriterion */
    // --------------------------------------------------------------------------------------------
    private static createIApiSortCriterionSchema(): Joi.ObjectSchema {
        const schema: Joi.ObjectSchema = Joi.object({
            a: Joi.string().required().min(1),
            d: ApiSchema.createEApiSortDirectionSchema(),
        });
        return schema;
    }

    // --------------------------------------------------------------------------------------------
    /** Creates a validation schema for IApiSortCriterion */
    // --------------------------------------------------------------------------------------------
    private static createIApiSortCriterionArraySchema(): Joi.ArraySchema {
        const schema: Joi.ArraySchema = Joi
            .array()
            .items(ApiSchema.createIApiSortCriterionSchema());
        return schema;
    }

    // --------------------------------------------------------------------------------------------
    /** Creates a validation schema for IApiPaginationCriterion */
    // --------------------------------------------------------------------------------------------
    private static createIApiPaginationCriterionSchema(): Joi.ObjectSchema {
        const schema: Joi.ObjectSchema = Joi.object({
            l: Joi.number().min(0).required(),
            o: Joi.number().min(0).required(),
        });
        return schema;
    }
}
