# joi-express
Simple utility-package for express projects that use Joi for validation.
## Examples

## Validating parameters
```typescript
// GET http://localhost:3000/example/cat
app.get('/example/:param', async (req, res) => {
    const schema = Joi.object({
        param: Joi.string().required().max(64),
    });

    const { param } = validateParams(req, res, schema);
    if(!param) return;

    /* Do stuff with the param */
});
```

## Validating query
```typescript
// GET http://localhost:3000/example?test=cat
app.get('/example', async (req, res) => {
    const schema = Joi.object({
        query: Joi.string().required().max(64),
    });

    const { query } = validateQuery(req, res, schema);
    if(!query) return;

    /* Do stuff with the query */
});
```

## Validating body
```typescript
// POST http://localhost:3000/example?test=cat
app.post('/example', async (req, res) => {
    const schema = Joi.object({
        field: Joi.string().required().max(64),
    });

    const { field } = validateBody(req, res, schema);
    if(!field) return;

    /* Do stuff with the field */
});
```

## Validating headers
```typescript
// GET http://localhost:3000/example
app.post('/example', async (req, res) => {
    const schema = Joi.object({
        token: Joi.string().required().length(24)
    }).unknown(true); // Make sure to allow other headers

    const { token } = validateHeaders(req, res, schema);
    if(!token) return;

    /* Do stuff with the token */
});
```