import { SIGN_STRING } from "./sign.js";

export default function string() {
    const rules = [];

    return {
        min(value) {
            const fnMin = v => v.length >= value ?
                { ok: true }
                :
                {
                    code: "string.min",
                    message: `Tamanho da String não atinge mínimo definido.`,
                    data: {
                        min: value,
                        received: v.length
                    }
                };

            rules.push(fnMin);
            return this;
        },

        max(value) {
            const fnMax = v => v.length <= value ?
                { ok: true }
                :
                {
                    code: "string.max",
                    message: `Tamanho da String excede parâmetros definidos.`,
                    data: {
                        max: value,
                        received: v.length
                    }
                };

            rules.push(fnMax);
            return this;
        },
        parse(value) {
            const result = { success: true, errors: [] };
            if (typeof value !== 'string') {
                result.success = false,
                result.errors.push({
                    code: "string.format",
                    message: `Valor não é uma string.`,
                    data: {
                        format: "String",
                        received: `${typeof value}`
                    }
                });
                return result;
            }

            rules.forEach((val) => {
                let helper = val(value);
                if (helper.ok === false) result.errors.push(helper), result.success = false;
            });
            return result;
        },
        [SIGN_STRING]: true
    }
}