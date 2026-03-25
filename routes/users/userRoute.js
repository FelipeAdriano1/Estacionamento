import { Router } from "express";
import userMiddleware from '../../middlewares/userMiddleware.js';
import validateBodyUser from "../../validators/userValidator.js";

const router = Router();

router.post('/register', userMiddleware, validateBodyUser, (req, res) => {
    res.send('Ok');
});

export default router;