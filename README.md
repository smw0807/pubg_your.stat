# 프로젝트 제목

## PUBG your.stat

배틀그라운드 스탯 상세 정보 검색 및 팀 구하기 커뮤니티 사이트

# 만든 이유

현재 서비스 중인 전적검색 사이트들을 많이 이용하면서 나 또는 타인의 플레이어 게임 기록보단 스탯 정보를 보려고 자주 이용했었다.  
사용하면서 좀 더 많은 정보를 보여주면 더 좋을 것 같은데...라는 아쉬움이 조금 있었다.  
궁금한 마음에 펍지 공식 API를 둘러보니 생각보다 제공되는 플레이어의 스탯 정보가 많았다.  
그래서 전적보단 스탯의 디테일한 정보를 제공하는 사이트를 직접 만들어보자는 생각으로 시작했다.  
제대로 사용해보지 못한 Vue3와 TypeScript도 익혀볼겸 사용하기로 했고,  
이전부터 사용해보고 싶었던 파이어베이스를 이용해 별도의 추가 기능을 구현해보고자 했다.

파이어베이스를 이용해 구현한 팀구하기의 기능은 실제 배틀그라운드 공식 디스코드 채널에서 팀을 구하는 과정에 불편함을 느낀게 있어서 이런 방식이면 좋지 않을까? 하는 생각으로 구현해봤다.

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

- 로그인
  - 파이어베이스 인증 기능을 이용한 구글 로그인
  - 최초 로그인 시 플랫폼 닉네임 입력 기능
- 내 정보
  - 로그인 한 이메일 및 사용자 이름 표시
  - 최초 로그인 시 등록했던 닉네임 수정 기능
- 플레이어 검색
  - 검색 시 파이어베이스에 저장된 데이터 있는지 확인
  - 있을 경우 : 해당 데이터를 가져와서 화면에 보여줌
    1. 마지막 업데이트로부터 얼마나 지났는지 시간표시 (예: '최근 업데이트 : 3일 전')
  - 없을 경우 : PUBG API에 요청해서 최신 데이터를 가져옴
    1. 결과 데이터를 파이어베이스에 저장
    2. 저장된 결과 데이터를 가져와서 화면에 보여줌
  - 검색 결과 화면에서 갱신 버튼을 통해 [없을 경우]의 로직이 다시 실행됨
- 팀구하기 방 카드형식 리스트 화면
- 팀구하기 방 생성
- 팀구하기 방 생성 후 방 입장
- 팀구하기 방 참여
- 팀구하기 방 내 기능
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

<br/>

# 구현된 화면

## 배포 사이트 주소

https://web-pubg-your-stat-nx562olfb49aha.sel3.cloudtype.app/

## 1. 메인화면

### 비로그인 상태

<img src="https://firebasestorage.googleapis.com/v0/b/your-stat.appspot.com/o/1-0.%20%E1%84%86%E1%85%A6%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%92%E1%85%AA%E1%84%86%E1%85%A7%E1%86%AB.png?alt=media&token=d429a183-c88a-45fb-929b-7ea74ad196a8"/>

### 로그인 상태

<img src="https://firebasestorage.googleapis.com/v0/b/your-stat.appspot.com/o/1-1.%20%E1%84%85%E1%85%A9%E1%84%80%E1%85%B3%E1%84%8B%E1%85%B5%E1%86%AB%20%E1%84%86%E1%85%A6%E1%84%8B%E1%85%B5%E1%86%AB%20%E1%84%92%E1%85%AA%E1%84%86%E1%85%A7%E1%86%AB.png?alt=media&token=26904adc-5575-4c49-a6fd-7d14929bb598"/>

## 2. 로그인

<img src="https://firebasestorage.googleapis.com/v0/b/your-stat.appspot.com/o/2.%20%E1%84%85%E1%85%A9%E1%84%80%E1%85%B3%E1%84%8B%E1%85%B5%E1%86%AB.png?alt=media&token=e43bc2fd-7927-4521-a606-65eb1d5bdab0"/>
파이어베이스 구글 로그인 기능을 이용해 구현했다.

### 2-1. 최초 로그인 시

<img src="https://firebasestorage.googleapis.com/v0/b/your-stat.appspot.com/o/3.%20%E1%84%8E%E1%85%AC%E1%84%8E%E1%85%A9%20%E1%84%85%E1%85%A9%E1%84%80%E1%85%B3%E1%84%8B%E1%85%B5%E1%86%AB.png?alt=media&token=5b7f1813-961e-4e8d-b255-2ea24f81caae"/>

