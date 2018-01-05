const express = require('express');
const Router = new express.Router();
const app = express();

const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const GETRoutes = require('./routes/get.js')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config.json');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Session
let connectionOptions = {
  host: "localhost",
  port: 3306,
  user: 'root',
  password: '',
  database: 'dashcord'
}
let sessionStore = new MySQLStore(connectionOptions)
app.use(session({
    secret: config.dash_secret,
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));

// Get routes
app.use('/', GETRoutes);

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
