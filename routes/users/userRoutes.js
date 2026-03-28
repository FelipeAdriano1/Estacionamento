import { Router } from "express";
import validateBodyUser from "../../validators/UserValidations.js";

import { assignID, User } from '../../types/UserType.js';

const router = Router();

router.post('/register', validateBodyUser, (req, res) => {
    res.send('Ok');
});

router.post('/user:id', validateBodyUser, (req, res) => {
    const test = User();
    assignID(test);

    res.send("Tudo certo");
})

export default router;