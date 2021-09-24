const Team = require("../../models/team");
const User = require("../../models/user");
const fetch = require('node-fetch');
const { getCommitCountOfTeam } = require("../github");
const nodemailer = require('nodemailer');

const findAllTeams = async () => {
    try{
        const teams = await Team.find({});
        const teamIds = teams.map(el => el._id.toString());
        return teamIds;
    }
    catch(err){
        console.error(err);
    }
};

const getUsersCommits = async (teamIds) => {
    try{
        const users = [];
        for(let i = 0 ; i < teamIds.length; i++){
            const commits = await getCommitCountOfTeam(teamIds[i]);
            users.concat(commits);
        }
        return users;
    }
    catch(err){
        console.error(err);
    }
};

const getUsersEmail = async (users) => {
    try{

        const userIds = [];
        for(let i = 0; i < users.length; i++){
            const user = User.find({githubId:`${users[i]}`});
            userIds.push(user.email);
        };
        return userIds;
    }
    catch(err){
        console.error(err);
    }
};

const sendMails = async (userIds) => {
    try{
        const email = process.env.GMAIL;
        const emailPw = process.env.GMAILPW;

        let transport = nodemailer.createTransport({
            service: "gmail",
            auth:{
                user: email,
                pass: emailPw
            }
        });

        userIds.forEach(el => {
            
            let mailOptions = {
                from: email,
                to: el,
                subject: "1일 1커밋 운동 참여 독려",
                html:`
                <h1> 1일 1커밋 운동에 참여하세요! </h1>
                <p>자라나라 잔디잔디!</p>
                <p>아직 오늘이 가지 않았습니다! 커밋을 보내 잔디밭을 키워보세요!</p>
                `
            };

            transport.sendMail(mailOptions, async (error, info) => {
                if(error) throw new Error("메일을 보내는 데 실패하였습니다.");
            });
        });


    }
    catch(err){
        console.error(err);
    }
};

module.exports = {findAllTeams, getUsersCommits, getUsersEmail, sendMails};