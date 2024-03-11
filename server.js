import 'dotenv/config.js'
import express from 'express';
import routes from "./routes/index.js";
import db from './config/connection.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3001;

app.use(express.static("public"));

app.use(routes);

app.get("*", (_, res) => res.sendFile(path.join(__dirname, "public/index.html")));

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}!`);
  });
});
