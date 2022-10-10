import { useEffect, useState } from "react";
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
  Interaction,
  BarHoverOptions,
  Tooltip,
  Title,
} from "chart.js";
import Link from "next/link";
import { Bar, Line } from "react-chartjs-2";

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

export default function Test() {
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

  Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Legend,
    Tooltip,
    Title
  );

  Chart.defaults.font = {
    family: "Segoe UI",
  };

  const configs: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        position: "top",
      },
      legend: {
        display: true,
        align: "end",
      },
      tooltip: {
        mode: "index",
        intersect: true,
      },
    },
  };

  Chart.defaults.color = "#000000";
  function dataTest() {
    fetch("api/stest")
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
              label: "R&D 투자액 (만원)",
              hoverBorderColor: "purple",
              borderColor: "rgb(54, 162, 235)",
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
    fetch("api/techneeds", {
      method: "POST",
      body: "전기차",
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

        setTest({
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
    // dataTest();
    dataTest2();
  }, []);

  return (
    <div className="">
      <div className="">
        <Bar data={test} options={configs}></Bar>
      </div>
    </div>
  );
}
