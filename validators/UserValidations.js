import validateSchema from './index.js';

export default function validateBodyUser(req, res, next) {

    const body = Object.entries(req.body);
    if (body.length === 0) return res.status(400).send({ message: "Body deve estar presente." });

    const validate = validateSchema(
        //schema
        {
            name: [
                (value) => typeof value !== 'string' ? "Nome deve ser definido" : null,
                (value) => typeof value !== 'string' ? 'Nome deve ser string.' : null,
                (value) => value.length < 3 ? "Nome deve conter 3 caracteres." : null
            ],
            phone: [
                (value) => typeof value !== 'string' ? "Telefone deve ser string" : null,
                (value) => !/^\d{2}\s9\s\d{4}-\d{4}$/.test(value) ? "Número incorreto" : null
            ]
        },
        //body
        req.body
    )

    if (validate.success === false) res.status(400).send(validate);
    else next();
}