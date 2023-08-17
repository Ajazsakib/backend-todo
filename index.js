const express = require('express');

const app = express();

const port = 8001;

const path = require('path');

const db = require('./config/mongoose');

const cookieParser = require('cookie-parser');

// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

const MongoDBStore = require('connect-mongodb-session')(session);

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// set the assets
app.use(express.static('./assets'));

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Specify the directory where your views are located
app.set('views', path.join(__dirname, 'views')); // Import 'path' module if needed

// make the upload path available to the browser
app.use('/uploads', express.static(__dirname + '/uploads'));

// mongo store is used to store the session cookie in the db

const store = new MongoDBStore({
  uri: 'mongodb://localhost:27017/your-session-db', // Replace with your MongoDB URI
  collection: 'sessions',
});

store.on('error', (error) => {
  console.error('MongoDB session store error:', error);
});

app.use(
  session({
    name: 'TODO-APP',
    // Todo change  the secret before deployment
    secret: 'mylittlesecret',
    saveUninitialized: false,

    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100 * 24,
    },
    store: store,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// use express router
app.use('/', require('./routes/'));

app.listen(port, function (err) {
  if (err) {
    console.log('Error in running the server', err);
    return;
  }

  console.log(`Server is running on port ${port}`);
});
