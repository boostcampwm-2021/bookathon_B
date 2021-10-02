const axios = require('axios');
const User = require('../models/user.js');
const Team = require('../models/team.js');

// Date 객체로부터 날짜를 추출해 반환함
const parseDay = (inputDate) => {
    const year = inputDate.getFullYear();
    const month = (inputDate.getMonth() + 1).toString().padStart(2, "0");
    const date = inputDate.getDate().toString().padStart(2, "0");
    const day = `${year}-${month}-${date}`;
    
    return day;
}

// 특정 유저의 커밋 객체들의 배열을 반환한다.
// since가 있다면, 해당 일자 이후의 커밋 객체를 가져온다.
const getCommits = async ({ githubId, accessToken, since }) => {
    if (typeof githubId === "undefined" || typeof accessToken === "undefined"){
        throw new Error(`githubId 혹은 accessToken이 undefined입니다.`);
    }
    
    const repoInfos = await axios.get(`https://api.github.com/user/repos`,{
        headers: {
            Authorization: `token ${accessToken}`
        }
    });
	const repos = repoInfos.data.map(ele => ele.full_name);
    
    
    const commitInfos = (await Promise.all(
        repos.map(repo => {
            const link = `https://api.github.com/repos/${repo}/commits`
            try {
                return axios.get(link,{
                    headers: {
                        Authorization: `token ${accessToken}`
                    },
                    params: {
                        since
                    }
                });
            }
            catch (err) {
                return null;
            }
        })
    )).filter(ele => ele);
    
    const commits = commitInfos.flatMap(commitInfo => commitInfo.data.flatMap(ele => ele.commit));
    
    return commits;
}


// 특정 유저의 최근 한달간 커밋수의 배열을 반환한다.
// [{day: '2021-08-21', commit: 5}, {day: '2021-08-22', commit: 6}, ...]
// 배열의 각 원소는 날짜순으로 정렬되어 있다.
const getCommitCountsForMonth = async (githubId) => {
    const user = await User.findOne({ githubId }).exec();
    
    if (!user) {
        throw new Error("회원가입되지 않은 사용자입니다.");
    }
    
    const commitCounter = {};
    const dayBeforeMonth = new Date();
    dayBeforeMonth.setDate(dayBeforeMonth.getDate() - 30);
    dayBeforeMonth.setHours(dayBeforeMonth.getHours() + 9);
    
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

// 특정 스터디방의 참가자들의 당일 커밋수의 배열을 반환한다.
// [{userId: 'test1111', commit: 5}, {userId: 'test2222', commit: 6}, ...]
// userId는 Database에 저장된 githubId이다.
const getCommitCountOfTeam = async (teamId) => {
    const team = await Team.findById(teamId).exec();
    if (!team) {
        throw new Error('존재하지 않는 그룹입니다.');
    }
    
    const { userIds } = team;
    
    const since = new Date();
    since.setDate(since.getDate() - 1);
    since.setHours(since.getHours() + 9);
    
    const commits = await Promise.all(
        userIds.map(async userId => {
            const user = await User.findOne({ githubId: userId }).exec();
            if (!user){
                return 0;
            }
            
            const { githubId, accessToken } = user;
            
            const commits = await getCommits({ githubId, accessToken, since: since.toISOString() });
            
            return {userId: userId, commit: commits.length};
        })
    );
    
    return commits;
}

module.exports = {
    getCommitCountsForMonth,
    getCommitCountOfTeam
}