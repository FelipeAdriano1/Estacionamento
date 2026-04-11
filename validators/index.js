import { SIGN_NUMBER, SIGN_OBJECT, SIGN_STRING } from "./types/sign.js";

function isPlainObject(value) {
    return (
        typeof value === "object" && value !== null && Object.prototype.toString.call(value) === '[object Object]'
    );
}

function isTypeFunction(value) {
    return (
        typeof value === 'object' &&
        value !== null &&
        Object.getPrototypeOf(value) === Object.prototype &&
        value[SIGN_STRING] === true || value[SIGN_NUMBER] === true || value[SIGN_OBJECT] === true
    )
}

export default function createSchema(schema) {
    if (!isPlainObject(schema)) return {
        code: 'schema.format',
        message: 'Schema deve ser um objeto JS válido.',
        data: {
            expected: '[object Object]',
            received: `${Object.prototype.toString.call(schema)}`
        }
        //OU throw new Error();
    };

    for (const [key, validator] of Object.entries(schema)) {
        if (!isTypeFunction(validator)) {
            return {
                code: "schema.invalid_type",
                message: `Validador inválido na chave "${key}".`,
                data: {
                    expected: "TypeFunction válida",
                    received: typeof validator
                }
            };
        }
    }

    return {
        parse(body) {
            const result = [];
            const isBodyValid = isPlainObject(body);

            if (!isBodyValid) {
                return [{
                    success: false,
                    error: {
                        code: "body.format",
                        message: "Body deve ser um objeto JS válido.",
                        data: {
                            expected: "[object Object]",
                            received: Object.prototype.toString.call(body)
                        }
                    }
                }];
            }

            for (const [key, validator] of Object.entries(schema)) {
                const value = body[key];

                // chave ausente (corrige bug do falsy: "", 0, false)
                if (!(key in body)) {
                    result.push({
                        field: key,
                        success: false,
                        error: {
                            code: `key.${key}`,
                            message: "Chave ausente no body para validação.",
                            data: {
                                expected: key,
                                received: "undefined"
                            }
                        }
                    });
                    continue;
                }

                const parsed = validator.parse(value);

                result.push({
                    field: key,
                    ...parsed
                });
            }

            return result;
        }
    };
}