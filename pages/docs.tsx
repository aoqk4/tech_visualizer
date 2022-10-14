import { useState } from "react";
import Layout from "../components/Layout";

export default function Docs() {
  const [idx, setIdx] = useState(0);

  return (
    <div className="bg-slate-700 w-full h-[100vh] space-y-28">
      <Layout></Layout>
      <div className="flex justify-center">
        <ul>
          <li className="font-bold text-mono text-3xl text-white">
            서비스 이용 방법
          </li>
        </ul>
      </div>
      <div className="flex justify-center text-white">
        로그인 후{" "}
        <span className="font-bold mx-2 text-blue-200 hover:text-blue-600">
          <a href="/login" target="_blank">
            #서비스신청{" "}
          </a>
        </span>{" "}
        버튼 클릭 & 검색을 원하는 기술명을 입력합니다.
      </div>
      <div className="flex justify-center">
        <ul>
          <li className="font-bold text-mono text-3xl text-white">차트 설명</li>
        </ul>
      </div>
      <div className="flex justify-center text-white text-2xl">
        <ul className="flex justify-evenly w-full font-bold">
          <button
            className="text-blue-200 hover:text-blue-600"
            onClick={() => {
              setIdx(1);
            }}
          >
            #시장상황
          </button>
          <button
            className="text-blue-200 hover:text-blue-600"
            onClick={() => {
              setIdx(2);
            }}
          >
            #2018-20 분야별 3년간 연구개발 통계
          </button>
          <button
            className="text-blue-200 hover:text-blue-600"
            onClick={() => {
              setIdx(3);
            }}
          >
            #수요 상황
          </button>
          <button
            onClick={() => {
              setIdx(4);
            }}
            className="text-blue-200 hover:text-blue-600"
          >
            #수요 지역
          </button>
        </ul>
      </div>

      {idx === 1 && (
        <div className="text-lg">
          <div className="text-white flex justify-center">
            한국산업기술진흥원 기술은행 기술시장정보 및 부가정보 DB서비스
            (2022-09-28 기준) 에 근거한 지표입니다.
          </div>
          <div className="text-white flex justify-center mt-2">
            입력한 기술 키워드에 따라 기술은행의 시장 상황이 각 분류 별 개수로
            주어집니다.
          </div>
        </div>
      )}
      {idx === 2 && (
        <div className="text-lg">
          <div className="text-white flex justify-center">
            국가과학기술표준분류 연구분야별 집행 추이 (국가연구개발사업통계,
            과학기술정보통신부 2018~2020) 에 근거한 지표입니다.
          </div>
          <div className="text-white flex justify-center mt-2">
            연구 분야별로 3년간 연구에 집행 되었던 예산액이 주어집니다.
          </div>
        </div>
      )}
      {idx === 3 && (
        <div className="text-lg">
          <div className="text-white flex justify-center">
            한국산업기술진흥원 기술은행 수요기술 조회 서비스 (2022-09-28 기준)에
            근거한 지표입니다.
          </div>
          <div className="text-white flex justify-center mt-2">
            입력한 기술 키워드에 따라 기술은행에 수집된 수요정보가 각 분류별
            개수로 주어집니다.
          </div>
        </div>
      )}
      {idx === 4 && (
        <div className="text-lg">
          <div className="text-white flex justify-center">
            한국산업기술진흥원 기술은행 수요기술 조회 서비스 (2022-09-28 기준)에
            근거한 지표입니다.
          </div>
          <div className="text-white flex justify-center mt-2">
            입력한 기술 키워드에 따라 기술은행에 수집된 수요 지역이 주어집니다.
          </div>
        </div>
      )}
    </div>
  );
}
