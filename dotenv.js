import { config } from "dotenv";

config();
const PORT = process.env.PORT || Number(4000);
const HOST = process.env.HOST || "localhost";
const URI_ESTACIONAMENTO = process.env.URI_ESTACIONAMENTO || "none";

export { PORT, HOST, URI_ESTACIONAMENTO };