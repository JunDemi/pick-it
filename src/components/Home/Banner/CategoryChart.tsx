import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

function CategoryChart() {
    return(
        <ReactApexChart
            type="bar"
            options={option}
            series={series}
            width={"160%"}
            height={320}
        />
    );
}
export default CategoryChart;

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
      enabled: true,
    },
    legend: {
      show: false,
    },
    grid: {
      borderColor: "#c8c8c8",
      xaxis: {
        lines: {
          show: true
        }
    },
    },
    xaxis: {
      categories: ["#아이돌", "#음식", "#유튜버", "#축구", "#디저트", "#힙합", "#맛집"],
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
      tickAmount: 5,
    },
    yaxis: {
        reversed: true,
      labels: {
        show: true,
      },
      axisTicks: {
        show: true
      }
    },
    tooltip: {
      y: {
        formatter: function (val: number) {
          return val + "개";
        },
      },
    },
  };

  const series = [
    {
      name: "게임 개수",
      data: [
        50, 40, 36, 29, 24, 16, 10
      ],
    },
  ];