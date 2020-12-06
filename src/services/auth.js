const passport = require('passport');
const jsonwebtoken = require('jsonwebtoken');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

module.exports = ({ db, config }) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    // Temp to avoid errors as no auth is setup yet
    if (!db.User) return done(null, null);
    db.User.findOne({ where: { id: id } }).then((err, user) => {
      done(err, user);
    });
  });

  passport.use(
    new LocalStrategy({ usernameField: 'email' }, function(
      email,
      password,
      done,
    ) {
      db.User.findOne({ where: { email: email } }).then((err, user) => {
        if (err) {
          return done(err);
        }
        if (user && bcrypt.compareSync(password, user.password)) {
          return done(null, user);
        }
        return done(null, false, { message: 'Incorrect username/password' });
      });
    }),
  );

  /**
   * @author Dharmpal Chaudhary
   * @description verifies the JWT token
   */
  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.appKey,
      },
      (jwtPayload, done) => {
        //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
        return done(null, jwtPayload);
      },
    ),
  );

  const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    return res.status(403);
  };

  const isGuest = (req, res, next) => {
    if (!req.isAuthenticated()) return next();
    return res.status(403);
  };

  /**
   * @author Amlan Mallik <amlan.mallik@techjini.com>
   * @description generates a token for the user based on user id or the refresh token it it still is valid
   * @returns { object } returns the generated token and refresh token.
   */
  const generateToken = (userPayload, existingRefreshToken = null) => {
    const privateKey = config.appKey;
    if (existingRefreshToken != null) {
      userPayload = jsonwebtoken.verify(existingRefreshToken, privateKey);
    }
    const token = jsonwebtoken.sign(userPayload, privateKey, {
      expiresIn: '3h',
    });
    const refreshToken = jsonwebtoken.sign(userPayload, privateKey, {
      expiresIn: '24h',
    });
    return { token, refreshToken };
  };

  return {
    passport,
    isAuthenticated,
    isGuest,
    generateToken,
  };
};
