import { config } from "dotenv";

config();
const PORT = process.env.PORT || Number(4000);
const HOST = process.env.HOST || "localhost";

export default { PORT, HOST };