const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const userRoutes = require('./routes/users');
const quizRoutes = require('./routes/quizzes');
const passportConfig = require('./passport/passport');
const passport = require('passport')
require('dotenv').config();
const cookieSession = require('cookie-session')
const BigPromise = require('./middleware/bigPromise')

const app = express();
const PORT = process.env.PORT || 9000;
let server;

// passport middleware google auth
app.use(cookieSession({
    maxAge: 3 * 24 * 60 * 60 * 1000,
    keys: ['thisislcotokenkey'] //dotenv
}))

app.use(passport.initialize());
app.use(passport.session())


// middlware config

app.use(cors({
    origin: '*',
    credentials: true
}));
app.use(bodyParser.urlencoded({ extended: true, limit: '20mb' }));
app.use(bodyParser.json({ limit: '20mb' }));

app.use('/api/users/', userRoutes);
app.use('/api/quizzes/', quizRoutes);

mongoose.connect(process.env.DB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
}).then(() => console.log('Database connection established'))
    .catch(er => console.log('Error connecting to mongodb instance: ', er));

server = app.listen(PORT, () => {
    console.log(`Node server running on port: ${PORT}`);
});