- 닉네임 저장시  
  여기서 등록한 닉네임은 [팀 구하기] 페이지에서 팀에 참여될 때 사용된다.  
  스팀 닉네임을 등록하지 않을 경우
- 닉네임 저장 안할 시 ([다음에 하기] 버튼 선택)  
  [팀 구하기] 페이지에서 팀 생성을 할 수 없고, 만들어진 팀에 참가할 수 없다.  
  [팀 구하기] 페이지에서 리스트보는 것과 [팀 필터] 기능만 사용할 수 있다.  
  나중에 헤더 우측에 있는 [내 정보]를 통해 등록, 수정할 수 있다.  
  등록하면 [팀 구하기] 페이지에서 팀에 참여 시 등록된 닉네임이 팀 채팅방에 출력된다.

> 실제 배틀그라운드 공식 디스코드에서 팀을 구할 때 초대를 위해 닉네임을 물어보기 때문에 이를 편리하게 하고 싶었다.

## 3. 내정보

<img src="https://firebasestorage.googleapis.com/v0/b/your-stat.appspot.com/o/5.%20%E1%84%82%E1%85%A2%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%87%E1%85%A9.png?alt=media&token=09977751-47fe-43ba-86d8-80227c23e149"/>

최초 로그인 시 등록한 닉네임 정보를 볼 수 있고, 수정하거나 지울 수 있다.  
사이트에 로그인 한 구글 계정에 등록된 이미지, 이메일을 보여준다.  
최초 로그인 한 날짜와 닉네임의 최초 등록일과 수정일을 확인할 수 있다.

## 4. 플레이어 검색

<img src="https://firebasestorage.googleapis.com/v0/b/your-stat.appspot.com/o/6-0.%20%E1%84%80%E1%85%A5%E1%86%B7%E1%84%89%E1%85%A2%E1%86%A8%20.png?alt=media&token=0bebd931-d336-4c2d-9292-8fc402a33f8d"/>

검색하고자 하는 플랫폼을 선택 후 닉네임을 입력해서 검색 가능하다.  
닉네임 입력창에 포커싱이 되면 본인이 검색했었던 닉네임을 확인할 수 있다.  
검색한 닉네임들은 로컬스토리지에 저장하고, 최대 10개까지만 저장하고 출력한다.

<img src="https://firebasestorage.googleapis.com/v0/b/your-stat.appspot.com/o/6-1.%20%E1%84%80%E1%85%A5%E1%86%B7%E1%84%89%E1%85%A2%E1%86%A8%E1%84%80%E1%85%A1%E1%84%82%E1%85%B3%E1%86%BC%20%E1%84%91%E1%85%B3%E1%86%AF%E1%84%85%E1%85%A2%E1%86%BA%E1%84%91%E1%85%A9%E1%86%B7.png?alt=media&token=b854f9e2-6b2f-4446-b894-7271002c8f1b"/>

플랫폼은 스팀, 카카오만 가능하게 했다.

<img src="https://firebasestorage.googleapis.com/v0/b/your-stat.appspot.com/o/6-3.%20%E1%84%80%E1%85%A5%E1%86%B7%E1%84%89%E1%85%A2%E1%86%A8%20%E1%84%8C%E1%85%A1%E1%84%83%E1%85%A9%E1%86%BC%E1%84%8B%E1%85%AA%E1%86%AB%E1%84%89%E1%85%A5%E1%86%BC.png?alt=media&token=e13f8403-c175-4927-8f3f-3a253f5ae904"/>

로컬스토리지에 저장된 닉네임들 한해서 자동완성 기능을 제공한다.

> 닉네임 입력 후 검색 시 최초 검색일 경우엔 PUBG API에 요청을 해서 데이터를 가져와 파이어베이스에 저장 후 그 정보를 화면에 가져온다.  
> 만약 검색 한 기록이 있어서 파이어베이스에 이미 저장된 스탯이 있으면 해당 정보를 가져온다.

### 4-1. 검색 실패 상황 2가지

#### **요청 수 제한 초과**

