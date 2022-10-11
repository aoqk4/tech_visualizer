import Layout from "../../components/Layout";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  BarElement,
  CategoryScale,
  Chart,
  ChartData,
  LinearScale,
  LineElement,
  PointElement,
  ChartOptions,
  Legend,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import MCharts from "../../components/MChart";

type needDataType = {
  tchlgyIndcprDtl: String;
  dmdtchNm: String;
  tpDmandCdNm: String;
  buyKindNm: String;
};

type testType = {
  TBL_NM?: string;
  PRD_DE?: string;
  TBL_ID?: string;
  ITM_NM?: string;
  ITM_ID?: string;
  ORG_ID?: string;
  UNIT_NM?: string;
  UNIT_NM_ENG?: string;
  C1_OBJ_NM?: string;
  DT?: string;
  PRD_SE?: string;
  C1?: string;
  C1_NM?: string;
};

export default function DashBoard() {
  const [test, setTest] = useState<ChartData<"bar", Number[], String>>({
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        type: "bar",
        label: "Dataset 1",
        borderColor: "rgb(54, 162, 235)",
        borderWidth: 2,
        data: [3, 4, 7, 8, 1],
      },
      {
        type: "bar",
        label: "Dataset 2",
        backgroundColor: "rgb(255, 99, 132)",
        data: [1, 2, 3, 4, 5, 8],
        borderColor: "red",
        borderWidth: 2,
      },
      {
        type: "bar",
        label: "Dataset 3",
        backgroundColor: "rgb(75, 192, 192)",
        data: [1, 2, 3, 4, 5],
      },
    ],
  });
  const [nData, setnData] = useState<ChartData<"bar", Number[], String>>({
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        type: "bar",
        label: "Dataset 1",
        borderColor: "rgb(54, 162, 235)",
        borderWidth: 2,
        data: [3, 4, 7, 8, 1],
      },
      {
        type: "bar",
        label: "Dataset 2",
        backgroundColor: "rgb(255, 99, 132)",
        data: [1, 2, 3, 4, 5, 8],
        borderColor: "red",
        borderWidth: 2,
      },
      {
        type: "bar",
        label: "Dataset 3",
        backgroundColor: "rgb(75, 192, 192)",
        data: [1, 2, 3, 4, 5],
      },
    ],
  });

  const [nData2, setnData2] = useState<ChartData<"bar", Number[], String>>({
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        type: "bar",
        label: "Dataset 1",
        borderColor: "rgb(54, 162, 235)",
        borderWidth: 2,
        data: [3, 4, 7, 8, 1],
      },
      {
        type: "bar",
        label: "Dataset 2",
        backgroundColor: "rgb(255, 99, 132)",
        data: [1, 2, 3, 4, 5, 8],
        borderColor: "red",
        borderWidth: 2,
      },
      {
        type: "bar",
        label: "Dataset 3",
        backgroundColor: "rgb(75, 192, 192)",
        data: [1, 2, 3, 4, 5],
      },
    ],
  });

  const router = useRouter();

  function dataTest() {
    fetch("http://localhost:3000/api/stest")
      .then((res) => res.json())
      .then((json) => {
        return json.result;
      })
      .then((dat: testType[]) => {
        setTest({
          labels: [
            dat[5].C1_NM || "정보없음",
            dat[7].C1_NM || "정보없음",
            dat[9].C1_NM || "정보없음",
            dat[11].C1_NM || "정보없음",
            dat[15].C1_NM || "정보없음",
          ],
          datasets: [
            {
              type: "bar",
              label: "R&D 투자액 (백만원)",
              hoverBorderColor: "purple",
              borderColor: "green",
              borderWidth: 2,
              data: [
                parseInt(dat[5].DT || "0"),
                parseInt(dat[7].DT || "0"),
                parseInt(dat[9].DT || "0"),
                parseInt(dat[11].DT || "0"),
                parseInt(dat[15].DT || "0"),
              ],
            },
          ],
        });
      });
  }

  function dataTest2() {
    fetch("http://localhost:3000/api/techneeds", {
      method: "POST",
      body: router.query.techname?.toString(),
    })
      .then((res) => res.json())
      .then((json) => {
        return json.result;
      })
      .then((result: needDataType[]) => {
        return result;
      })
      .then((arr: needDataType[]) => {
        let farr = arr.map((ele) => ele.tchlgyIndcprDtl);

        const set = new Set(farr);

        const label = Array.from(set);

        let cnt: Number[] = [];

        for (let i = 0; i < label.length; i++) {
          cnt.push(farr.filter((ele) => ele === label[i]).length);
        }

        setnData({
          labels: label,
          datasets: [
            {
              type: "bar",
              label: "개",
              hoverBorderColor: "purple",
              borderColor: "rgb(54, 162, 235)",
              borderWidth: 2,
              data: [...cnt],
            },
          ],
        });
      });
  }

  function dataTest3() {
    fetch("http://localhost:3000/api/techneeds", {
      method: "POST",
      body: router.query.techname?.toString(),
    })
      .then((res) => res.json())
      .then((json) => {
        return json.result;
      })
      .then((result: needDataType[]) => {
        return result;
      })
      .then((arr: needDataType[]) => {
        let farr = arr.map((ele) => ele.tpDmandCdNm);

        const set = new Set(farr);

        const label = Array.from(set);

        let cnt: Number[] = [];

        for (let i = 0; i < label.length; i++) {
          cnt.push(farr.filter((ele) => ele === label[i]).length);
        }

        setnData2({
          labels: label,
          datasets: [
            {
              type: "bar",
              label: "개",
              hoverBorderColor: "purple",
              borderColor: "rgb(54, 162, 235)",
              borderWidth: 2,
              data: [...cnt],
            },
          ],
        });
      });
  }

  useEffect(() => {
    dataTest();
    dataTest2();
    dataTest3();
  }, []);

  return (
    <div>
      <Layout></Layout>
      <div className="bg-slate-700 w-full h-[200vh] flex flex-col justify-start items-center space-y-10">
        <div></div>
        <div className="w-[90%] font-mono text-4xl text-white font-bold">
          Dash Board
        </div>
        <div className="h-[80%] w-[90%] flex flex-col space-y-56">
          <div className="h-[40%] rounded-xl">
            <span className="text-white font-bold text-lg">
              연구 투자 (R&D){" "}
            </span>
            <MCharts data={test}></MCharts>
          </div>
          <div className="h-[40%] rounded-xl flex space-x-10 justify-evenly">
            <div className="w-[40%]">
              <MCharts data={nData}></MCharts>
            </div>
            <div className="w-[40%]">
              <MCharts data={nData2}></MCharts>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
