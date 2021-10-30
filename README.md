# 자라나라 잔디잔디
~~바로가기~~ 배포 서버 중단
## 데모
<img src="https://blog.kakaocdn.net/dn/vYY7V/btrfXxIFwJk/oEOV0KBLEsllYJsHzjK5a1/img.gif" />

## 참여

[J032 김서진](https://github.com/SeojinSeojin)|[J022 김동환](https://github.com/gidskql6671)|[J137 윤해수](https://github.com/haesoo9410)|[J164 이찬호](https://github.com/ChanHoLee275)
|:---:|:---:|:---:|:---:|
<img src="https://github.com/SeojinSeojin.png">|<img src="https://github.com/gidskql6671.png">|<img src="https://github.com/haesoo9410.png">|<img src="https://github.com/ChanHoLee275.png">

## 기획

### 동기
1일 1커밋을 위한 스터디를 진행했던 적이 있는데, 스터디장님께서 모든 스터디원의 깃허브에 들어가 일일이 확인하셔야 했고, 이러한 과정을 자동화하고자 기획하게 되었습니다.

### 기능
스터디원들의 깃허브 아이디를 입력하면 커밋 현황이 나오고(풀리퀘/이슈/새 레포 만들기 등의 액티비티 제외)
23시까지 커밋하지 않은 스터디원에게는 자동적으로 이메일이 전송되는 서비스입니다.

## 주요 기능
- Github Oauth Login
- 최초 로그인 시 회원가입
- nodemailer를 통한 email 전송
- 스터디 CRUD
- 스터디 사용자 CRUD
- 스터디원 커밋 현황 표시

## 기술 스택

### FE
- ReactJS
- Styled Components

### BE
- Nodejs & Express
- MongoDB


## 사용자 플로우
1. 웹페이지에 들어가면 Github OAuth Login을 진행한다.
    - 최초 로그인시, 알림을 받을 이메일과 닉네임을 입력받는다.
2. 메인페이지에서 스터디 생성/조회/수정/삭제/참가/퇴장이 가능하다.
    - 스터디 생성 과정
        - 스터디 이름을 입력한다.
        - 패스워드를 입력한다.(옵션)
    - 스터디 조회
        - 자기가 속한 스터디를 조회할 수 있다.
    - 스터디 수정
        - 자기가 만든 스터디방의 이름만 수정할 수 있다.
    - 스터디 삭제
        - 자기가 만든 스터디방만 제거할 수 있다.
    - 스터디 참가
        - 다른 사람이 만든 스터디방에 참가할 수 있다.
        - 방 이름을 검색하여 스터디 목록을 볼 수 있다.
    - 스터디 퇴장
        - 자기가 속했던 스터디에서 탈퇴할 수 있다.
3. 원하는 스터디 페이지에 들어간다.
    - 스터디 참가 인원 목록을 볼 수 있다.
    - 각 인원별 오늘 한 커밋수를 볼 수 있다.
    - 참가한 인원을 클릭하면, 그래프로 최근 커밋수들을 볼 수 있다.
    
    ![image](https://user-images.githubusercontent.com/48249505/134449653-473fb71e-dba7-4056-a5fa-8d4d5b23846a.png)

## HTTP API
### 기본 홈페이지
- HTML 파일 제공
    - GET /
- 정적 파일 제공(html 제외)
    - GET /static/{path}

### User 관련
1. login
    - POST /login
2. 내가 속한 study 조회
    - GET /study?userId={userId}
### 스터디 관련
1. study 검색
    - GET /study?title={title}
2. study 생성
    - POST /study
    - Body: {title: "title", password: "optional"}
3. study 삭제
    - DELETE /study/:studyId
4. study 이름 수정
    - PUT or POST /study/:studyId
    - Body는 좀다 생각해봅시다.
5. 특정 스터디의 유저별 1일 커밋
    - GET /study/:studyId/commits
6. 특정 유저의 30일 커밋
    - GET /user/:userId/commits

## 브랜치 전략

### PR Merge 전략
* PR 보내면 말해주기!
* Rebase Merge

### 브랜치명
* main <- 최종적으로 머지되는 곳
* frontend-dev <- 프론트 피쳐브랜치가 머지되는 곳
* backend-dev <- 백엔드 피쳐브랜치가 머지되는 곳
* feat/#이슈 <- 커밋하고 작업하는 곳


### 구현 API 명세

1. GET /user
    현재 로그인된 유저의 정보를 json으로 보내준다.
    json의 형식은 다음과 같다.
    { email: string or null, nickName: string or null }
    email : 알림을 받을 이메일
    nickName : 다른 사람에게 보일 닉네임
    OAuth 로그인을 처음한 상태라면, email과 nickName에 null이 들어가있다.
2. GET /auth/github
    Github OAuth 로그인 페이지를 불러온다.
    로그인이 성공하면 쿠키와 세션을 통해 로그인을 관리한다.
    로그인 성공한 경우, 실패한 경우 모두 / 경로로 리다이렉트된다.
3. POST /auth/logout
    로그아웃을 한다.
    Response로 보내는 값은 없다. HTTP 상태코드가 200이면 성공한 것.
4. POST /user/edit
    현재 로그인된 유저의 정보를 변경한다.
    로그인이 되어있지 않다면, 상태코드 401로 응답한다.
    Request Body로 email과 nickName을 받는다.
    email 혹은 nickName이 형식에 맞지 않는 경우, 상태 코드 400으로 응답한다.

5. GET /user/{userId}/commits
	해당 유저의 최근 한달간 커밋수를 담은 배열을 json으로 응답한다.
	[ { day: "2021-08-25", commit: 5 }, { day: "2021-08-26", commit: 6 }, ..., { day: "2021-09-24", commit: 10 } ]
	day는 해당하는 날짜, commit은 그 날의 커밋수를 나타낸다.
6. GET /study/{teamId}/commits
	해당 팀의 모든 참가자의 당일 커밋수를 담은 배열을 json으로 응답한다.
	[ { userId: String, commit: Integar }, { userId: String, commit: Integar }, ... ]
	userId는 해당하는 팀원의 github id를 나타내며, commit은 그 팀원의 당일 커밋수를 나타낸다.
7. 스터디 그룹 생성
	POST /study로 스터디 그룹을 생성합니다.
	body : {
	title: String,
	password: String,
	details: String,
	userIds: Array,
	}
    
8. 스터디 그룹 삭제
	DELETE /study/:teamId
	teamId는 objectId로 스터디 그룹을 조회하면 반환이 됩니다.
	
9. 스터디 그룹 수정
    PUT /study/:teamId
	userIds를 제외하고, 다른 입력이 들어오면 수정 가능
	userIds가 들어가면, status 코드가 500이 되고, 수정이 안됩니다.
    
10. 스터디 그룹 조회
	GET /study?title=${title}
	GET /study?userId=${userId}
	GET /study
    
    response
    {
        "code":"2000",
        "status":"성공 : Team 검색",
        "message": "Team이 정상적으로 검색되었습니다.",
        "study" : [teamObject] // team을 담은 object 반환
    }
		
	쿼리의 title을 가지고 있는 모든 스터디 그룹 조회
	쿼리의 userId를 가지고 있는 모든 스터디 그룹 조회
	쿼리가 없으면, 전체 스터디 그룹을 반환합니다
	
	만약 title과 userId가 동시에 있으면 status 500 반환하여 스터디 그룹을 반환하지 않습니다.
11. 스터디 그룹 참가
    PUT /study/enter?teamId={teamId}&&userId={userId}
    body : {
        password: {password}
    }
    
    response
    {
            code: '2000',
            status: '성공 : Team 입장',
            message: 'User가 Team에 정상적으로 입장하였습니다.'
    }
    
    password가 null인 경우는 사용하지 않고, null이 아닌 경우는 확인하여 문제가 맞으면 입장
    
13. 스터디 그룹 탈퇴
    PUT /study/exit?teamId={teamId}&&userId={userId}
    
    response
    {
            code: '2000',
            status: '성공 : Team 퇴장',
            message: 'User가 Team에 정상적으로 퇴장하였습니다.'
    }
    
15. 이메일 전송
    GET /mail/:userId
    userId를 objectId로 가지고 있는 사람의 이메일에 메일을 보냄.
    {
        code: '2000',
        status: '성공 : 메세지 발송',
        message: '메세지 발송이 정상적으로 수행되었습니다.',
        info: info // 
    }
