const axios = require('axios');
const User = require('../models/user.js');

const parseDay = (inputDate) => {
    const year = inputDate.getFullYear();
    const month = (inputDate.getMonth() + 1).toString().padStart(2, "0");
    const date = inputDate.getDate().toString().padStart(2, "0");
    const day = `${year}-${month}-${date}`;
    
    return day;
}

const getCommitCounts = async (githubId) => {
    const user = await User.findOne({ githubId }).exec();
    
    if (!user) {
        throw new Error("회원가입되지 않은 사용자입니다.");
    }
    
    const repoInfos = await axios.get(`https://api.github.com/user/repos`,{
        headers: {
            Authorization: `token ${user.accessToken}`
        }
    });
    
    const repos = repoInfos.data.map(ele => ele.name);
    repos.forEach(ele => console.log(ele));
    
    const commitInfos = await Promise.all(
        repos.map(repo => {
            return axios.get(`https://api.github.com/repos/${githubId}/${repo}/commits`,{
                headers: {
                    Authorization: `token ${user.accessToken}`
                }
            });
        })
    );
    
    const commits = {};
    const today = new Date();
    
    new Array(30).fill(0)
    .forEach((_, index) => {
        const target = new Date(today);
        
        target.setDate(target.getDate() - 29 + index);
        
        const day = parseDay(target);
        
        commits[day] = 0;
    })
    
    commitInfos.forEach((commitInfo) => {
        commitInfo.data.forEach(({ commit }) => {
            const dateString = commit.committer.date;
            const date = new Date(dateString);
            
            const day = parseDay(date);
            
            if (commits.hasOwnProperty(day)){
                commits[day]++;
            }
        })
    });
    
    
    
    const result = [];
    for (const key in commits){
        result.push({day: key, commit: commits[key]});
    }
    
    return result;
}


module.exports = {
    getCommitCounts
}