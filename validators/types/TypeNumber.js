import { SIGN_NUMBER } from "./sign.js";
import { SIGN_RULE_NUMBER } from "./sign.js";

function number() {
    const rules = [isNumber()]; //ALTA PERSISTÊNCIA EM MEMÓRIA: EXISTE DESDE O MOMENTO DA CHAMADA DE STRING ATÉ SEU RETORNO NO parse().
    let lock = false;
    return {
        use(rule) {
            if (lock) throw new Error("Não é possível adicionar regras após parse()"); //POSSO PENSAR EM PADRONIZAR ESSE ERRO ATRAVÉS DE UMA CLASSE DE ERRO PERSONALIZADO.
            if (typeof rule === 'function' && rule[SIGN_RULE_NUMBER] && rule[SIGN_RULE_NUMBER]?.type === 'number') rules.push(rule);
            return this;
        },
        parse(value) {
            lock = true;
            const errors = [];

            for (const fn of rules) {
                const res = fn(value);
                if (res !== true) {
                    errors.push(res);
                    if (res.code === 'number.format') {
                        break;
                    }
                }
            }

            return {
                success: errors.length === 0,
                errors
            };
        },
        [SIGN_NUMBER]: true
    }
}

function finite() {
    const fnIsFinite = (v) => Number.isFinite(v) ? true
        :
        {
            ok: false,
            code: 'number.finite',
            message: 'Número deve ser finito.',
            data: { received: v }
        };

    fnIsFinite[SIGN_RULE_NUMBER] = {
        type: 'number',
        name: 'finite'
    };

    return fnIsFinite;
}

function isNumber() {
    const fnIsNumber = (value) => typeof value === 'number' ? true
        :
        {
            ok: false,
            code: 'number.format',
            message: "Valor não é number.",
            data: {
                expected: `[object Number]`,
                received: `${Object.prototype.toString.call(value)}`
            }
        }

    fnIsNumber[SIGN_RULE_NUMBER] = {
        type: 'number',
        name: 'isNumber'
    }

    return fnIsNumber;
}

function int() {
    const fnIsInt = (v) => Number.isInteger(v) ? true
        :
        {
            ok: false,
            code: 'number.int',
            message: 'Número deve ser inteiro.',
            data: {
                expected: 'Integer',
                received: v
            }
        };

    fnIsInt[SIGN_RULE_NUMBER] = {
        type: 'number',
        name: 'isInt'
    };

    return fnIsInt;
}

function positive() {
    const fnIsPositive = (v) => v > 0 ? true
        :
        {
            ok: false,
            code: 'number.positive',
            message: 'Número deve ser positivo.',
            data: {
                expected: 'Number > 0',
                received: v
            }
        };

    fnIsPositive[SIGN_RULE_NUMBER] = {
        type: 'number',
        name: 'isPositive'
    };

    return fnIsPositive;
}

function negative() {
    const fnIsNegative = (v) => v < 0 ? true
        :
        {
            ok: false,
            code: 'number.negative',
            message: 'Número deve ser negativo.',
            data: {
                expected: 'Number < 0',
                received: v
            }
        };

    fnIsNegative[SIGN_RULE_NUMBER] = {
        type: 'number',
        name: 'isNegative'
    };
    return fnIsNegative;
}

function between(min, max) {
    const fnIsBetween = (v) => (v >= min && v <= max) ? true
        :
        {
            ok: false,
            code: 'number.between',
            message: 'Número fora do intervalo permitido.',
            data: { min, max, received: v }
        };

    fnIsBetween[SIGN_RULE_NUMBER] = {
        type: 'number',
        name: 'isBetween'
    };

    return fnIsBetween;
}

function multipleOf(n) {
    const fnIsMultiple = (v) => v % n === 0 ? true
        :
        {
            ok: false,
            code: 'number.multiple',
            message: `Número deve ser múltiplo de ${n}.`,
            data: { received: v }
        };

    fnIsMultiple[SIGN_RULE_NUMBER] = {
        type: 'number',
        name: 'isMultipleOf'
    };

    return fnIsMultiple;
}



export { number, int, positive, negative, between, multipleOf, finite };