export default class SanitizeError extends Error {
    constructor(errors) {
        super(`Erro ao sanitizar ${errors.length} campo(s).`);

        this.name = "SanitizeError";
        this.status = 400;
        this.errors = errors;
    }
}