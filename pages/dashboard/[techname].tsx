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
import { signOut, useSession } from "next-auth/react";

type needDataType = {
  tchlgyIndcprDtl: String;
  dmdtchNm: String;
  tpDmandCdNm: String;
  buyKindNm: String;
  tcntrnFxamtTchfee: String;
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
  DT: string;
  PRD_SE?: string;
  C1?: string;
  C1_NM: string;
};

export default function DashBoard() {
  const [tData, setTdata] = useState<ChartData<"bar", Number[], String>>({
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

  const { data: session, status } = useSession();
  const loading = status === "loading";

  const router = useRouter();

  function dataTest() {
    fetch("../api/kosis")
      .then((res) => res.json())
      .then((json) => {
        return json.result;
      })
      .then((dat: testType[]) => {
        let data2018: testType[] = [];
        let data2019: testType[] = [];
        let data2020: testType[] = [];

        dat.map((ele) => {
          if (ele.PRD_DE === "2018") {
            data2018.push(ele);
          } else if (ele.PRD_DE === "2019") {
            data2019.push(ele);
          } else if (ele.PRD_DE === "2020") {
            data2020.push(ele);
          }
        });

        let label: String[] = data2018.map((ele) => ele?.C1_NM);

        let dt2018 = data2018.map((ele) => parseInt(ele.DT?.toString()));
        let dt2019 = data2019.map((ele) => parseInt(ele.DT?.toString()));
        let dt2020 = data2020.map((ele) => parseInt(ele.DT?.toString()));

        setTdata({
          labels: label,
          datasets: [
            {
              type: "bar",
              label: "2018 (억원)",
              hoverBorderColor: "purple",
              borderColor: "pink",
              borderWidth: 2,
              data: [...dt2018],
              hidden: true,
            },
            {
              type: "bar",
              label: "2019 (억원)",
              hoverBorderColor: "purple",
              borderColor: "green",
              borderWidth: 2,
              data: [...dt2019],
              hidden: true,
            },
            {
              type: "bar",
              label: "2020 (억원)",
              hoverBorderColor: "purple",
              borderColor: "rgb(000,153,255)",
              borderWidth: 2,
              data: [...dt2020],
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
    fetch("../api/makelog", {
      method: "POST",
      body: session?.user?.email,
    });

    dataTest();
    dataTest2();
    dataTest3();
    dataTest4();
  }, []);

  parseInt("string"?.toString());

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
              <span className="text-white text-lg font-bold">시장 상황</span>
              <MCharts data={mData}></MCharts>
            </div>
            <div>
              <span className="text-white text-lg font-bold">수요 상황</span>
              <MCharts data={nData}></MCharts>
            </div>
          </div>
          <div className="h-[40%] rounded-xl w-[50%] flex flex-col space-y-12">
            <div>
              <span className="text-white text-lg font-bold">
                2018-20 분야별 3년간 연구개발 통계
              </span>
              <MCharts data={tData}></MCharts>
            </div>
            <div>
              <span className="text-white text-lg font-bold">수요 지역</span>
              <MCharts data={nData2}></MCharts>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
