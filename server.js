import express from 'express';
import env from './dotenv.js';

import userRoute from './routes/users/userRoute.js';
import captureSyntaxError from './errors/SyntaxError.js';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", userRoute);
app.use(captureSyntaxError);

app.listen(env.PORT, (error) => {
    if (error) console.log(error);
    console.log(`Servidor Express rodando na porta ${env.PORT}`);
});