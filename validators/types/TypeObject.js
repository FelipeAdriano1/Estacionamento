import { SIGN_OBJECT } from "./sign.js";
import { SIGN_RULE_OBJECT } from "./sign.js";

function object() {
    const rules = [isObject()]; //ALTA PERSISTÊNCIA EM MEMÓRIA: EXISTE DESDE O MOMENTO DA CHAMADA DE STRING ATÉ SEU RETORNO NO parse().
    let lock = false;
    return {
        use(rule) {
            if (lock) throw new Error("Não é possível adicionar regras após parse()"); //POSSO PENSAR EM PADRONIZAR ESSE ERRO ATRAVÉS DE UMA CLASSE DE ERRO PERSONALIZADO.
            if (typeof rule === 'function' && rule[SIGN_RULE_OBJECT] && rule[SIGN_RULE_OBJECT]?.type === 'object') rules.push(rule);
            return this;
        },
        parse(value) {
            lock = true;
            const errors = [];

            for (const fn of rules) {
                const res = fn(value);
                if (res !== true) {
                    errors.push(res);
                    if (res.code === 'object.format') {
                        break;
                    }
                }
            }

            return {
                success: errors.length === 0,
                errors
            };
        },
        [SIGN_OBJECT]: true
    }
}

function isObject() {
    const fnIsObject = (value) => Object.prototype.toString.call(value) === '[object Object]' ? true
        :
        {
            ok: false,
            code: 'object.format',
            message: "Valor não é object.",
            data: {
                expected: `[object Object]`,
                received: `${Object.prototype.toString.call(value)}`
            }
        }

    fnIsObject[SIGN_RULE_OBJECT] = {
        type: 'object',
        name: 'isObject'
    }

    return fnIsObject;
}

function required(keys = []) {
    const fnRequiredKeys = (obj) => {
        const missing = keys.filter(k => !(k in obj));

        return missing.length === 0 ? true
            :
            {
                ok: false,
                code: 'object.required',
                message: 'Chaves obrigatórias ausentes.',
                data: { missing }
            };
    };

    fnRequiredKeys[SIGN_RULE_OBJECT] = {
        type: 'object',
        name: 'isRequired'
    };

    return fnRequiredKeys;
}

function strict(allowedKeys = []) {
    const fnStrict = (obj) => {
        const extra = Object.keys(obj).filter(k => !allowedKeys.includes(k));

        return extra.length === 0 ? true
            :
            {
                ok: false,
                code: 'object.strict',
                message: 'Objeto contém chaves não permitidas.',
                data: { extra }
            };
    };

    fnStrict[SIGN_RULE_OBJECT] = {
        type: 'object',
        name: 'isStrict'
    };

    return fnStrict;
}

function shape(schema) {
    const fnShape = (obj) => {
        const errors = [];

        for (const key in schema) {
            const validator = schema[key];
            const res = validator.parse(obj[key]);

            if (!res.success) {
                errors.push({ key, errors: res.errors });
            }
        }

        return errors.length === 0 ? true
            :
            {
                ok: false,
                code: 'object.shape',
                message: 'Objeto não corresponde ao schema.',
                data: { errors }
            };
    };

    fnShape[SIGN_RULE_OBJECT] = {
        type: 'object',
        name: 'isShape'
    };

    return fnShape;
}

export { object, required, strict, shape };