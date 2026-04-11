import { Router } from 'express';

import { assignID, User } from '../../types/UserType.js';
import validateBodyRegister from "../../middlewares/registerMiddleware.js";

const router = Router();

router.post('/login', validateBodyRegister, (req, res) => {
    res.status(200).send('Ok');
    //ESSA ROTA PODE VERIFICAR SE O USUÁRIO ESTÁ REGISTRADO OU NÃO.
    //SÓ PRA COMEÇAR, POSSO IMPLEMENTAR ESSA AUTENTICAÇÃO COM BEARER TOKEN.
    //AINDA IREI IMPLEMENTAR A LÓGICA.
});