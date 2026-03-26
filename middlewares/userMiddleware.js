import validateSchema from '../validators/index.js';

export default function userMiddleware(req, res, next) {
    if (Object.entries(req.headers).length === 0) res.status(400).send({ message: "Body ausente." });

    const errors = validateSchema({
        "content-type": [
            (value) => typeof value !== 'string' ? "content-type deve ser string." : null,
            (value) => value !== 'application/json' ? "Só aceitamos JSON" : null
        ],
        "host": [
            (value) => typeof value !== 'string' ? "Host ausente ou mal formatado." : null,
            (value) => value !== 'localhost:4000' ? "Só aceitamos localhost" : null
        ],
        "user-agent": [
            (value) => typeof value !== "string" ? "User-Agent ausente ou mal formatado." : null,
            (value) => !value.includes("PostmanRuntime") ? "Só Postman" : null
        ],
        "authorization": [
            (value) => typeof value !== "string" ? "Authorization ausente ou mal formatado." : null,
            (value) => !/^\d{3}[a-zA-Z]{2}$/.test(value) ? "Autorização tá errada" : null
        ]
    },
        req.headers
    );

    if (errors.success === false) res.status(400).send(errors);
    else next();
}

//Content-type
//Host
//User-Agent
//Authorization: sequência de 5 caracateres com 3 números e 2 letras.