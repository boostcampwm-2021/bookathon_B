const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
        userId: Number,
        nickName: String,
        email: String,
        oauthToken : String,
});

module.exports = mongoose.model('User', userSchema);