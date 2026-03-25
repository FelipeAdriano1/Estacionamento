import validateSchema from './index.js';

export default function validateBodyUser(req, res, next) {

    console.log(req.body);
    const body = Object.entries(req.body);
    if (body.length === 0) return res.status(400).send({message: "Body deve estar presente."});

    const validate = validateSchema(
        //schema
        {
            name: [
                (value) => typeof value === 'undefined' ? "Nome deve ser definido" : null,
                (value) => typeof value !== 'string' ? 'Nome deve ser string.' : null,
                (value) => value.length < 3 ? "Nome deve conter 3 caracteres." : null
            ],
            age: [
                (value) => typeof value !== "number" ? "Idade deve ser um número" : null,
                (value) => value < 10 || value > 100 ? "Idade não pode ser menor que 10 e maior que 100." : null
            ],
            phone: [
                (value) => value.replace(/\D/g, '').length < 10 ? "Telefone deve conter 10 caracteres válidos." : null,
                (value) => value.replace(/\D/g, '').length > 11 ? "Telefone deve conter apenas 10 caracteres válidos." : null
            ]
        },
        //body
        req.body
    )

    if (validate.success === false) res.status(400).send(validate);
    else next();
}