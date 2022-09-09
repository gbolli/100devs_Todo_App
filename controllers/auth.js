const passport = require('passport')
const User = require('../models/User')

module.exports = {
    getLogin: (req, res) => {
        if (req.user) {
            return res.redirect('/todos')
        }
        res.render('login')
    },
    postLogin: (req, res, next) => {
        console.log('postLogin function')
        passport.authenticate('local', (err, user, info) => {
            console.log('running passport authenticate')
            if (err) { return next(err) }
            if (!user) {
              return res.redirect('/login')
            }
            req.logIn(user, (err) => {
              if (err) { return next(err) }
              res.redirect(req.session.returnTo || '/todos')
            })
        })
    },
    logout: (req, res) => {
        req.logout(() => {
            console.log('User has logged out.')
            res.redirect('/')
        })
    },
    getSignup: (req, res) => {
        if (req.user) {
            return res.redirect('/todos')
        }
        res.render('signup')
    },
    postSignup: (req, res) => {
        const user = new User({
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password
        })
        User.findOne({$or: [
            {email: req.body.email},
            {userName: req.body.userName}
            ]}, (err, existingUser) => {
                if (err) { return next(err) }
                if (existingUser) {
                return res.redirect('../signup')
            }
            user.save((err) => {
                if (err) { return next(err) }
                req.logIn(user, (err) => {
                    if (err) {
                    return next(err)
                    }
                    res.redirect('/todos')
                })
            })
        })
    }
}


