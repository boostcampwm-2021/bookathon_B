const Team = require("../../models/team");

const createTeam = async (req, res, next) => {
    try{
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
        if(title === undefined) title = '';
        const teams = await Team.find({title:  new RegExp(`${title}`,'i')}).exec();

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
            message : '검색 요청 처리 중 서버에서 문제가 발생했습니다.'
        });
    }
};

module.exports = { createTeam, deleteTeam, updateTeam, searchTeams };