<img src="https://firebasestorage.googleapis.com/v0/b/your-stat.appspot.com/o/6-5.%20%E1%84%80%E1%85%A5%E1%86%B7%E1%84%89%E1%85%A2%E1%86%A8%20%E1%84%89%E1%85%B5%E1%86%AF%E1%84%91%E1%85%A2%20-%20%E1%84%8B%E1%85%AD%E1%84%8E%E1%85%A5%E1%86%BC%20%E1%84%89%E1%85%AE%20%E1%84%8C%E1%85%A6%E1%84%92%E1%85%A1%E1%86%AB%20%E1%84%8E%E1%85%A9%E1%84%80%E1%85%AA.png?alt=media&token=82cf17a6-8c84-47db-8620-53cfc6ce6166"/>

<img src="https://firebasestorage.googleapis.com/v0/b/your-stat.appspot.com/o/6-6.%20%E1%84%80%E1%85%A5%E1%86%B7%E1%84%89%E1%85%A2%E1%86%A8%20%E1%84%89%E1%85%B5%E1%86%AF%E1%84%91%E1%85%A2%20-%20%E1%84%8B%E1%85%AD%E1%84%8E%E1%85%A5%E1%86%BC%20%E1%84%89%E1%85%AE%20%E1%84%8C%E1%85%A6%E1%84%92%E1%85%A1%E1%86%AB%20%E1%84%8E%E1%85%A9%E1%84%80%E1%85%AA%20%E1%84%92%E1%85%AA%E1%86%A8%E1%84%83%E1%85%A2.png?alt=media&token=3cb5bb09-1d2a-4c71-bb7d-00aa2324d71d"/>

파이어베이스에 저장되지 않은 닉네임으로 검색 시 PUBG API로 검색을 요청한다.  
무료로 사용할 수 있는 PUBG API KEY는 분당 요청수 제한이 있어 제한이 걸리면 위와 같이 알림창을 뜨게 했다.

#### **존재하지 않은 닉네임**

<img src="https://firebasestorage.googleapis.com/v0/b/your-stat.appspot.com/o/6-4.%20%E1%84%80%E1%85%A5%E1%86%B7%E1%84%89%E1%85%A2%E1%86%A8%20%E1%84%89%E1%85%B5%E1%86%AF%E1%84%91%E1%85%A2%20-%20%E1%84%8C%E1%85%A9%E1%86%AB%E1%84%8C%E1%85%A2%E1%84%92%E1%85%A1%E1%84%8C%E1%85%B5%20%E1%84%8B%E1%85%A1%E1%86%AD%E1%84%82%E1%85%B3%E1%86%AB%20%E1%84%82%E1%85%B5%E1%86%A8%E1%84%82%E1%85%A6%E1%84%8B%E1%85%B5%E1%86%B7.png?alt=media&token=f8d1bb50-0c3b-4dc4-bb6e-c4cc2942b17c"/>

분당 요청 수 제한에 걸리지 않은 상태에서 검색 요청 후 파이어베이스에도 없고 PUBG API 검색에도 없을 경우 출력되는 알림창

### 4-2. 검색 결과 - 랭크

<img src="https://firebasestorage.googleapis.com/v0/b/your-stat.appspot.com/o/7-0.%20%E1%84%8F%E1%85%A1%E1%84%8F%E1%85%A1%E1%84%8B%E1%85%A9%20%E1%84%80%E1%85%A5%E1%86%B7%E1%84%89%E1%85%A2%E1%86%A8%20%E1%84%80%E1%85%A7%E1%86%AF%E1%84%80%E1%85%AA.png?alt=media&token=5fb370e1-d773-4da9-a7e6-5522007cdb2e"/>

[최근 업데이트] 부분은 파이어베이스에 저장된 날짜 기준으로 마지막 업데이트 일을 출력한다.  
[갱신] 버튼 클릭시 PUBG API에 요청을 해서 최신 데이터를 가져온다.  
갱신 중에도 4-1의 에러가 출력될 수 있다.

PUBG API로부터 제공되는 랭크의 데이터는 종류가 많이 없어서 한 개의 탭에 보여주도록 했고, 일반은 제공되는 데이터가 많아서 모드별로 탭을 나누었다.  
카카오는 1인칭이 없어서 랭크, 솔로, 듀오, 스쿼드 이렇게 4개의 탭만 있다.  
스팀의 경우 1인칭까지 있어서 탭의 개수가 더 많다.
<img src="https://firebasestorage.googleapis.com/v0/b/your-stat.appspot.com/o/7-2.%20%E1%84%89%E1%85%B3%E1%84%90%E1%85%B5%E1%86%B7%20.png?alt=media&token=7386eb3b-9bf3-46ad-94a9-d4833f053393"/>

