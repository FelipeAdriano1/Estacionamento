export default function validateSchema(schema, body) {
    const errors = {};

    for (const key in schema) {
        const rules = schema[key];
        const value = body[key];

        for (const rule of rules) {
            const error = rule(value);
            if (error) {
                if (!errors[key]) errors[key] = [];
                errors[key].push(error);
            }
        }
    }

    return {
        success: Object.keys(errors).length === 0, errors
    };
}