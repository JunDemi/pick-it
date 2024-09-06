import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useQuery } from "@tanstack/react-query";
import { dashboardPopCategory } from "../../../server/firebaseDashBoard";
import { ICharts } from "../../../types/Banner";

function CategoryChart() {
  //리액트 쿼리
  const {
    data: categoryData,
    status,
    error,
  } = useQuery({
    queryKey: ["categoryChartApi"],
    queryFn: dashboardPopCategory,
  });
  //리액트 쿼리 요청이 완료되면 컴포넌트를 리턴
  if (status === "success" && !error && categoryData) {
    //reduce메소드를 사용하여 배열 순회하여 새로운 배열을 반환
    const categoryCounts: ICharts[] = categoryData
      .reduce<ICharts[]>((acc, word) => {
        // 이미 해당 단어가 존재하는지 확인
        const existWord = acc.find((item) => item.name === word);
        //이미 존재하는 데이터 값일 경우 카운트 + 1
        if (existWord) {
          existWord.count += 1;
        } else {
          // 존재하지 않으면 새 객체를 추가
          acc.push({ name: word, count: 1 });
        }
        return acc;
      }, [])
      //카운트 내림차순 정렬 후 7개 데이터만 추출
      .sort((a, b) => b.count - a.count)
      .slice(0, 7);

    //ApexChart옵션 및 시리즈 상수 선언
    const option: ApexOptions = {
      chart: {
        fontFamily: "p_bold",
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
            show: true,
          },
        },
      },
      xaxis: {
        //카테고리: categoryCounts데이터의 검색어
        categories: categoryCounts.map((data) => {
          return "#" + data.name;
        }),
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
          show: true,
        },
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
      //차트: categoryCounts데이터의 검색 횟수
      {
        name: "태그 개수",
        data: categoryCounts.map((data) => {
          return data.count;
        }),
      },
    ];

    return (
      <ReactApexChart
        type="bar"
        options={option}
        series={series}
        width={"160%"}
        height={320}
      />
    );
  } else {
    return null;
  }
}
export default CategoryChart;
