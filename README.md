# 자라나라 잔디잔디

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
- Material UI

### BE
- Nodejs & Express
- MongoDB


## 사용자 플로우
1. 웹페이지에 들어가면 Github OAuth Login을 진행한다.
    - 최초 로그인시, 알림을 받을 이메일과 닉네임을 입력받는다.
2. 메인페이지에서 스터디 생성/조회/수정/삭제/참가/퇴장가 가능하다.
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
    - GET /study?userId={userId}&title={title}
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