### 4-3. 검색 결과 - 일반

<img src="https://firebasestorage.googleapis.com/v0/b/your-stat.appspot.com/o/8.%20%E1%84%8B%E1%85%B5%E1%86%AF%E1%84%87%E1%85%A1%E1%86%AB%20%E1%84%80%E1%85%A5%E1%86%B7%E1%84%89%E1%85%A2%E1%86%A8%20%E1%84%80%E1%85%A7%E1%86%AF%E1%84%80%E1%85%AA.png?alt=media&token=4a3110b9-36af-4607-8ca2-4f4c61a5fe01"/>

PUBG API에서 일반 스탯에서 제공해주는 데이터의 대부분을 표시했다.  
데이터 중 몇몇 데이터는 문서를 봐도 의도를 파악할 수 없는 데이터들이 있어서 표시하지 않은 데이터들도 있다.

> ## **일반 게임 데이터는 데스 정보를 제공해주지 않는다...?**
>
> 여기서 가장 큰 문제가 있었는데, 일반의 경우 랭크에 비해 제공되는 데이터가 많지만 데스에 대한 정보 제공하지 않는다.  
> 받는 데이터 필드에는 있는데 0이라는 값만 넘어온다.  
> 랭크 스탯의 경우 KDA라는 데이터 자체가 존재하는데 일반은 없어서 따로 계산해서 보여주려고 했으나 데스 데이터를 제공해주지 않는다.  
> 그래서 KDA, KD를 표시가 불가능 하다.
>
> 어떻게 내가 따로 계산해서 보여줄 수 있는 방법이 있지 않을까 고민을 해봤었다.  
> 치킨을 먹지 못한 게임은 다 1데스로 생각해도 되지 않을까? 했는데  
> 솔로는 치킨을 먹으면 안죽었다고 가정할 수 있어서 치킨을 제외한 다른 게임은 다 1데스로 판단하고 구할 수 있는 것 같았지만,  
> 듀오나 스쿼드의 경우 치킨을 먹어도 죽은 상태에서 팀원이 치킨을 먹어서 데스를 판단하기 힘들다.  
> 그리고 복귀전이 있는 맵의 경우 한 번 죽고, 복귀전에서 살아나서 또 죽을 수도 있기 때문에 한 게임이 2데스가 가능하다.
>
> 실제 서비스 중인 곳들은 어떻게 데이터를 표시하는 건지 궁금했지만 알 수 있는 방법이 없어서 표시하는걸 포기했다.  
> 유료API는 제공해주는 건지 알 수가 없어서 표시하는걸 우선은 포기했다.

## 5. 맵별 차량 위치

<img src="https://firebasestorage.googleapis.com/v0/b/your-stat.appspot.com/o/9.%20%E1%84%86%E1%85%A2%E1%86%B8.png?alt=media&token=336285c0-09a4-451f-8484-9b5d204e203d"/>

경쟁전 기준으로 에란겔, 미라마, 태이고의 차량 리스폰 위치가 표시된 이미지를 제공한다.  
이미지는 확대, 축소하여 볼 수 있고, 하단에 이미지 아이콘 별로 차량의 종류와 리스폰되는 확률을 표시해준다.  
해당 정보를 제공하는 출처 링크도 표시해두었다.

## 6. 팀 구하기

<img src="https://firebasestorage.googleapis.com/v0/b/your-stat.appspot.com/o/10-0.%20%E1%84%90%E1%85%B5%E1%86%B7%E1%84%80%E1%85%AE%E1%84%92%E1%85%A1%E1%84%80%E1%85%B5%20%E1%84%92%E1%85%AA%E1%84%86%E1%85%A7%E1%86%AB.png?alt=media&token=c504c819-7396-44e9-82a8-e81b935df9de"/>

플랫폼 별 카카오, 스팀으로 페이지가 나누어져 있다.  
만들어져 있는 팀 리스트를 볼 수 있고, 팀에 참가하거나 만들 수 있다.  
단, **팀에 참가하거나 만들기 위해선 [내 정보]에 닉네임이 등록되어 있어야 한다.**

