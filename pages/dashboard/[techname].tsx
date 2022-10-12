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

type mDataType = {
  tcateNames: String;
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
    labels: [""],
    datasets: [
      {
        type: "bar",
        label: "",
        backgroundColor: "rgb(75, 192, 192)",
        data: [0],
      },
    ],
  });
  const [nData, setnData] = useState<ChartData<"bar", Number[], String>>({
    labels: [""],
    datasets: [
      {
        type: "bar",
        label: "",
        backgroundColor: "rgb(75, 192, 192)",
        data: [0],
      },
    ],
  });

  const [nData2, setnData2] = useState<ChartData<"bar", Number[], String>>({
    labels: [""],
    datasets: [
      {
        type: "bar",
        label: "",
        backgroundColor: "rgb(75, 192, 192)",
        data: [0],
      },
    ],
  });

  const [mData, setmData] = useState<ChartData<"bar", Number[], String>>({
    labels: [""],
    datasets: [
      {
        type: "bar",
        label: "",
        backgroundColor: "rgb(75, 192, 192)",
        data: [0],
      },
    ],
  });

  const router = useRouter();

  function dataTest() {
    fetch("../api/stest")
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
    fetch("../api/techneeds", {
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
    fetch("../api/techneeds", {
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

  function dataTest4() {
    fetch("../api/techmarketinfo", {
      method: "POST",
      body: router.query.techname?.toString(),
    })
      .then((res) => res.json())
      .then((json) => {
        return json.result;
      })
      .then((result: mDataType[]) => {
        return result;
      })
      .then((arr: mDataType[]) => {
        let farr = arr.map((ele) => ele.tcateNames);

        const set = new Set(farr);

        const label = Array.from(set);

        let cnt: Number[] = [];

        for (let i = 0; i < label.length; i++) {
          cnt.push(farr.filter((ele) => ele === label[i]).length);
        }

        setmData({
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
    dataTest4();
  }, []);

  return (
    <div>
      <Layout></Layout>
      <div className="bg-slate-700 w-full h-[150vh] flex flex-col justify-start items-center space-y-10 flex-wrap">
        <div></div>
        <div className="w-[90%] font-mono text-4xl text-white font-bold">
          {router.query.techname?.toString()}
        </div>
        <div className="h-[80%] w-[90%] flex justify-evenly space-x-14">
          <div className="h-[40%] rounded-xl w-[50%] space-y-12 ">
            <div>
              <span className="text-white text-lg">시장</span>
              <MCharts data={mData}></MCharts>
            </div>
            <div>
              <span className="text-white text-lg">수요</span>
              <MCharts data={nData}></MCharts>
            </div>
          </div>
          <div className="h-[40%] rounded-xl w-[50%] flex flex-col space-y-12">
            <div>
              <span className="text-white text-lg">통계(R&D OR 매출액)</span>
              <MCharts data={test}></MCharts>
            </div>
            <div>
              <span className="text-white text-lg">수요 지역</span>
              <MCharts data={nData2}></MCharts>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
