const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const pool = require('./database_connection');  // Assume this is your MySQL connection
const passport = require('passport');

passport.use( new LocalStrategy(
  { usernameField: 'email' },  // Default is 'username', customize to 'email' if needed
  async (email, password, done) => {
  
    try {
      // Find the user by email
      const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
      console.log(email);
      if (rows.length === 0) {
        return done(null, false, { message: 'Incorrect email/ password.' });
      }

      const user = rows[0];

      // Compare the password using bcrypt
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: 'Incorrect email or password.' });
      }

      // If authentication is successful
      return done(null, user);

    } catch (err) {
      return done(err);
    }
  }
));

// Serialize and deserialize the user to maintain session
passport.serializeUser((user, done) => {
  done(null, user.id);  // or user.id
});

passport.deserializeUser(async (id, done) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    if (rows.length > 0) {
      done(null, rows[0]);  // Pass the user object
    } else {
      done(new Error('User not found'));
    }
  } catch (err) {
    done(err);
  }
});

module.exports = passport;