<img src="https://firebasestorage.googleapis.com/v0/b/your-stat.appspot.com/o/10-3.%20%E1%84%90%E1%85%B5%E1%86%B7%20%E1%84%8E%E1%85%A1%E1%86%B7%E1%84%80%E1%85%A1%20%E1%84%89%E1%85%B5%E1%86%AF%E1%84%91%E1%85%A2%20-%20%E1%84%82%E1%85%A9%E1%84%82%E1%85%B5%E1%86%A8%E1%84%82%E1%85%A6%E1%84%8B%E1%85%B5%E1%86%B7.png?alt=media&token=1dbd7bb5-c557-49a3-ad45-accb388f1844"/>

> 등록하지 않고 팀 참가시 출력되는 알림창

### 6-1. 팀 필터

<img src="https://firebasestorage.googleapis.com/v0/b/your-stat.appspot.com/o/10-1.%20%E1%84%90%E1%85%B5%E1%86%B7%20%E1%84%91%E1%85%B5%E1%86%AF%E1%84%90%E1%85%A5%20%E1%84%83%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%8B%E1%85%A5%E1%86%AF%E1%84%85%E1%85%A9%E1%84%80%E1%85%B3.png?alt=media&token=1e9caa0a-d00a-4933-967d-387778a95b23"/>

팀 리스트들 중에서 원하는 팀 종류만 볼 수 있도록 해준다.  
현재 보고 있는 팀 구하기 페이지의 [플랫폼]과 다이얼로그의 [게임 유형]에 따라 [게임 모드]에 출력되는 값이 달라진다.

> 카카오/랭크는 3인칭과 스쿼드 밖에 없어서 스쿼드만 나오고
> 스팀/랭크는 1인칭과 3인칭이 있어서 1인칭 스쿼드, 스쿼드가 나오는 식으로 변동됨

### 6-2. 팀 만들기

<img src="https://firebasestorage.googleapis.com/v0/b/your-stat.appspot.com/o/10-2.%20%E1%84%90%E1%85%B5%E1%86%B7%20%E1%84%86%E1%85%A1%E1%86%AB%E1%84%83%E1%85%B3%E1%86%AF%E1%84%80%E1%85%B5%20%E1%84%83%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%8B%E1%85%A5%E1%86%AF%E1%84%85%E1%85%A9%E1%84%80%E1%85%B3.png?alt=media&token=b4bf64c3-a39f-4daa-acb2-864537acae0a"/>

6-1과 마찬가지로 [게임 모드]는 현재 페이지의 [플랫폼]과 [게임 유형]에 따라 출력되는 값이 달라진다.  
[내 정보]에 닉네임을 등록하지 않으면 만들 수 없다.

#### **팀 생성 시**

<img src="https://firebasestorage.googleapis.com/v0/b/your-stat.appspot.com/o/11-0.%20%E1%84%90%E1%85%B5%E1%86%B7%20%E1%84%86%E1%85%A1%E1%86%AB%E1%84%83%E1%85%B3%E1%86%AB%20%E1%84%92%E1%85%AE%20%E1%84%90%E1%85%B5%E1%86%B7%20%E1%84%8B%E1%85%B5%E1%84%83%E1%85%A9%E1%86%BC.png?alt=media&token=d02148ab-0561-498d-8719-89afd9e7c93c"/>

정상적으로 팀 만들기가 성공하면 바로 팀 채팅 화면으로 이동된다.

## 7. 팀 참가하기

<img src="https://firebasestorage.googleapis.com/v0/b/your-stat.appspot.com/o/11-1.%20%E1%84%90%E1%85%B5%E1%86%B7%20%E1%84%8E%E1%85%A2%E1%84%90%E1%85%B5%E1%86%BC.png?alt=media&token=ab5d5abf-c0dc-45dd-9e3d-8103a153987a"/>

만들어진 팀에 정상적으로 참여시 입장했다는 문구가 출력된다.  
왼쪽에는 현재 팀에 접속 중인 멤버를 확인할 수 있다.  
각 멤버 카드에는 [닉네임]과 [스탯 확인], [닉네임 복사] 기능을 제공하는 아이콘이 있다.  
화면에 표시되고 있는 닉네임은 해당 팀의 플랫폼 게임 닉네임이다.

참가한 팀원들끼리 채팅을 할 수 있는 기능이 제공 된다.

