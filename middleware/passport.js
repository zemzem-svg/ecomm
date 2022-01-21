// const passport = require("passport");
// const User = require("../models/User");
// const JwtStrategy = require("passport-jwt").Strategy;
// const ExtractJwt = require("passport-jwt").ExtractJwt;

// const opts = {
// };
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(),
// opts.secretOrkey = process.env.SecretOrkey,
// console.log(opts)
// passport.use(
//     new JwtStrategy(opts, async (jwt_payload, done) => {
//         try {
//             const user = await User.findOne({ _id: jwt_payload._id }).select("-password");
        
//             user ? done(null, user) : done(null, false);
//         } catch (error) {
//             console.log(error)
//         }
//     }
//     ));

// module.exports = isAuth = () =>
//     passport.authenticate("jwt", { session: false });

const User = require("../models/User");
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SecretOrkey;

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findOne({ _id: jwt_payload._id }).select(
        "-password"
      );
      user ? done(null, user) : done(null, false);
    } catch (error) {
      console.log(error);
    }
  })
);

module.exports = isAuth = () =>
  passport.authenticate("jwt", { session: false });