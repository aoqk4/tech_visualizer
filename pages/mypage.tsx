import { useState } from "react";
import Layout from "../components/Layout";
import Link from "next/dist/client/link";

export default function MyPage() {
  const [stat, setStat] = useState(1);
  const [sreq, setSreq] = useState("");

  return (
    <div>
      <Layout></Layout>
      <div className="bg-slate-700 w-full h-[100vh] flex space-x-6 justify-center items-center">
        <div className="h-[80%] w-[15%] border-2 rounded-2xl flex text-white font-bold text-lg flex-col justify-around">
          <div className="flex justify-center text-3xl">My Page</div>
          <button className="text-2xl" onClick={() => setStat(1)}>
            회원 정보
          </button>
          <button className="text-2xl" onClick={() => setStat(2)}>
            이용 내역
          </button>
          <button className="text-2xl" onClick={() => setStat(3)}>
            서비스 신청
          </button>
          <button className="text-2xl">로그아웃</button>
        </div>
        <div className="w-[75%] h-[80%] border-2 rounded-2xl flex justify-center items-center">
          {stat === 1 && (
            <div className="flex flex-col w-[90%] h-[90%] items-center space-y-32">
              <div className="text-4xl font-mono font-bold text-white">
                회원정보
              </div>
              <div className="w-[70%] h-[50%] flex flex-col justify-around">
                <label className="text-3xl font-mono font-bold text-white">
                  Email
                </label>
                <div className="text-2xl font-mono font-bold text-white">
                  이메일 나올 곳
                </div>
                <label className="text-3xl font-mono font-bold text-white">
                  NickName
                </label>
                <div className="text-2xl font-mono font-bold text-white">
                  닉넴 나올 곳
                </div>
              </div>
            </div>
          )}
          {stat === 2 && (
            <div className="flex flex-col w-[90%] h-[90%] items-center space-y-32">
              <div className="text-4xl font-mono font-bold text-white">
                이용내역
              </div>
              <div className="w-full h-[70%] flex justify-center items-center">
                이용내역 나올 자리
              </div>
            </div>
          )}
          {stat === 3 && (
            <div className="flex flex-col w-[90%] h-[90%] items-center space-y-24">
              <div className="text-4xl font-mono font-bold text-white">
                서비스 신청
              </div>
              <div className="w-full h-[80%] flex flex-col items-center justify-around text-white text-3xl font-bold">
                <div className="w-full flex justify-center space-x-8 ">
                  <label>신청 기술</label>
                  <select
                    className="w-[60%] text-slate-800"
                    onChange={(e) => setSreq(e.currentTarget.value)}
                  >
                    <option value={"에너지"}>에너지</option>
                    <option value={"반도체"}>반도체</option>
                    <option value={"블록체인"}>블록체인</option>
                    <option value={"ICT"}>ICT</option>
                    <option value={"융합"}>융합</option>
                    <option value={"분석"}>분석</option>
                  </select>
                </div>
                <Link href={`/dashboard/${sreq}`}>
                  <button className="bg-neutral-600 p-3 rounded-lg">
                    서비스 신청
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
