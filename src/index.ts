import express, { Request, Response } from 'express';
import Joi from 'joi';

/**
 * Validate the `headers` of an request to an express router
 * - Make sure to not exclude headers that are not in the schema by adding `.unknwon(true)` to the `Joi.object()`
 * @param req Express request
 * @param res Express response
 * @param schema Joi schema for validating the content
 * @returns `any` or `null` depending weather the request headers
 */
export function validateHeaders(req: Request, res: Response, schema: Joi.Schema) : any | null {
    const result = schema.validate(req.headers);

    if (result.error) {
        res.status(400).send({ err: result.error.details[0].message, status: 400 });
        return null;
    }

    return result.value;
}

/**
 * Validate the `parameters` of an request to an express router
 * @param req Express request
 * @param res Express response
 * @param schema Joi schema for validating the content
 * @returns `any` or `null` depending weather the request parameters
 */
export function validateParams(req: Request, res: Response, schema: Joi.Schema) {
    const result = schema.validate(req.params);

    if (result.error) {
        res.status(400).send({ err: result.error.details[0].message, status: 400 });
        return null;
    }

    return result.value;
}

/**
 * Validate the `query` of an request to an express router
 * @param req Express request
 * @param res Express response
 * @param schema Joi schema for validating the request query
 * @returns `any` or `null` depending weather the request 
 */
export function validateQuery(req: Request, res: Response, schema: Joi.Schema) {
    const result = schema.validate(req.query);

    if (result.error) {
        res.status(400).send({ err: result.error.details[0].message, status: 400 });
        return null;
    }

    return result.value;
}

/**
 * Validate the `body` of an request to an express router
 * @param req Express request
 * @param res Express response
 * @param schema Joi schema for validating the request
 * @returns `any` or `null` depending weather the request body
 */
export function validateBody(req: Request, res: Response, schema: Joi.Schema) {
    const result = schema.validate(req.body);

    if (result.error) {
        res.status(400).send({ err: result.error.details[0].message, status: 400 });
        return null;
    }

    return result.value;
}

const app = express();

app.post('/example', async (req, res) => {
    const schema = Joi.object({
        token: Joi.string().required().length(24)
    }).unknown(true); // Make sure to allow other headers

    const { token } = validateHeaders(req, res, schema);
    if(!token) return;

    /* Do stuff with the field */
});