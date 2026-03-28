import express from 'express';
import env from './dotenv.js';

import rotasUsuario from './routes/users/userRoutes.js';
import middlewareUsuario from './middlewares/userMiddleware.js';

import capturarSyntaxError from './errors/captureSyntaxError.js';
import capturarError from './errors/captureGenerateIDError.js';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", middlewareUsuario, rotasUsuario);
app.use(capturarSyntaxError);
app.use(capturarError);

app.listen(env.PORT, (error) => {
    if (error) console.log(error);
    console.log(`Servidor Express rodando na porta ${env.PORT}`);
});