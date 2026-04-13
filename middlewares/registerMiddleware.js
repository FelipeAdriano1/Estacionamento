import SanitizeError from '../errors/errorClasses/SanitizeError.js';

//SANITIZAÇÃO
//CASOS
/*
{
    CASO 1: body | rules = undefined;
    CASO 2: body | rules = {};
    RESULTADO: Em ambos os casos irei imediatamente retornar um objeto com detalhes do erro.

    CASO 3: { key: value, key :{ key: value } } SANITIZAÇÃO EM PROFUNDIDADE.
        CASO 3.1: { name: "string", phone: "string", age: "number", address: {number: "number"} }; type = { number: "number" }; bodyValue = { number: 84 };
        PARA VALIDAÇÃO EM PROFUNDIDADE, 'type' E 'bodyValue' PRECISAM SER OBJETO.

}
*/
function sanitize(body, rules) {
    const result = { success: true, errors: [] };
    const isObj = (obj) => { return Object.prototype.toString.call(obj) === '[object Object]' };
    const hasKeys = (obj) => { return Object.keys(obj).length > 0 };
    const getType = (v) => { return Object.prototype.toString.call(v) }

    if (!isObj(body) || !hasKeys(body)) {
        result.success = false;
        result.errors.push({
            code: "body.format",
            field: 'body',
            message: "body ausente ou vazio.",
            expected: "object",
            received: body
        });

        return result;
    }
    if (!isObj(rules) || !hasKeys(rules)) {
        result.success = false;
        result.errors.push({
            code: "rules.format",
            field: 'rules',
            message: "rules ausente ou vazio.",
            expected: "object",
            received: rules
        });

        return result;
    }

    for (const [key, type] of Object.entries(rules)) {
        const bodyValue = body[key];

        if (isObj(type)) {
            if (!isObj(bodyValue)) {
                result.success = false,
                    result.errors.push({
                        code: `${key}.format`,
                        field: key,
                        message: "Esperado um objeto.",
                        expected: "object",
                        received: typeof bodyValue
                    });
                continue;
            }

            const nested = sanitize(bodyValue, type);
            if (!nested.success) {
                result.success = false,
                    nested.errors.forEach((err) => {
                        result.errors.push({
                            ...err,
                            field: `${key}.${err.field}`
                        })
                    })
            }
            continue;
        };

        if (typeof bodyValue !== type) {
            result.success = false;
            result.errors.push({
                code: `${key}.format`,
                field: key,
                message: "Tipo do campo é diferente.",
                expected: type,
                received: typeof bodyValue
            });
        }
    }

    return result;
}

//CASOS
/* 
{
    CASO 1: req.body | rules = undefined;
    CASO 2: req.body | rules = {};
}
*/
export default function sanitizeBodyUser(req, res, next) { //VERIFICAR TIPO DO VALOR E TRATAR FORMATO GERAL.
    const resultSanitize = sanitize(req.body, { name: "string", phone: "string", age: "number", address: { number: "number" } });
    console.log("[RESULT SANITIZE]:", resultSanitize);
    if (!resultSanitize.success) throw new SanitizeError(resultSanitize.errors);
    else next();
}


//NORMALIZAÇÃO
//CASOS
/*
CASO 1:
    {
        " name": "Felipe", --> ELIMINAR ESPAÇOS SOMENTE NO VALOR.
        " phone ": "19 9 9999-9999" --> ELIMINAR ESPAÇOS NO VALOR, BEM COMO .replace('-', '').
    }
*/
//CASO A CHAVE CONTER ESPAÇOS, OU ESTIVER DIFERENTE DO ESPERADO, IREI RETORNAR ERRO 400.
function normalize(body, rules) {
    const result = {};
    const errors = [];

    for (const key in body) {
        if (!rules[key]) {
            errors.push({
                code: `${key}.unknown`,
                message: "Chave não permitida"
            });
        }
    }

    for (let [key, fn] of Object.entries(rules)) {
        result[key] = fn(body[key]);
    }

    return { result, errors };
}

//VALIDAÇÃO

