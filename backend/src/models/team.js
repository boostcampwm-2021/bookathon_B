const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const teamSchema = new Schema({
        title: String,
        password: String,
        details: String,
        userIds: Array,
});

module.exports = mongoose.model('Team', teamSchema);