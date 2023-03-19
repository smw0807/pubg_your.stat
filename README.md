# 프로젝트 제목

## PUBG your.stat

배틀그라운드 스탯 상세 정보 검색 및 팀 구하기 커뮤니티 사이트

# 만든 이유

현재 서비스 중인 전적검색 사이트들을 많이 이용하면서 나 또는 타인의 플레이어 게임 기록보단 스탯 정보를 보려고 자주 이용했었다.<br>
사용하면서 좀 더 많은 정보를 보여주면 더 좋을 것 같은데...라는 아쉬움이 조금 있었다.<br>
궁금한 마음에 펍지 공식 API를 둘러보니 생각보다 제공되는 플레이어의 스탯 정보가 많았다.<br>
그래서 전적보단 스탯의 디테일한 정보를 제공하는 사이트를 직접 만들어보자는 생각으로 시작했다.<br>
제대로 사용해보지 못한 Vue3와 TypeScript도 익혀볼겸 사용하기로 했고,<br>이전부터 사용해보고 싶었던 파이어베이스를 이용해 별도의 추가 기능을 구현해보고자 했다.

# 개발 환경

- Macbook Pro 13(M1)
  - Node v16.16.0
  - npm 8.13.2
  - TypeScript 4.7.4
- 이 외에는 package.json 참고

# 기술 스택

