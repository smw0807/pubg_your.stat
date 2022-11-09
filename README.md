# 프로젝트 제목

## PUBG your.stat

배틀그라운드 스탯 상세 정보 검색 사이트

# 만든 이유

현재 서비스 중인 전적검색 사이트들을 많이 이용하면서 내 계정 또는 타인의 계정의 전적보단 스탯을 보려고 검색을 자주 했었다.<br>
사용하면서 좀 더 많은 정보를 보여주면 더 좋을 것 같은데...라는 아쉬움이 조금 있었다.<br>
보여주는 스탯의 정보는 생각보다 적었고, 궁금한 마음에 직접 API에 요청을 해보니 생각보다 제공되는 정보가 많았다.<br>
그래서 좀 더 디테일한 정보를 보고 싶었고 전적보단 스탯의 디테일한 정보를 제공하는 사이트를 직접 만들어보자는 생각이들어 시작하게 되었다.

# 기술 스택

- Vite (https://vitejs.dev/)
- Vue3 (https://vuejs.org/)
- TypeScript (https://www.typescriptlang.org/)
- Pinia (https://pinia.vuejs.org/introduction.html)
- Element Plus (https://element-plus.org/en-US/)
- PUBG API (https://documentation.pubg.com/en/introduction.html)

# 실행 방법

## 1. npm install

## 2. .env 생성

```
### 필요 옵션 ###
# 펍지 API 요청 URL
VITE_PUBG_API_URL=
# 펍지 API 키 (발급 받아야 함)
VITE_PUBG_API_KEY=
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
