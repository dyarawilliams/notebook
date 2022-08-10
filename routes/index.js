const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')

// @desc Login/Landing page
// @route GET /
router.get('/', ensureGuest, (req, res) => { 
    res.render('login', {
        layout: 'login',
    })
})

// @desc Dashboard
// @route GET /dashboard
router.get('/dashboard', ensureAuth, async (req, res) => { 
    try {
        console.log(req.user.id)
        res.render('dashboard', {userInfo: req.user})
        
    } catch (error) {
        console.error(err)
    }
})

module.exports = router