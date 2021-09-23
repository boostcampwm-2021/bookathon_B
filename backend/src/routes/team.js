const {createTeam, deleteTeam, updateTeam, searchTeams, enterTeam, exitTeam} = require("../services/team/team");
const express = require('express');
const router = express.Router();

router.get('/',searchTeams);

router.post('/',createTeam);

router.put('/enter', enterTeam);

router.put('/exit', exitTeam);

router.put('/:teamId',updateTeam);

router.delete('/:teamId',deleteTeam);

module.exports = router;