import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

function SearchChart() {
    return(
        <ReactApexChart
            type="bar"
            options={option}
            series={series}
            width={"120%"}
            height={320}
        />
    );
}
export default SearchChart;

const option: ApexOptions = {
    chart: {
    fontFamily: 'p_bold',
      offsetY: 0,
      type: "bar" as "bar",
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 2,
        horizontal: true,
        distributed: true,
        barHeight: "70%",
      },
    },
    colors: ["#000"],
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    grid: {
      show: true,
      borderColor: "#c8c8c8",
    },
    xaxis: {
      categories: ["강아지", "가수", "여행지", "롤", "음식", "치킨", "영화", "게임", "유튜버", "아이돌"],
      labels: {
        formatter: function (val: string) {
          return val;
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      min: 0,
      tickAmount: 3,
    },
    yaxis: {
      labels: {
        show: true,
      },
    },
    tooltip: {
      y: {
        formatter: function (val: number) {
          return val + "회";
        },
      },
    },
  };

  const series = [
    {
      name: "검색 횟수",
      data: [
        230, 400, 600, 620, 700, 750, 900, 950, 1200, 1500
      ],
    },
  ];