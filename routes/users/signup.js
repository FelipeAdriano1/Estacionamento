import { Router } from "express";

import sanitizeBodyUser from "../../middlewares/registerMiddleware.js";

const router = Router();
const devices = {
    "192.168.7.187": "Requisição de: celular",
    "127.0.0.1": "Requisição do: Postman",
    "192.168.7.113": "Requisição do: notebook"
};

router.post('/signup', sanitizeBodyUser, (req, res) => {
    console.log(devices[req.ip] || "Outros");

    //SALVAR NO BANCO: OUTRO ARQUIVO; DENTRO DA PASTA /models.

    res.send('Ok');
    //FORMULÁRIO PEDE UMA SENHA E UM EMAIL.
    //ESSA ROTA PODE VERIFICAR SE O USUÁRIO ESTÁ REGISTRADO OU NÃO.
    //SÓ PRA COMEÇAR, POSSO IMPLEMENTAR ESSA AUTENTICAÇÃO COM BEARER TOKEN.
    //QUANDO DIGO BEARER TOKEN, DIGO 2 TIPOS; 1 PARA CONFIANÇA SERVIDOR <-> FRONT;
    //OUTRO PARA SESSÃO DE USUÁRIO.
    //AINDA IREI IMPLEMENTAR A LÓGICA.
});

export default router;