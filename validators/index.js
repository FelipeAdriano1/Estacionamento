"use strict";

import { SIGN_STRING } from "./types/sign.js";
import string from './types/TypeString.js';

function isPlainObject(value) {
    return (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value) &&
        (Object.getPrototypeOf(value) === Object.prototype || Object.getPrototypeOf(value) === null)
    );
}

function createSchema(schema /*Schema de validação definido pelo usuário.*/) {
    const resultSchema = { success: true, errors: [] };
    const bodySchema = Object.entries(schema);

    //VALIDAÇÕES PARA FORMATO DO SCHEMA.
    if (!isPlainObject(schema)) return "Schema deve ser um objeto JS válido.";
    if (bodySchema.length === 0) return "Schema deve conter ao menos 1 validação.";
    bodySchema.forEach((rule) => {
        if (rule[1][SIGN_STRING] !== true || rule[1][SIGN_STRING] === undefined) {
            resultSchema.success = false;
            resultSchema.errors.push({
                code: `${rule[1]}`,
                message: "Função recebida não foi reconhecida.",
            })
        };

    });

    return {
        parse(body) {
            if (!isPlainObject(body)) {
                resultSchema.success = false,
                    resultSchema.errors.push({ typeError: "Schema tá todo errado." });

                return resultSchema;
            }

            Object.entries(schema).forEach((v) => {
                const value = body[v[0]];
                const validation = v[1].parse(value);
                console.log(validation);

                if (!validation) {
                    resultSchema.success = false,
                        resultSchema.errors.push({ typeError: "Propriedade com erro.", error: validation.errors });
                }
            })

            return resultSchema;
        }
    }

    //VALIDAÇÕES PARA TIPO DO CAMPO A SER VALIDADO.
}

const schema = createSchema(
    {
        name: string().min(6).max(10),
        phone: string().min(10).max(11)
    }
);

const test = {
    "name": 10,
    "phone": "19 9 8418-4217"
};

console.log("RESULTADO DO SCHEMA:", schema.parse(test));