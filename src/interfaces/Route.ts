/**
 * 2023-01-23
 * 편리를 위해서 routes.config.ts에 선언된 메뉴들을
 * SideMenu.vue에서 그려주게 만들었었는데
 * 안그리고 싶은 메뉴는 RouteRecordRaw 타입 옵션에서 내가 사용하지 않는 속성 중 props를 사용했었음.
 * 하지만 의미를 파괴하는 것 같아서 별도의 타입(hide)을 추가해서 extend 시켜서 사용함
 * hide: true 옵션을 주면 사이드메뉴에 그려주지 않음
 * SideMenu.vue에서도 type을 import 해야해서 별도의 파일로 분리함
 */
import type { RouteRecordRaw } from 'vue-router';
type customOption = { hide?: boolean };
export type customRouteRecordRaw = RouteRecordRaw & customOption;
