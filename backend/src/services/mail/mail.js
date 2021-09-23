const nodemailer = require("nodemailer");
const User = require("../../models/user");

const findUser = async (req, res, next) => {
    try{
        const userId = req.params['userId'];
        const user = await User.findById(userId);
        req.params["email"] = user["email"];
        if(req.params["email"] === undefined) throw new Error("사용자의 이메일이 없습니다.");
        next();
    }
    catch(err){
        console.error(err);
        await res.status(500).json({
            code: '5000',
            status: '에러 : 서버 에러',
            message : `메일 발송 요청 처리 중 사용자를 찾지 못했습니다.`
        });
    }
};

const sendMail = async (req, res, next) => {
    
    // Gmail
    const email = process.env.GMAIL;
    const emailPw = process.env.GMAILPW;

    let transport = nodemailer.createTransport({
        service: "gmail",
        auth:{
            user: email,
            pass: emailPw
        }
    });

    let mailOptions = {
        from: email,
        to: req.params["email"],
        subject: "1일 1커밋 운동 참여 독려",
        html:`
        <h1> 1일 1커밋 운동에 참여하세요! </h1>
        <p>자라나라 잔디잔디!</p>
        <p>아직 오늘이 가지 않았습니다! 커밋을 보내 잔디밭을 키워보세요!</p>
        `
    };
    try{
        transport.sendMail(mailOptions, async (error, info) => {
            if(error) throw new Error("메일을 보내는 데 실패하였습니다.");
            await res.status(200).json({
                code: '2000',
                status: '성공 : 메세지 발송',
                message: '메세지 발송이 정상적으로 수행되었습니다.',
                info: info
            });
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

module.exports = {findUser, sendMail};