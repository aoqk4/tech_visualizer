import type { NextPage } from "next";
import Layout from "../components/Layout";

const Home: NextPage = () => {
  return (
    <div>
      <Layout></Layout>
      <div className="bg-slate-700 w-full h-[100vh] flex justify-evenly items-center">
        <div className="bg-red-600 w-[50%] h-[70%]">Chart 들어갈거임</div>
        <div className="w-[30%] h-[70%] flex justify-center items-end">
          <button className="bg-blue-600 w-[30%] h-[10%] rounded-lg text-2xl font-mono font-extrabold text-white mb-8">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
