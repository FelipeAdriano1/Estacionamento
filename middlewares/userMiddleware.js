import validateSchema from '../validators/index.js';

export default function userMiddleware(req, res, next) {
    console.log(req.headers);
    if (Object.entries(req.headers).length === 0) res.status(400).send({ message: "Body mal formatado." });

    const errors = validateSchema({
        "content-type": [
            (value) => value !== 'application/json' ? "Só aceitamos JSON" : null
        ],
        "host": [
            (value) => value !== 'localhost:4000' ? "Só aceitamos localhost" : null
        ],
        "user-agent": [
            (value) => !value.includes("PostmanRuntime") ? "Só Postman" : null
        ],
        "authorization": [
            (value) => !/^\d{3}[a-zA-Z]{2}$/.test(value) ? "Autorização tá errada, chefe" : null
        ]
    },
        req.headers
    );

    console.log(errors);
    if (errors.success === false) res.status(400).send(errors);
    else next();
}

//Content-type
//Host
//User-Agent
//Authorization: sequência de 5 caracateres com 3 números e 2 letras.