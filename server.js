import express from 'express';
import routes from "./routes";
import db from './config/connection';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3001;

app.use(express.static("public"));

app.use(routes);

app.get("*", (req, res) => res.sendFile('index.html'));

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}!`);
  });
});
