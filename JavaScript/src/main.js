const express = require('express');
const Router = new express.Router();
const app = express();

const GETRoutes = require('./routes/get.js')

// GET routes
app.use('/', GETRoutes);

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
