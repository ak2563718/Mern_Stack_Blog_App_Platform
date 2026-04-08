import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { UserData } from '../models/userModel.js';
import dotenv from 'dotenv';
dotenv.config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'https://mern-stack-blog-app-platform.onrender.com/api/google/callback',
},
async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails[0].value;

    // 🔍 check user by email OR googleId
    let user = await UserData.findOne({
      $or: [
        { googleId: profile.id },
        { email: email }
      ]
    });

    if (user) {
      // 🧠 CASE 1: User exists but no Google linked
      if (!user.googleId) {
        user.googleId = profile.id;
        user.authProvider = "google";
        await user.save();
      }

      // 🧠 CASE 2: Already linked → just login
      return done(null, user);
    }

    // 🧠 CASE 3: Completely new user
    user = await UserData.create({
      name: profile.displayName,
      email,
      role: "user",
      googleId: profile.id,
      authProvider: "google",
    });

    return done(null, user);

  } catch (err) {
    return done(err, null);
  }
})); 

export default passport;