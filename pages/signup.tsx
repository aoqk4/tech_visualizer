import { useState } from "react";
import Layout from "../components/Layout";

const signup = () => {
  const [email, setEmail] = useState(" ");
  const [psd, setPsd] = useState(" ");
  const [nname, setnname] = useState(" ");

  let obj = {
    email,
    psd,
    nname,
    wreq: 1,
  };

  function checkEmail(event: React.ChangeEvent<HTMLInputElement>) {
    if (
      !event.target.value.match(
        "^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"
      )
    ) {
      alert("유효하지 않은 이메일!");
      return;
    }
    fetch("api/signup", {
      method: "POST",
      body: JSON.stringify(obj),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.result?.email) {
          alert("중복된 이메일");
          return;
        }
      });
  }

  function atSubmit() {
    if (!psd || !email) {
      alert("필수 사항을 모두 입력하세요.");
      return;
    } else {
      obj.wreq = 2;
      fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify(obj),
      }).then(() => {
        console.log("회원가입이 완료되었습니다.");
        return;
      });
    }

    return;
  }

  return (
    <div>
      <Layout></Layout>
      <div className="flex items-center justify-center bg-slate-700 w-full h-[100vh]">
        <div className="text-white font-bold font-mono text-4xl space-y-6">
          <div>회원가입</div>
          <div>Sign Up</div>
        </div>
        <form className="flex flex-col justify-center items-center w-[60%] h-[80%] space-y-24">
          <div className="flex flex-col w-[50%] text-4xl text-white space-y-4 ">
            <label>Email *</label>
            <input
              type={"text"}
              className="rounded-md bg-slate-300 text-black"
              onBlur={(event) => checkEmail(event)}
              onChange={(event) => setEmail(event.target.value)}
            ></input>
          </div>
          <div className="flex flex-col w-[50%] text-4xl text-white space-y-4">
            <label>Password *</label>
            <input
              type={"password"}
              className="rounded-md bg-slate-300 text-black"
              onChange={(event) => setPsd(event.target.value)}
            ></input>
          </div>
          <div className="flex flex-col w-[50%] text-4xl text-white space-y-4">
            <label>NickName </label>
            <input
              type={"text"}
              className="rounded-md bg-slate-300 text-black"
              onChange={(event) => setnname(event.target.value)}
            ></input>
          </div>
          <button
            className="w-[50%] bg-indigo-500 text-4xl py-3 font-mono font-bold rounded-md"
            onClick={atSubmit}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default signup;
