const express = require('express');
// const crypto = require('crypto');
require('dotenv').config(); //to get the data of .env
const cors = require('cors');
const session = require('express-session');


const app = express()
var passport = require('passport');
const bodyParser = require('body-parser');



// const jwtSecret = crypto.randomBytes(64).toString('hex');
// console.log('Generated JWT Secret:', jwtSecret);


//middleware
const corsOptions = {
  origin : 'http://localhost:3001',
  credentials: true, // Allow credentials (cookies)
} 



app.use(cors(corsOptions));
app.use(express.json());



const PORT = process.env.PORT || 3000;



// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(
  session({
    secret: process.env.LOGIN_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true, // Prevent client-side access to cookies
      secure: false,  // Use `true` in production (requires HTTPS)
      sameSite: 'none', // Allow cookies for cross-origin requests
      maxAge: 86400000, // Session expires in 1 day
      path: '/',      
    },
  })
);

//passport for authentication
app.use(passport.initialize());
app.use(passport.session());


const authRoutes = require('./myapp/routes/authentication');
const migrationRoutes = require('./myapp/routes/migration');
const protectedRoutes = require('./myapp/routes/pages');

// Route files
// To run the migration (up to create and down to remove all databases)
app.use('/migrate', migrationRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/v1', protectedRoutes);
// app.use('/test/auth', userRoutes)


app.get('/', (req, res) => {
  res.send('testing World is again tested!');
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


