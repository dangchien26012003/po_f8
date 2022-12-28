const express = require('express'); // /node_modules
const path = require('path');

// console.log req client
const morgan = require('morgan');

// thư viện kế thừa của express
const handlebars = require('express-handlebars');

// kết nối db
const db = require('./config/db');

// thư viện method form
var methodOverride = require('method-override');

// connect db
db.connect();
const app = express();
const port = 3000;

const mongoose = require('mongoose');

const route = require('./routes');

app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

app.use(methodOverride('_method'));

// http logger
// app.use(morgan('combined'));

// template engine

app.engine('hbs', handlebars.engine());

app.set('view engine', 'hbs');

//set đường dẫn đến views
app.set('views', path.join(__dirname, 'resources', 'views'));

// routes init
route(app);

app.listen(port, () => {
    console.log(`App listening at localhost${port}`);
});
