import GenerateIDError from "./GenerateIDError.js";

export default function captureGenerateIDError(err, req, res, next) {
    console.log(err instanceof GenerateIDError);
    const isErrorID = err instanceof GenerateIDError && err.name === 'GenerateIDError';
    console.log("Erro:", err.message);

    if (isErrorID) {
        return res.status(500).json({ message: "Erro no Backend." });
    }

    return next(err);
}