const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const teamSchema = new Schema({
        teamId: Number,
        title: String,
        password: String,
        userIds: Array,
});

module.exports = mongoose.model('Team', teamSchema);