/**
 * vue 파일에서 함수들을 만들다 보니 불필요하게 소스가 길어지는 느낌도 있고,
 * 다른 곳에서도 사용할 수도 있을 것 같은 함수들을 빼기 위해 이 디렉터리를 만들었음.
 * https://v3-docs.vuejs-korea.org/guide/reusability/composables.html
 * vue3에서 궈장하는 컴포저블 방식을 참고한건데
 * 디렉토리 명을 composables로 하기엔 너무 길기도 하고 위 링크에서 말하는 의도와 조금 달라서 그냥 utils로 지정함...
 * 그리고 앞에 use를 붙여서 카멜케이스 방식의 작명이 관례라곤 하지만 이건 제외했음.
 */
export { normalStat, rankStat } from './CreatedStat';
export { changeSeconds } from './Date';
export { meterToKm } from './Distance';
export { errorCode } from './Error';
export { _429, player404 } from './Notification';
export { insertComma } from './Number';
export { normalStatData, rankStatData } from './Sample';
export { setSeason, searchPlayer } from './Search';
