const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
        nickName: String,
        email: String,
        teamIds: Array,
        githubId : String,
        accessToken: String
});

module.exports = mongoose.model('User', userSchema);