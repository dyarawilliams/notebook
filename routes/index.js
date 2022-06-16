const express = require('express')
const router = express.Router()
// const { ensureAuth, ensureGuest } = require('../middleware/auth')

// @desc Login/Landing page
// @route GET /
router.get('/', (req, res) => { // add ensureGuest as second param
    res.render('login', {
        layout: 'login'
    })
})

// @desc Dashboard
// @route GET /dashboard
router.get('/dashboard', (req, res) => { // add ensureAuth as second param
    res.render('dashboard')
})

module.exports = router