### 7-1 랭크팀 참가 시 간략한 스탯 출력

<img src="https://firebasestorage.googleapis.com/v0/b/your-stat.appspot.com/o/11-4.%20%E1%84%85%E1%85%A2%E1%86%BC%E1%84%8F%E1%85%B3%E1%84%90%E1%85%B5%E1%86%B7%E1%84%8B%E1%85%B4%20%E1%84%80%E1%85%A7%E1%86%BC%E1%84%8B%E1%85%AE.png?alt=media&token=13d680b6-7c8f-4b97-b3b1-8bd629a51bc6"/>

참가하는 팀이 랭크 팀인 경우 [내 정보]에 닉네임이 등록되어 있고, 파이어베이스에 저장된 스탯이 있으면 팀 참가 시 간략하게 스탯 정보룔 출력해준다.

만약 닉네임은 등록되어 있는데 파이어베이스에 갱신된 데이터가 없으면 아래와 같이 출력된다.

<img src="https://firebasestorage.googleapis.com/v0/b/your-stat.appspot.com/o/11-6.%20%E1%84%85%E1%85%A2%E1%86%BC%E1%84%8F%E1%85%B3%E1%84%90%E1%85%B5%E1%86%B7%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%83%E1%85%A6%20%E1%84%89%E1%85%B3%E1%84%90%E1%85%A2%E1%86%BA%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%8B%E1%85%B3%E1%86%AF%20%E1%84%80%E1%85%A7%E1%86%BC%E1%84%8B%E1%85%AE.png?alt=media&token=a680244c-02a0-4db4-9013-7ea8dfa846c5"/>

### 7-2. 스탯 확인 기능

멤버 카드에서 [스탯 확인] 아이콘을 클릭 시, 해당 닉네임을 토대로 파이어베이스에 저장된 스탯 정보를 가져와서 보여준다.

#### **없을 경우**

<img src="https://firebasestorage.googleapis.com/v0/b/your-stat.appspot.com/o/11-3.%20%E1%84%90%E1%85%B5%E1%86%B7%E1%84%8B%E1%85%AF%E1%86%AB%20%E1%84%89%E1%85%B3%E1%84%90%E1%85%A2%E1%86%BA%20%E1%84%92%E1%85%AA%E1%86%A8%E1%84%8B%E1%85%B5%E1%86%AB%20-%20%E1%84%8B%E1%85%A5%E1%86%B9%E1%84%82%E1%85%B3%E1%86%AB%20%E1%84%80%E1%85%A7%E1%86%BC%E1%84%8B%E1%85%AE.png?alt=media&token=6d905df3-468d-4362-8620-a87029a40ef3"/>

#### **있을 경우**

<img src="https://firebasestorage.googleapis.com/v0/b/your-stat.appspot.com/o/11-5.%20%E1%84%90%E1%85%B5%E1%86%B7%E1%84%8B%E1%85%AF%E1%86%AB%20%E1%84%89%E1%85%B3%E1%84%90%E1%85%A2%E1%86%BA%20%E1%84%92%E1%85%AA%E1%86%A8%E1%84%8B%E1%85%B5%E1%86%AB%20-%20%E1%84%8B%E1%85%B5%E1%86%BB%E1%84%82%E1%85%B3%E1%86%AB%20%E1%84%80%E1%85%A7%E1%86%BC%E1%84%8B%E1%85%AE.png?alt=media&token=97888d84-56fe-4a77-9d80-b33c333e616c"/>

### 7-3. 닉네임 복사

<img src="https://firebasestorage.googleapis.com/v0/b/your-stat.appspot.com/o/11-2.%20%E1%84%90%E1%85%B5%E1%86%B7%E1%84%8B%E1%85%AF%E1%86%AB%20%E1%84%82%E1%85%B5%E1%86%A8%E1%84%82%E1%85%A6%E1%84%8B%E1%85%B5%E1%86%B7%20%E1%84%87%E1%85%A9%E1%86%A8%E1%84%89%E1%85%A1.png?alt=media&token=3179d453-9802-4069-a1b3-ae78fe7c0697"/>

멤버 카드에서 [닉네임 복사] 아이콘을 클릭 시, 해당 닉네임이 클립보드에 저장이 된다.  
복사가 되면 인게임에서 붙여넣기로 빠른 초대를 할 수 있다.
