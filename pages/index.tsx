import {
  BarElement,
  CategoryScale,
  Chart,
  ChartData,
  LinearScale,
  LineElement,
  PointElement,
} from "chart.js";
import type { NextPage } from "next";
import Link from "next/link";
import { Line } from "react-chartjs-2";
import Layout from "../components/Layout";

const Home: NextPage = () => {
  Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement
  );
  Chart.defaults.color = "#ffffff";

  const data: ChartData<"line", number[], string> = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Dataset 1",
        borderColor: "rgb(54, 162, 235)",
        borderWidth: 2,
        data: [3, 4, 7, 8, 1],
      },
      {
        label: "Dataset 2",
        backgroundColor: "rgb(255, 99, 132)",
        data: [1, 2, 3, 4, 5, 8],
        borderColor: "red",
        borderWidth: 2,
      },
      {
        label: "Dataset 3",
        backgroundColor: "rgb(75, 192, 192)",
        data: [1, 2, 3, 4, 5],
      },
    ],
  };

  return (
    <div>
      <Layout></Layout>
      <div className="bg-slate-700 w-full h-[100vh] flex justify-evenly items-center">
        <div className="w-[50%] h-[70%] text-white  rounded-xl" id="chart">
          <div className="w-full h-full flex justify-center items-center">
            <Line data={data} />
          </div>
        </div>
        <div className=" w-[30%] h-[70%] flex justify-center items-end">
          <Link href={"/signup"}>
            <button className="bg-blue-600 w-[30%] h-[10%] rounded-lg text-2xl font-mono font-extrabold text-white mb-8">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
