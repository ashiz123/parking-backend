const express = require('express')
const cors = require('cors');
const session = require('express-session');

const app = express()
var passport = require('passport');
const bodyParser = require('body-parser');

const PORT = 3000
// const userRoutes = require('./myapp/routes/auth');
const authRoutes = require('./myapp/routes/authentication');
const migrationRoutes = require('./myapp/routes/migration');
const protectedRoutes = require('./myapp/routes/pages');


//middleware
app.use(cors());
app.use(express.json());


// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Express session to store authentication 
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false,
}));

//passport for authentication
app.use(passport.initialize());
app.use(passport.session());

// Route files
// To run the migration (up to create and down to remove all databases)
app.use('/migrate', migrationRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/v1', protectedRoutes);
// app.use('/test/auth', userRoutes)


app.get('/', (req, res) => {
  res.send('testing World is again tested!')
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


