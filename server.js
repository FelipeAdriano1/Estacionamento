import express from 'express';
import env from './dotenv.js';

import userRoutes from './routes/users/userRoutes.js';

import captureSyntaxError from './errors/captureSyntaxError.js';
import captureGenerateIDError from './errors/captureGenerateIDError.js';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/users", userRoutes);

app.use(captureSyntaxError);
app.use(captureGenerateIDError);
//MÉTODOS DE CAPTURA ESTÃO REGISTRADOS GLOBALMENTE EM app.use;
//NÃO SERIA MAIS RECOMENDÁVEL REGISTRA-LOS EM router.use?

app.listen(env.PORT, '0.0.0.0', (error) => {
    if (error) console.log(error);
    console.log(`Servidor Express rodando na porta ${env.PORT}`);
}); 