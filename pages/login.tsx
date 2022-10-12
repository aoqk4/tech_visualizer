import type { NextPage } from "next";
import Link from "next/link";
import Layout from "../components/Layout";

const Login: NextPage = (props) => {
  return (
    <div>
      <Layout></Layout>
      <div className="flex justify-center items-center bg-slate-700 w-full h-[100vh] space-x-32 flex-wrap">
        <div className="border-r-2 border-slate-400 flex space-y-10 flex-col justify-center items-center w-[30%] h-[50%]">
          <span className="font-bold text-5xl text-white">로그인</span>
          <span className="font-bold text-5xl text-white">Login</span>
          <div>
            <span className="text-slate-300">회원이 아니시라면?</span>{" "}
            <Link href={"/signup"}>
              <span className="text-blue-300 hover:text-blue-500">
                {" "}
                회원가입
              </span>
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-start justify-center w-[30%] h-[50%] space-y-12 ">
          <div className="w-[70%] flex flex-col space-y-2">
            <label className="font-bold text-2xl text-white"> Email </label>
            <input
              type={"text"}
              className="text-4xl bg-slate-300 rounded-lg"
            ></input>
          </div>
          <div className="w-[70%] flex flex-col space-y-2">
            <label className="font-bold text-2xl text-white"> 비밀번호 </label>
            <input
              type={"password"}
              className="text-4xl bg-slate-300 rounded-lg"
            ></input>
          </div>
          <Link href={"/mypage"}>
            <button className="flex items-center justify-center w-[70%] h-[10%] rounded-md bg-blue-400 text-white font-bold text-lg">
              LOGIN
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
