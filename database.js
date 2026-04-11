import { MongoClient } from "mongodb";
import { URI_ESTACIONAMENTO } from './dotenv.js';

async function getStarted() {
    const client = new MongoClient(URI_ESTACIONAMENTO);

    try {
        await client.connect();

        const db = client.db('sis-estacionamento');
        const collection = db.collection('users');

        const user = await collection.findOne({ name: "Felipe" });

        console.log("USER:", user);
    } catch (err) {
        console.error("Erro:", err);
    } finally {
        await client.close(); // <-- também importante
    }
}

getStarted();