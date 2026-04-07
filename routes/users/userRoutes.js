import { Router } from "express";

import { assignID, User } from '../../types/UserType.js';

const router = Router();

router.post('/register', (req, res) => {
    console.log('CHEGOU');
    res.send('Ok');
    //AINDA IREI IMPLEMENTAR A LÓGICA.
});

router.get('/uid:id', (req, res) => {
    res.send("Tudo certo");
    //AINDA IREI IMPLEMENTAR A LÓGICA.
})

router.post('/update:id', (req, res) => {
    //AINDA VOU IMPLEMENTAR A LÓGICA.
})

router.get('/delete:id', (req, res) => {
    //AINDA IREI IMPLEMENTAR A LÓGICA.
})

export default router;