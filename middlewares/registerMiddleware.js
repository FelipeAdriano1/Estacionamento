import SanitizeError from '../errors/errorClasses/SanitizeError.js';

//SANITIZAÇÃO
//CASOS
/*
{
    CASO 1: body | rules = undefined;
    CASO 2: body | rules = {};
    RESULTADO: Em ambos os casos irei imediatamente retornar um objeto com detalhes do erro.
}
*/
function sanitize(body, rules) {
    const result = { success: true, errors: [] };
    if (!body || Object.prototype.toString.call(body) !== '[object Object]' || Object.keys(body).length === 0) {
        result.success = false;
        result.errors.push({
            code: "body.format",
            field: 'object body',
            message: "body inválido",
        });

        return result;
    }

    if (!rules || Object.prototype.toString.call(rules) !== '[object Object]' || Object.keys(rules).length === 0) {
        result.success = false;
        result.errors.push({
            code: "rules.format",
            field: 'object rules',
            message: "rules inválido",
        });

        return result;
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
    const resultSanitize = sanitize(req.body, {});
    if (!resultSanitize.success) throw new SanitizeError(resultSanitize.errors);
    next();
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

