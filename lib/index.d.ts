import { Request, Response } from 'express';
import Joi from 'joi';
/**
 * Validate the `headers` of an request to an express router
 * - Make sure to not exclude headers that are not in the schema by adding `.unknwon(true)` to the `Joi.object()`
 * @param req Express request
 * @param res Express response
 * @param schema Joi schema for validating the content
 * @returns `any` or `null` depending weather the request headers
 */
export declare function validateHeaders(req: Request, res: Response, schema: Joi.Schema): any | null;
/**
 * Validate the `parameters` of an request to an express router
 * @param req Express request
 * @param res Express response
 * @param schema Joi schema for validating the content
 * @returns `any` or `null` depending weather the request parameters
 */
export declare function validateParams(req: Request, res: Response, schema: Joi.Schema): any;
/**
 * Validate the `query` of an request to an express router
 * @param req Express request
 * @param res Express response
 * @param schema Joi schema for validating the request query
 * @returns `any` or `null` depending weather the request
 */
export declare function validateQuery(req: Request, res: Response, schema: Joi.Schema): any;
/**
 * Validate the `body` of an request to an express router
 * @param req Express request
 * @param res Express response
 * @param schema Joi schema for validating the request
 * @returns `any` or `null` depending weather the request body
 */
export declare function validateBody(req: Request, res: Response, schema: Joi.Schema): any;
