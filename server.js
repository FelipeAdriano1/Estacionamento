import express, { Router } from 'express';
import env from './dotenv.js';

import userRoute from './routes/users/userRoute.js'

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", userRoute);
app.use((error, req, res, next) => {
    if (error instanceof SyntaxError && error.status === 400 && 'body' in error) return res.status(400).send({ message: "JSON mal formatado." });
})

app.listen(env.PORT, (error) => {
    if (error) console.log(error);
    console.log(`Servidor Express rodando na porta ${env.PORT}`);
});