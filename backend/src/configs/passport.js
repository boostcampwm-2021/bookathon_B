const passport = require('passport');
const GithubStrategy = require('passport-github');

    
const githubLoginCallback = async (accessToken, refreshToken, profile, done) => {
    const {
        _json: { 
            id 
        }
    } = profile;
    
    try {
        return done(null, id);  
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
