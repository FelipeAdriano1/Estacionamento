export default class GenerateIDError extends Error {
    constructor(message = "Erro ao gerar ID") {
        super(message);
        this.name = "GenerateIDError";
        this.status = 500;
    }
}