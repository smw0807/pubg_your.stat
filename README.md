# 프로젝트 제목

## PUBG your.stat

배틀그라운드 스탯 상세 정보 검색 사이트

# 만든 이유

현재 서비스 중인 전적검색 사이트들을 많이 이용하면서 내 계정 또는 타인의 계정의 전적보단 스탯을 보려고 검색을 자주 했었다.<br>
사용하면서 좀 더 많은 정보를 보여주면 더 좋을 것 같은데...라는 아쉬움이 조금 있었다.<br>
보여주는 스탯의 정보는 생각보다 적었고, 궁금한 마음에 직접 API에 요청을 해보니 생각보다 제공되는 정보가 많았다.<br>
그래서 좀 더 디테일한 정보를 보고 싶었고 전적보단 스탯의 디테일한 정보를 제공하는 사이트를 직접 만들어보자는 생각이들었고, Vue3와 TypeScript도 익혀볼 겸 시작하게 되었다.

# 기술 스택

- Vite (https://vitejs.dev/)
- Vue3 (https://vuejs.org/)
- TypeScript (https://www.typescriptlang.org/)
- Pinia (https://pinia.vuejs.org/introduction.html)
- Element Plus (https://element-plus.org/en-US/)
- PUBG API (https://documentation.pubg.com/en/introduction.html)
- Firebase (https://firebase.google.com/)
  - Firestore (https://firebase.google.com/docs/firestore)
  - Auth (https://firebase.google.com/docs/auth)

# 기능 구성

- 로그인 (보류/로그인은 되지만 약간의 버그가 있음)
  - 파이어베이스 인증 기능을 이용한 구글 로그인
- 플레이어 검색 (완성)
  - 검색 시 파이어베이스에 저장된 데이터 있는지 확인
  - 있을 경우 : 해당 데이터를 가져와서 화면에 보여줌
  - 없을 경우 : PUBG API에 요청해서 최신 데이터를 가져옴
    1. 결과 데이터를 파이어베이스에 저장
    2. 저장된 결과 데이터를 가져와서
  - 검색 결과 화면에서 갱신 버튼을 통해 [없을 경우]의 로직이 다시 실행됨
- 팀구하기 방 카드형식 리스트 화면 (구현중)
- 팀구하기 방 생성 (완성)
- 팀구하기 방 참여 (미완성)
- 팀구하기 방 채팅 기능 (미완성)

# 실행 방법

## 1. npm install

## 2. .env 생성

```
### 필요 옵션 ###
# 펍지 API 요청 URL
VITE_PUBG_API_URL=
# 펍지 API 키 (발급 받아야 함)
VITE_PUBG_API_KEY=

# FireBase Config
VITE_FB_apiKey=
VITE_FB_authDomain=
VITE_FB_databaseURL=
VITE_FB_projectId=
VITE_FB_storageBucket=
VITE_FB_messagingSenderId=
VITE_FB_appId=
VITE_FB_measurementId=
```

## 3. 실행 명령어

```
# 개발모드 실행
npm run dev
# 빌드 및 실행
npm run build
npm start
```

# 참고한 소스

타입스크립트 구현 중 인터페이스 관련해서 참고한 깃허브<br>
https://github.com/martinsileno/pubg-typescript-api

## 만들면서 참고한 URL들

- vue3 컴포져블
  - https://v3-docs.vuejs-korea.org/guide/reusability/composables.html
- Element Plus
  - 알림 : https://element-plus.org/en-US/component/notification.html
- vue-zoomer
  - https://github.com/jarvisniu/vue-zoomer/tree/next
- vue-timeago3
  - https://mrdeerly.github.io/vue-timeago3/
- firebase / GoogleAuth
  - 공식문서 : https://firebase.google.com/docs/auth/web/google-signin?hl=ko&authuser=0#web-version-9
  - 사용자 관리 : https://firebase.google.com/docs/auth/web/manage-users?authuser=0&hl=ko
  - 구글 인증 : https://firebase.google.com/docs/auth/web/google-signin?hl=ko&authuser=0
  - 인증상태 지속성 : https://firebase.google.com/docs/auth/web/auth-state-persistence?hl=ko&authuser=0
- firebase / firestore
  - 데이터 추가 https://firebase.google.com/docs/firestore/manage-data/add-data?hl=ko&authuser=0
  - 스냅샷 https://firebase.google.com/docs/firestore/query-data/get-data?hl=ko&authuser=0#get_all_documents_in_a_collection
- top level await
  - https://v8.dev/features/top-level-await
