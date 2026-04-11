import { Router } from "express";

const router = Router();

router.get('/uid:id', (req, res) => {
    res.send("Tudo certo");
    //AINDA IREI IMPLEMENTAR A LÓGICA.
})

export default router;