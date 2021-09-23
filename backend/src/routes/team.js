const {createTeam, deleteTeam, updateTeam, searchTeams, enterTeam, exitTeam} = require("../services/team/team");
const express = require('express');
const githubService = require('../services/github.js');

const router = express.Router();

router.get('/',searchTeams);

router.post('/',createTeam);

router.put('/enter', enterTeam);

router.put('/exit', exitTeam);

router.put('/:teamId',updateTeam);

router.delete('/:teamId',deleteTeam);

router.get('/:teamId/commits', async (req, res) => {
    const teamId = req.params.teamId;
    
    const data = await githubService.getCommitCountOfTeam(teamId);
    
    res.json(data);
})

module.exports = router;