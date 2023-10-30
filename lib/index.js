"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBody = exports.validateQuery = exports.validateParams = exports.validateHeaders = void 0;
const express_1 = __importDefault(require("express"));
const joi_1 = __importDefault(require("joi"));
/**
 * Validate the `headers` of an request to an express router
 * - Make sure to not exclude headers that are not in the schema by adding `.unknwon(true)` to the `Joi.object()`
 * @param req Express request
 * @param res Express response
 * @param schema Joi schema for validating the content
 * @returns `any` or `null` depending weather the request headers
 */
function validateHeaders(req, res, schema) {
    const result = schema.validate(req.headers);
    if (result.error) {
        res.status(400).send({ err: result.error.details[0].message, status: 400 });
        return null;
    }
    return result.value;
}
exports.validateHeaders = validateHeaders;
/**
 * Validate the `parameters` of an request to an express router
 * @param req Express request
 * @param res Express response
 * @param schema Joi schema for validating the content
 * @returns `any` or `null` depending weather the request parameters
 */
function validateParams(req, res, schema) {
    const result = schema.validate(req.params);
    if (result.error) {
        res.status(400).send({ err: result.error.details[0].message, status: 400 });
        return null;
    }
    return result.value;
}
exports.validateParams = validateParams;
/**
 * Validate the `query` of an request to an express router
 * @param req Express request
 * @param res Express response
 * @param schema Joi schema for validating the request query
 * @returns `any` or `null` depending weather the request
 */
function validateQuery(req, res, schema) {
    const result = schema.validate(req.query);
    if (result.error) {
        res.status(400).send({ err: result.error.details[0].message, status: 400 });
        return null;
    }
    return result.value;
}
exports.validateQuery = validateQuery;
/**
 * Validate the `body` of an request to an express router
 * @param req Express request
 * @param res Express response
 * @param schema Joi schema for validating the request
 * @returns `any` or `null` depending weather the request body
 */
function validateBody(req, res, schema) {
    if (!req.body) {
        res.status(500).send({ err: "Request doesn't seem to have a body - are you sure you are using express's body parser?", status: 500 });
        return null;
    }
    const result = schema.validate(req.body);
    if (result.error) {
        res.status(400).send({ err: result.error.details[0].message, status: 400 });
        return null;
    }
    return result.value;
}
exports.validateBody = validateBody;
const app = (0, express_1.default)();
app.post('/example', async (req, res) => {
    const schema = joi_1.default.object({
        token: joi_1.default.string().required().length(24)
    }).unknown(true); // Make sure to allow other headers
    const { token } = validateHeaders(req, res, schema);
    if (!token)
        return;
    /* Do stuff with the field */
});
