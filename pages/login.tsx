import type { NextPage } from "next";
import Link from "next/link";
import Layout from "../components/Layout";
import { signIn, signOut, useSession } from "next-auth/react";

const Login: NextPage = (props) => {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  console.log(status);

  return (
    <div>
      <Layout></Layout>
      <div className="flex justify-center items-center bg-slate-700 w-full h-[100vh] space-x-32 flex-wrap">
        <div className="border-r-2 border-slate-400 flex space-y-10 flex-col justify-center items-center w-[30%] h-[50%]">
          <span className="font-bold text-5xl text-white">로그인</span>
          <span className="font-bold text-5xl text-white">Login</span>
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
          <a
            href={"/api/auth/signin"}
            onClick={(e) => {
              e.preventDefault();
              signIn("google");
            }}
          >
            Google Sign in
          </a>
          <a
            href={"/api/auth/signin"}
            onClick={(e) => {
              e.preventDefault();
              signOut();
            }}
          >
            Google Sign out
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
