import { SIGN_STRING } from "./sign.js";
import { SIGN_RULE_STRING } from "./sign.js";

function string() {
    const rules = [isString()]; //ALTA PERSISTÊNCIA EM MEMÓRIA: EXISTE DESDE O MOMENTO DA CHAMADA DE STRING ATÉ SEU RETORNO NO parse().
    let lock = false;
    return {
        use(rule) {
            if (lock) throw new Error("Não é possível adicionar regras após parse()"); //POSSO PENSAR EM PADRONIZAR ESSE ERRO ATRAVÉS DE UMA CLASSE DE ERRO PERSONALIZADO.
            if (typeof rule === 'function' && rule[SIGN_RULE_STRING] && rule[SIGN_RULE_STRING]?.type === 'string') rules.push(rule);
            return this;
        },
        parse(value) {
            lock = true;
            const errors = [];

            for (const fn of rules) {
                const res = fn(value);
                if (res !== true) {
                    errors.push(res);
                    if (res.code === 'string.format') {
                        break;
                    }
                }
            }

            return {
                success: errors.length === 0,
                errors
            };
        },
        [SIGN_STRING]: true
    }
}

function isString() {
    const fnIsString = (value) => typeof value === 'string' ? true
        :
        {
            ok: false,
            code: 'string.format',
            message: "Valor não é string.",
            data: {
                expected: `[object String]`,
                received: `${Object.prototype.toString.call(value)}`
            }
        }

    fnIsString[SIGN_RULE_STRING] = {
        type: 'string',
        name: 'isString'
    }

    return fnIsString;
}

function min(value) {
    const fnMin = (v) => v.length >= value ? true
        :
        {
            ok: false,
            code: 'string.min',
            message: "Tamanho da string não atinge mínimo permitido",
            data: {
                expected: `${value} caracteres.`,
                received: `${v.length} caracteres.`
            }
        }

    fnMin[SIGN_RULE_STRING] = {
        type: 'string',
        name: 'min'
    }

    return fnMin;
}

function max(value) {
    const fnMax = (v) => v.length <= value ? true
        :
        {
            ok: false,
            code: 'string.max',
            message: "Tamanho da string excede máximo permitido",
            data: {
                expected: `${value} caracteres.`,
                received: `${v.length} caracteres.`
            }
        }

    fnMax[SIGN_RULE_STRING] = {
        type: 'string',
        name: 'max'
    }

    return fnMax;
}

function regex(rgx, options = {}) {
    const regex = new RegExp(rgx);

    const fnRegex = (v) => regex.test(v)
        ? true
        : {
            ok: false,
            code: 'string.regex',
            message: options.message || "String não segue formato esperado.",
            data: {
                expected: options.expected || String(rgx),
                received: v
            }
        };

    fnRegex[SIGN_RULE_STRING] = {
        type: 'string',
        name: 'regex'
    }

    return fnRegex;
}

//PROBLEMA: SE A FUNÇÃO NÃO POSSUIR SIGN_RULE_STRING, O parse() NÃO EXECUTA ESSA FUNÇÃO.
//O USUÁRIO REGISTRA UMA FUNÇÃO E ESPERA QUE SUA VALIDAÇÃO SEJA APLICADA AO CAMPO DO JSON,
//MAS ISSO NÃO ACONTECE SE A FUNÇÃO NÃO FOR RECONHECIDA.

export { string, min, max, regex };