const express = require('express');
const passport = require('passport');

const router = express.Router();


router.get('/', (req, res) => {
  // 뭔가를 하겠지?
  res.send("todo");
});

router.get('/github', passport.authenticate("github", {
  failureRedirect: "/"
}))

router.get('/github/callback', 
    passport.authenticate('github', { failureRedirect: '/'}),
    (req, res) => {
        res.redirect('/');
    }
)

router.get('/logout', (req, res) => {
    req.logout();
    req.session.save(() => {
        res.redirect('/');
    });
})

module.exports = router;
