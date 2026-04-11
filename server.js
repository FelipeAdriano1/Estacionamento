import express from 'express';
import { PORT } from './dotenv.js';

import signupRoute from './routes/users/signup.js';

import captureSyntaxError from './errors/captureSyntaxError.js';
import captureGenerateIDError from './errors/captureGenerateIDError.js';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/users", signupRoute);
app.use("api/vehicles", () => { });

app.use(captureSyntaxError);
app.use(captureGenerateIDError);
//MÉTODOS DE CAPTURA ESTÃO REGISTRADOS GLOBALMENTE EM app.use;
//NÃO SERIA MAIS RECOMENDÁVEL REGISTRA-LOS EM router.use?

app.listen(PORT, '0.0.0.0', (error) => {
    if (error) console.log(error);
    console.log(`Servidor Express rodando na porta ${PORT}`);
});