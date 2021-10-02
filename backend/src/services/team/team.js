const Team = require("../../models/team");

const createTeam = async (req, res, next) => {
    try{
        
        if(req.body.password === undefined) req.body.password = null;
        req.body.password === null ? req.body.isLocked = false : req.body.isLocked = true;
        
        const result = await Team.create({...req.body});
        await res.status(201).json({
            code: '2001',
            status: '성공 : Team 생성',
            message: 'Team이 정상적으로 생성되었습니다.',
            id: result["_id"]
        });
    }
    catch(err){
        console.error(err);
        await res.status(500).json({
            code: '5000',
            status: '에러 : 서버 에러',
            message : '생성 요청 처리 중 서버에서 문제가 발생했습니다.'
        });
    }
};


const deleteTeam = async (req, res, next) => {
    try{
        const teamId = req.params['teamId'];
        await Team.findByIdAndDelete(teamId);
        await res.status(200).json({
            code: '2000',
            status: '성공 : Team 삭제',
            message: 'Team이 정상적으로 삭제되었습니다.'
        });
    }
    catch(err){
        console.error(err);
        await res.status(500).json({
            code: '5000',
            status: '에러 : 서버 에러',
            message : '삭제 요청 처리 중 서버에서 문제가 발생했습니다.'
        });
    }
};

const updateTeam = async (req, res, next) => {
    try{
        const teamId = req.params['teamId'];
        if(req.body['userIds'] !== undefined) throw new Error("userIds는 접근할 수 없습니다.");
        await Team.findByIdAndUpdate(teamId,{...req.body});
        await res.status(200).json({
            code: '2000',
            status: '성공 : Team 수정',
            message: 'Team이 정상적으로 수정되었습니다.'
        });
    }
    catch(err){
        console.error(err);
        await res.status(500).json({
            code: '5000',
            status: '에러 : 서버 에러',
            message : `${err}`
        });
    }
};

const searchTeams = async (req, res, next) => {
    try{
        
        let title = req.query["title"];
        let userId = req.query["userId"];
        let teams;

        if(title !== undefined && userId === undefined) teams = await Team.find({title:  new RegExp(`${title}`,'i')}).exec();
        else if(title === undefined && userId !== undefined) {
            teams = await Team.find()
                              .where('userIds').in([`${userId}`])
                              .exec();
        }
        else if(title === undefined && userId === undefined) teams = await Team.find({});
        else{
            throw new Error("query로 보내는 변수가 잘못되었습니다.");
        }

        await res.status(200).json({
            code: '2000',
            status: '성공 : Team 검색',
            message: 'Team이 정상적으로 검색되었습니다.',
            study: teams
        });
    }
    catch(err){
        console.error(err);
        await res.status(500).json({
            code: '5000',
            status: '에러 : 서버 에러',
            message : `${err}`
        });
    }
};

const enterTeam = async (req,res,next) => {
    try{
        const teamId = req.query['teamId'];
        const userId = req.query['userId'];
        const team = await Team.findById(teamId);
        if(team.password !== null && team.password !== req.body.password) throw new Error("비밀번호가 일치하지 않습니다.");
        const userIds = [...team.userIds];
        userIds.push(userId);
        team.userIds = userIds;
        team.save();
        await res.status(200).json({
            code: '2000',
            status: '성공 : Team 입장',
            message: 'User가 Team에 정상적으로 입장하였습니다.'
        });
    }
    catch(err){
        console.error(err);
        await res.status(500).json({
            code: '5000',
            status: '에러 : 서버 에러',
            message : `${err}`
        });
    }
};

const exitTeam = async (req,res,next) => {
    try{
        const teamId = req.query['teamId'];
        const userId = req.query['userId'];
        const team = await Team.findById(teamId);
        const userIds = [...team.userIds];
        team.userIds = userIds.filter(el => el !== userId);
        team.save();
        await res.status(200).json({
            code: '2000',
            status: '성공 : Team 퇴장',
            message: 'User가 Team에 정상적으로 퇴장하였습니다.'
        });
    }
    catch(err){
        console.error(err);
        await res.status(500).json({
            code: '5000',
            status: '에러 : 서버 에러',
            message : `${err}`
        });
    }
};

module.exports = { createTeam, deleteTeam, updateTeam, searchTeams, enterTeam, exitTeam };