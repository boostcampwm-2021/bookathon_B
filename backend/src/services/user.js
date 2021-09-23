const User = require('../models/user.js');


const updateUser = async ({ githubId }, { email, nickName }) => {
    const result = await User.updateOne({ githubId }, { email, nickName }).exec();
    
    return result.modifiedCount;
}

module.exports = {
    updateUser
};