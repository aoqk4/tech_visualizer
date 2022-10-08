import Layout from "../components/Layout";

export default function DashBoard() {
  return (
    <div>
      <Layout></Layout>
      <div className="bg-slate-700 w-full h-[100vh] flex flex-col justify-start items-center space-y-10">
        <div></div>
        <div className="w-[90%] font-mono text-4xl text-white font-bold">
          Dash Board
        </div>
        <div className="h-[80%] w-[90%] flex flex-col">
          <div className="h-[50%] flex justify-between">
            <div className=" w-[50%] rounded-xl border-2">
              <span className="font-bold text-2xl text-white">학술자료</span>
            </div>
            <div className="w-[50%] rounded-xl border-2">
              <span className="font-bold text-2xl text-white">수요자료</span>
            </div>
          </div>
          <div className="h-[50%] rounded-xl border-2">
            <span className="font-bold text-2xl text-white">통계자료</span>
          </div>
        </div>
      </div>
    </div>
  );
}