- Vite (https://vitejs.dev/)
  - vite-plugin-vue-layouts (https://github.com/johncampionjr/vite-plugin-vue-layouts)
  - vite-plugin-pages (https://github.com/hannoeru/vite-plugin-pages)
- Vue3 (https://vuejs.org/)
  - TS with CompositionAPI (https://vuejs.org/guide/typescript/composition-api.html#typing-component-props)
- VueUse (https://vueuse.org/)
- vue-router (https://router.vuejs.org/)
- TypeScript (https://www.typescriptlang.org/)
- Pinia (https://pinia.vuejs.org/introduction.html)
- Element Plus (https://element-plus.org/en-US/)
- PUBG API (https://documentation.pubg.com/en/introduction.html)
- Firebase (https://firebase.google.com/)
  - Firestore (https://firebase.google.com/docs/firestore)
  - Auth (https://firebase.google.com/docs/auth)

# 기능 구성

- 로그인 [완성]
  - 파이어베이스 인증 기능을 이용한 구글 로그인
  - 최초 로그인 시 플랫폼 닉네임 입력 기능
- 내 정보 [완성]
  - 로그인 한 이메일 및 사용자 이름 표시
  - 최초 로그인 시 등록했던 닉네임 수정 기능
- 플레이어 검색 [완성]
  - 검색 시 파이어베이스에 저장된 데이터 있는지 확인
  - 있을 경우 : 해당 데이터를 가져와서 화면에 보여줌
    1. 마지막 업데이트로부터 얼마나 지났는지 시간표시 (예: '최근 업데이트 : 3일 전')
  - 없을 경우 : PUBG API에 요청해서 최신 데이터를 가져옴
    1. 결과 데이터를 파이어베이스에 저장
    2. 저장된 결과 데이터를 가져와서 화면에 보여줌
  - 검색 결과 화면에서 갱신 버튼을 통해 [없을 경우]의 로직이 다시 실행됨
- 팀구하기 방 카드형식 리스트 화면 [완성]
- 팀구하기 방 생성 [완성]
- 팀구하기 방 생성 후 방 입장 [완성]
- 팀구하기 방 참여 [완성]
- 팀구하기 방 내 기능 [완성]
  - 구성원들 표시 기능
    - 닉네임 복사
    - 스탯 보기
  - 채팅 기능
  - 입장 시 플레이어 스탯 출력(랭크만)

# 실행 방법

### 1. 노드 패키지 설치

```
npm install
```

### 2. .env 파일 생성

(.env와 아래 데이터 정보가 없으면 정상 작동 안됨)

```
### .env에 들어갈 내용 ###
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

### 3. 실행 명령어

```
# 개발모드 실행
npm run dev
# 빌드 및 실행
npm run build
npm preview
```

# 참고한 소스 및 URL

타입스크립트 구현 중 인터페이스 관련해서 참고한 깃허브<br>
https://github.com/martinsileno/pubg-typescript-api

## 만들면서 참고한 URL들

- Vue3
  - 컴포져블 https://v3-docs.vuejs-korea.org/guide/reusability/composables.html
  - 계산된속성 https://v3-docs.vuejs-korea.org/guide/essentials/computed.html#best-practices
- VueUse
  - useWindowSize : https://vueuse.org/core/useWindowSize/
  - useClipboard : https://vueuse.org/core/useClipboard/#useclipboard
- Element Plus
  - 알림 : https://element-plus.org/en-US/component/notification.html
  - input 창 자동완성 기능 : https://element-plus.org/en-US/component/autocomplete.html
- vue-zoomer
  - https://github.com/jarvisniu/vue-zoomer/tree/next
- vue-timeago3
  - https://mrdeerly.github.io/vue-timeago3/
- firebase / GoogleAuth
  - 공식문서 : https://firebase.google.com/docs/auth/web/google-signin?hl=ko&authuser=0#web-version-9
  - 사용자 관리 : https://firebase.google.com/docs/auth/web/manage-users?authuser=0&hl=ko
  - 구글 인증 : https://firebase.google.com/docs/auth/web/google-signin?hl=ko&authuser=0
  - 인증상태 관찰자 : https://firebase.google.com/docs/auth/web/start?hl=ko&authuser=0
  - 인증상태 지속성 : https://firebase.google.com/docs/auth/web/auth-state-persistence?hl=ko&authuser=0
  - 최초 로그인 체크 : https://firebase.google.com/docs/reference/js/auth.additionaluserinfo?hl=ko&authuser=0
    - https://stackoverflow.com/questions/39550149/check-if-user-is-authenticated-for-the-first-time-in-firebase-google-authenticat
- firebase / firestore
  - 데이터 추가 : https://firebase.google.com/docs/firestore/manage-data/add-data?hl=ko&authuser=0
  - 스냅샷 : https://firebase.google.com/docs/firestore/query-data/get-data?hl=ko&authuser=0#get_all_documents_in_a_collection
  - 스냅샷 리스너 분리 : https://firebase.google.com/docs/firestore/query-data/listen?hl=ko&authuser=0#detach_a_listener
  - 복합쿼리 : https://firebase.google.com/docs/firestore/query-data/queries?hl=ko&authuser=0#compound_queries
  - 쿼리제약조건 : https://stackoverflow.com/questions/69036031/firestore-conditional-where-clause-using-modular-sdk-v9
- top level await
  - https://v8.dev/features/top-level-await

---

# 구현된 화면

## 배포 사이트 주소

https://web-pubg-your-stat-nx562olfb49aha.sel3.cloudtype.app/

## 1. 메인화면

### 비로그인

<img src="https://firebasestorage.googleapis.com/v0/b/your-stat.appspot.com/o/1-0.%20%E1%84%86%E1%85%A6%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%92%E1%85%AA%E1%84%86%E1%85%A7%E1%86%AB.png?alt=media&token=d429a183-c88a-45fb-929b-7ea74ad196a8"/>

### 로그인

<img src="https://firebasestorage.googleapis.com/v0/b/your-stat.appspot.com/o/1-1.%20%E1%84%85%E1%85%A9%E1%84%80%E1%85%B3%E1%84%8B%E1%85%B5%E1%86%AB%20%E1%84%86%E1%85%A6%E1%84%8B%E1%85%B5%E1%86%AB%20%E1%84%92%E1%85%AA%E1%84%86%E1%85%A7%E1%86%AB.png?alt=media&token=26904adc-5575-4c49-a6fd-7d14929bb598"/>

## 2. 로그인

<img src="https://firebasestorage.googleapis.com/v0/b/your-stat.appspot.com/o/2.%20%E1%84%85%E1%85%A9%E1%84%80%E1%85%B3%E1%84%8B%E1%85%B5%E1%86%AB.png?alt=media&token=e43bc2fd-7927-4521-a606-65eb1d5bdab0"/>
파이어베이스 구글 로그인

### 2-1. 최초 로그인 시

<img src="https://firebasestorage.googleapis.com/v0/b/your-stat.appspot.com/o/3.%20%E1%84%8E%E1%85%AC%E1%84%8E%E1%85%A9%20%E1%84%85%E1%85%A9%E1%84%80%E1%85%B3%E1%84%8B%E1%85%B5%E1%86%AB.png?alt=media&token=5b7f1813-961e-4e8d-b255-2ea24f81caae"/>

여기서 등록한 닉네임은 [팀 구하기] 페이지에서 팀에 참여될 때 사용된다.  
예를들어 스팀 닉네임을 등록하지 않을 경우 [팀 구하기 - 스팀] 페이지에서 팀 생성을 할 수 없고, 만들어진 팀에 참가할 수 없다.
만들어진 팀 리스트만 확인 가능.

등록하지 않고 [다음에 하기]를 선택하면 나중에 헤더 우측에 있는 [내 정보]를 통해 등록, 수정할 수 있다.  
등록하면 [팀 구하기] 페이지에서 팀에 참여 시 등록된 닉네임이 팀 채팅방에 출력된다.

실제 배틀그라운드 공식 디스코드에서 팀을 구할 때 초대를 위해 닉네임을 물어보기 때문에 이를 편리하게 하고 싶었다.

## 3. 내정보

<img src="https://firebasestorage.googleapis.com/v0/b/your-stat.appspot.com/o/5.%20%E1%84%82%E1%85%A2%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%87%E1%85%A9.png?alt=media&token=09977751-47fe-43ba-86d8-80227c23e149"/>

최초 로그인 시 등록한 닉네임 정보를 볼 수 있고, 수정하거나 지울 수 있다.  
사이트에 로그인 한 구글 계정에 등록된 이미지, 이메일을 출력하고 최초 로그인 한 날짜와 닉네임의 최초 등록일과 수정일을 확인할 수 있다.

## 4. 플레이어 검색

<img src="https://firebasestorage.googleapis.com/v0/b/your-stat.appspot.com/o/6-0.%20%E1%84%80%E1%85%A5%E1%86%B7%E1%84%89%E1%85%A2%E1%86%A8%20.png?alt=media&token=0bebd931-d336-4c2d-9292-8fc402a33f8d"/>

검색하고자 하는 플랫폼을 선택 후 닉네임을 입력해서 검색 가능하다.  
닉네임 입력 부분 포커싱 시 검색했던 닉네임을 확인할 수 있다.  
검색한 닉네임들은 로컬스토리지에 저장하고, 최대 10개까지만 저장하고 출력한다.

<img src="https://firebasestorage.googleapis.com/v0/b/your-stat.appspot.com/o/6-1.%20%E1%84%80%E1%85%A5%E1%86%B7%E1%84%89%E1%85%A2%E1%86%A8%E1%84%80%E1%85%A1%E1%84%82%E1%85%B3%E1%86%BC%20%E1%84%91%E1%85%B3%E1%86%AF%E1%84%85%E1%85%A2%E1%86%BA%E1%84%91%E1%85%A9%E1%86%B7.png?alt=media&token=b854f9e2-6b2f-4446-b894-7271002c8f1b"/>

플랫폼은 스팀, 카카오만 가능하게 했다.

<img src="https://firebasestorage.googleapis.com/v0/b/your-stat.appspot.com/o/6-3.%20%E1%84%80%E1%85%A5%E1%86%B7%E1%84%89%E1%85%A2%E1%86%A8%20%E1%84%8C%E1%85%A1%E1%84%83%E1%85%A9%E1%86%BC%E1%84%8B%E1%85%AA%E1%86%AB%E1%84%89%E1%85%A5%E1%86%BC.png?alt=media&token=e13f8403-c175-4927-8f3f-3a253f5ae904"/>

로컬스토리지에 저장된 닉네임들 한해서 자동완성 기능을 제공한다.

> 닉네임 입력 후 검색 시 최초 검색일 경우엔 PUBG API에 요청을 해서 데이터를 가져와 파이어베이스에 저장 후 그 정보를 화면에 가져온다.  
> 만약 검색 한 기록이 있어서 파이어베이스에 이미 저장된 스탯이 있으면 해당 정보를 가져온다.

### 4-1. 검색 실패

#### 요청 수 제한 초과

<img src="https://firebasestorage.googleapis.com/v0/b/your-stat.appspot.com/o/6-5.%20%E1%84%80%E1%85%A5%E1%86%B7%E1%84%89%E1%85%A2%E1%86%A8%20%E1%84%89%E1%85%B5%E1%86%AF%E1%84%91%E1%85%A2%20-%20%E1%84%8B%E1%85%AD%E1%84%8E%E1%85%A5%E1%86%BC%20%E1%84%89%E1%85%AE%20%E1%84%8C%E1%85%A6%E1%84%92%E1%85%A1%E1%86%AB%20%E1%84%8E%E1%85%A9%E1%84%80%E1%85%AA.png?alt=media&token=82cf17a6-8c84-47db-8620-53cfc6ce6166"/>

<img src="https://firebasestorage.googleapis.com/v0/b/your-stat.appspot.com/o/6-6.%20%E1%84%80%E1%85%A5%E1%86%B7%E1%84%89%E1%85%A2%E1%86%A8%20%E1%84%89%E1%85%B5%E1%86%AF%E1%84%91%E1%85%A2%20-%20%E1%84%8B%E1%85%AD%E1%84%8E%E1%85%A5%E1%86%BC%20%E1%84%89%E1%85%AE%20%E1%84%8C%E1%85%A6%E1%84%92%E1%85%A1%E1%86%AB%20%E1%84%8E%E1%85%A9%E1%84%80%E1%85%AA%20%E1%84%92%E1%85%AA%E1%86%A8%E1%84%83%E1%85%A2.png?alt=media&token=3cb5bb09-1d2a-4c71-bb7d-00aa2324d71d"/>

파이어베이스에 저장되지 않은 닉네임으로 검색 시 PUBG API로 검색 요청이 들어가는데.  
분당 요청수 제한이 있어 제한이 걸리면 위 이미지와 같이 알림창을 뜨게 했다.

#### 존재하지 않은 닉네임

<img src="https://firebasestorage.googleapis.com/v0/b/your-stat.appspot.com/o/6-4.%20%E1%84%80%E1%85%A5%E1%86%B7%E1%84%89%E1%85%A2%E1%86%A8%20%E1%84%89%E1%85%B5%E1%86%AF%E1%84%91%E1%85%A2%20-%20%E1%84%8C%E1%85%A9%E1%86%AB%E1%84%8C%E1%85%A2%E1%84%92%E1%85%A1%E1%84%8C%E1%85%B5%20%E1%84%8B%E1%85%A1%E1%86%AD%E1%84%82%E1%85%B3%E1%86%AB%20%E1%84%82%E1%85%B5%E1%86%A8%E1%84%82%E1%85%A6%E1%84%8B%E1%85%B5%E1%86%B7.png?alt=media&token=f8d1bb50-0c3b-4dc4-bb6e-c4cc2942b17c"/>

분당 요청 수 제한에 걸리지 않은 상태에서 검색 요청 후 파이어베이스에도 없고 PUBG API 검색에도 없을 경우 출력되는 알림창
