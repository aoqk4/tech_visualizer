import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Link from "next/dist/client/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function MyPage() {
  const [stat, setStat] = useState(1);
  const [sreq, setSreq] = useState("");

  const { data: session, status } = useSession();
  const loading = status === "loading";
  // console.log(Date());

  const router = useRouter();

  useEffect(() => {
    if (!session) {
      console.log(session);
      router.push("/");
    }
  }, []);

  return (
    <div>
      <Layout></Layout>
      <div className="bg-slate-700 w-full h-[100vh] flex space-x-6 justify-center items-center">
        <div className="h-[80%] w-[15%] border-2 rounded-2xl flex text-white font-bold text-lg flex-col justify-around">
          <div className="flex justify-center text-3xl">My Page</div>
          <button className="text-2xl" onClick={() => setStat(1)}>
            회원 정보
          </button>
          <button
            className="text-2xl"
            onClick={() => {
              alert("준비중입니다.");
              setStat(1);
            }}
          >
            이용 내역
          </button>
          <button className="text-2xl" onClick={() => setStat(3)}>
            서비스 신청
          </button>
          <a
            className="text-2xl flex justify-center"
            href={"/api/auth/signin"}
            onClick={(e) => {
              e.preventDefault();
              signOut();
            }}
          >
            로그아웃
          </a>
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
                  <div className="pt-8">{session?.user?.email}</div>
                </label>
                <div className="text-2xl font-mono font-bold text-white"></div>
                <label className="text-3xl font-mono font-bold text-white">
                  NickName
                  <div className="pt-8">{session?.user?.name}</div>
                </label>
                <div className="text-2xl font-mono font-bold text-white"></div>
              </div>
            </div>
          )}
          {stat === 2 && (
            <div className="flex flex-col w-[90%] h-[90%] items-center space-y-32">
              <div className="text-4xl font-mono font-bold text-white">
                이용내역
              </div>
              <div className="w-full h-[70%] flex justify-center items-center"></div>
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
                  <input
                    type={"text"}
                    onChange={(e) => setSreq(e.target.value)}
                    className="text-slate-800"
                  ></input>
                </div>
                <Link href={`/dashboard/${sreq ? sreq : "기술"}`}>
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
