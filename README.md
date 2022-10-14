# 기술자료 시각화 서비스

## 목표

사용자가 원하는 기술의 동향과 각종 학술정보들을 시각화하여 전달

## 2022.10.06

- 프로젝트 생성
- `prisma`, `tailwindCSS` 적용

## 2022.10.07

- UI 작업
- 1개 (techNeed) API에서 데이터베이스 올려놓기 성공

## 2022.10.08

- UI 초안 완성
- charts.js 활용하여 title 페이지 그래프

## 2022.10.09

- charts.js 활용 및 legend 활용방법 숙지.
- 국가 통계포털 API 탐색

## 2022.10.10

- 공공데이터 포털에서 dashboard로 차트 뿌리기 성공.
- 이제 데이터 추리고... 선택가능하도록 하자.

## 2022.10.11

- 차트 dashBoard에 넣음

## 2022.10.12

- 선택할 데이터 추리기(후보 : 에너지, 전기차?)

## 2022.10.13

- MarketInfo 데이터는 incates에 contain으로 찾는거로 함.
- 데이터 선택 대신 3년간 연구 추세를 고정으로, 나머지 데이터를 검색으로 찾을 수 있게.
- CSS 약간 수정(제목이나 글자 크기 등등...), 화면설계서 수정
- 논문 API 검색 결과... 한글명이 너무 적다 -> 효용성 떨어짐
- 테스트 페이지 삭제
- 로그인 구현

# 2022.10.14

- 로그인 기능 개선
- vercel에 adapter 추가하니까 기능 자체가 안되서 폐지... log를 클라딴에서 구현해야된다...
- vercel은 null값을 용서치 않는다... -> log에 일단 가데이터를 끌어올까?.... -> 일단 못하는 걸로 하자...
- 설명서용 + 출처용 docs 추가

## 목표.

- 서버에서 로그 내려받을수 있게 vercel에 adapter 추가하게 하기...
