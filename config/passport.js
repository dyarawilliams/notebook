const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const User = require('../models/User')

module.exports = function (passport) {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
        // Get the user data
        const newUser = {
            googleId: profile.id,
            displayName: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            image: profile.photos[0].value
        }

        try {
            let user = await User.findOne({ googleId: profile.id })
            if(user) {
                // If user present in Database
                done(null, user)
            } else {
                // If user is not present in database save user to database
                user = await User.create(newUser)
                done(null, user)
            }
        } catch(err) {
            console.error(err)
        }
    }))

    // Persist user data (after successful authentication) into session
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    
    // Retrieve user data from session
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => { 
            done(err, user)
        })
    })
}