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

type ChartType = {
  data: ChartData<"bar", Number[], String>;
};

export default function MCharts(props: ChartType) {
  Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Legend,
    Tooltip
  );
  const configs: ChartOptions = {
    responsive: true,
    plugins: {
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

  Chart.defaults.color = "#ffffff";

  return <Bar data={props.data} options={configs}></Bar>;
}
