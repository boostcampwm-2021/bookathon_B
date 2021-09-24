const express = require('express');
const router = express.Router();
const userService = require('../services/user.js');
const githubService = require('../services/github.js');


const validateEmail = (email) => {
	if (typeof email === "undefined") {
		return false;
	}
	
	const regex = /^[\w\d]+@\w+\.\w+$/;
	
	return regex.test(email);
}
const validateNickName = (nickName) => {
	if (typeof nickName === "undefined") {
		return false;
	}
	
	const regex = /^[\w\d!@#$%^&*()\-+]{1,15}$/;
	
	return regex.test(nickName);
}

// 현재 로그인 중인 사용자의 정보를 json으로 보내준다.
router.get('/', (req, res) => {
	let data = {
		email: null,
		nickName: null,
		userId: null
	};
	
	if (req.user) {
		const {
			email, nickName, githubId: userId
		} = req.user;
		
		data = { email, nickName, userId };
	}
	
	res.json(data);
});

// 현재 로그인 중인 사용자의 이메일과 닉네임을 업데이트한다.
// 성공적으로 업데이트되면, 업데이트된 유저의 정보를 보내준다.
router.post('/edit', async (req, res) => {
	if (!req.isAuthenticated()){
		return res.status(401).json({
			message: '로그인이 필요한 요청입니다.'
		});
	}
		
	const { email, nickName } = req.body;
	
	if (!validateEmail(email)) {
		return res.status(400).json({
			message: `적절하지않는 email입니다. : ${email}`
		});
	}
	if (!validateNickName(nickName)) {
		return res.status(400).json({
			message: `적절하지않는 nickName입니다. : ${nickName}`
		});
	}
	
	const user = req.user;
	
	const modifiedCount = await userService.updateUser({ githubId: user.githubId }, { email, nickName });
	
	user.email = email;
	user.nickName = nickName;
	
	req.login(user, (err) => {
		if (!err){
			const data = { email, nickName, userId: user.githubId };
			
			return res.json(data);
		}
		
		res.send(err);
	});
})

// userId를 가진 유저의 최근 한달 커밋수가 담긴 배열을 json으로 보내준다.
router.get('/:userId/commits', async (req, res) => {
	const githubId = req.params.userId;
	
	try{
		const data = await githubService.getCommitCountsForMonth(githubId);

		res.json(data);
	}
	catch(err) {
		res.status(400).send(err.message);
	}
	
})

module.exports = router;
