//SANITIZAÇÃO

//CASOS
/*
CASO 1:
    {
        name: "Felipe", --> DEVE SER STRING;
        phone: "19 9 9999-9999" --> DEVE SER STRING;
    }
*/

export default function sanitizeBodyUser(req, res, next) { //VERIFICAR TIPO DO VALOR E TRATAR FORMATO GERAL.
    const resultSanitize = sanitize(req.body, {
        name: (v) => typeof v === 'string' ? v.trim() : '',
        phone: (v) => typeof v === 'string' ? v.trim() : ''
    });
    const resultNormalize = normalize(resultSanitize.data, {
        phone: (v) => v.replace(/\D/g, '')
    });

    console.log(resultNormalize);

    next();
}

function sanitize(body, rules) {
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
        const value = body[key];

        try {
            result[key] = fn(value);
        } catch {
            errors.push({
                code: `${key}.sanitize`,
                message: "Erro ao sanitizar valor",
                data: { received: value }
            });
        }
    }

    return { data: result, errors };
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

    return {result, errors};
}

//VALIDAÇÃO

