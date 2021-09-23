const passport = require('passport');
const GithubStrategy = require('passport-github');
const User = require('../models/user.js');

    
const githubLoginCallback = async (accessToken, refreshToken, profile, done) => {
    const {
        login: githubId
    } = profile._json;
    
        
    try {
        let user = await User.findOne({ githubId }).exec();
        
        
        if (!user) {
            user = await User.create({
                githubId,
                accessToken
            });
        }
        else if (user.accessToken !== accessToken) {
            user.accessToken = accessToken;
            await user.save()
        }
        
        return done(null, user);
    }
    catch(error){
        return done(error);
    }
}

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user);
    })
    
    passport.deserializeUser((user, done) => {
        done(null, user);
    })
    
    
    passport.use(new GithubStrategy({
        clientID: process.env.GITHUB_CI,
        clientSecret: process.env.GITHUB_CS,
        callbackURL: `/auth/github/callback`,
    },
        githubLoginCallback
    ));
}
