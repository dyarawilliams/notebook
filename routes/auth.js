const express = require('express')
const passport = require('passport')
const router = express.Router()

// @desc Auth with Google
// @route GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

// @desc Google Auth Callback
// @route GET /auth/google/callback
router.get('/google/callback', 
    passport.authenticate('google', { 
        failureRedirect: '/' 
    }),
    (req, res) => {
        // Successful authentication, redirect to dashboard.
        console.log('Successful authentication redirect to dashboard')
        res.redirect('/dashboard')
    }
)

module.exports = router