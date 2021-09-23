const axios = require('axios');
const User = require('../models/user.js');
const Team = require('../models/team.js');


const parseDay = (inputDate) => {
    const year = inputDate.getFullYear();
    const month = (inputDate.getMonth() + 1).toString().padStart(2, "0");
    const date = inputDate.getDate().toString().padStart(2, "0");
    const day = `${year}-${month}-${date}`;
    
    return day;
}

const getCommits = async ({ githubId, accessToken, since }) => {
    const repoInfos = await axios.get(`https://api.github.com/user/repos`,{
        headers: {
            Authorization: `token ${accessToken}`
        }
    });
    
    const repos = repoInfos.data.map(ele => ele.name);
    
    const commitInfos = await Promise.all(
        repos.map(repo => {
            return axios.get(`https://api.github.com/repos/${githubId}/${repo}/commits`,{
                headers: {
                    Authorization: `token ${accessToken}`
                },
                params: {
                    since
                }
            });
        })
    );
    
    const commits = commitInfos.flatMap(commitInfo => commitInfo.data.flatMap(ele => ele.commit));
    
    return commits;
}

const getCommitCountsForMonth = async (githubId) => {
    const user = await User.findOne({ githubId }).exec();
    
    if (!user) {
        throw new Error("회원가입되지 않은 사용자입니다.");
    }
    
    const commitCounter = {};
    const today = new Date();
    const dayBeforeMonth = new Date(today);
    dayBeforeMonth.setDate(dayBeforeMonth.getDate() - 30);
    
    new Array(30).fill(0)
    .forEach((_, index) => {
        const target = new Date(dayBeforeMonth);
        
        target.setDate(target.getDate() + index + 1);
        
        const day = parseDay(target);
        
        commitCounter[day] = 0;
    })
    
    
    const commits = await getCommits({ githubId, accessToken: user.accessToken, since: dayBeforeMonth.toISOString() });
    commits.forEach(commit => {
        const dateString = commit.committer.date;
        const date = new Date(dateString);
        
        const day = parseDay(date);
        
        if (commitCounter.hasOwnProperty(day)){
            commitCounter[day]++;
        }
    })
    
    
    const result = [];
    for (const key in commitCounter){
        result.push({day: key, commit: commitCounter[key]});
    }
    
    return result;
}

const getCommitCountOfTeam = async (teamId) => {
    const team = await Team.findById(teamId).exec();
    const { userIds } = team;
    
    const since = new Date();
    since.setDate(since.getDate() - 1);
    
    
    const commits = await Promise.all(
        userIds.map(async userId => {
            const user = await User.findOne({ githubId: userId }).exec();
            
            if (!user){
                return 0;
            }
            const { githubId, accessToken } = user;
            
            const commits = await getCommits({ githubId, accessToken, since });
            
            return {userId: userId, commit: commits.length};
        })
    );
    
    return commits;
}

module.exports = {
    getCommitCountsForMonth,
    getCommitCountOfTeam
}