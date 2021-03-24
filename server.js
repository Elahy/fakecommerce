//initializes
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const morgan = require('morgan');
const passport = require('passport');
const expressValidator = require('express-validator');
require('./auth/auth');
//port
const port = 8080;

//routes
const productRoute = require('./routes/product');
const homeRoute = require('./routes/home');
const cartRoute = require('./routes/cart');
const userRoute = require('./routes/user');
const categoryRoute = require('./routes/category');

//middleware
app.use(morgan('dev'));
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '250mb' }));
app.use(expressValidator());
app.use(passport.initialize());
//view engine
app.set('view engine', 'ejs');
app.set('views', 'views');
app.disable('view cache');

//routes middleware
app.use('/', homeRoute);
app.use('/products', productRoute);
app.use('/cart', cartRoute);
app.use('/my', userRoute);
app.use('/category', categoryRoute);
app.use('/files', express.static(path.join(__dirname, '/uploads')));
//mongoose
mongoose.set('useFindAndModify', false);
mongoose
	.connect('mongodb://localhost:27017/store-api', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then((result) => {
		app.listen(process.env.PORT || port, () => {
			console.log('connect');
		});
	})
	.catch((err) => {
		console.log(err);
	});

module.exports = app;
