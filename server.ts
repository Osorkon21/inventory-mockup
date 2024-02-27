// imports
const express = require('express');
const routes = require("./routes");
const db = require('./config/connection.js');

// set up express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3001;

// direct traffic along these routes
app.use(routes);

// once db is opened up, express starts listening
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server listening on port ${PORT}!`);
  });
});

const path = require('path');
const db = require('./config/connection');
const cors = require('cors'); // added because of fetch in Client

const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); // ADDED FOR - CORS



app.use(routes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, "..", 'client/dist')));

  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "..", 'client/dist/index.html'))
  })
}

db.once('open', () => {
  app.listen(PORT, () => console.log(`Now listening on localhost: ${PORT}`));
});
