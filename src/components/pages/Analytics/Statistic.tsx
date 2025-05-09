import Chart from "chart.js/auto";
import "chartjs-adapter-date-fns";
import { useEffect, useRef } from "react";
import { StatisticCard } from "./StatisticCard";
import { Typography } from "@/components/core/Typography";

export interface StatisticProps {
  data: {
    title: string;
    time: string;
    value: string;
    percentage: string;
    black?: boolean;
    expanded?: boolean;
  }[];
  chartData: {
    date: string;
    users: number;
  }[];
  timeframe: string;
  color?: string;
  title?: string;
  subTitle?: string;
}

export function Statistic({
  data,
  chartData,
  timeframe,
  title = "User Statistics",
  subTitle = "Total Users",
  color = "#FF7125",
}: StatisticProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        chartInstance.current && chartInstance.current.destroy();

        const displayedDates = ["01.09", "07.09", "14.09", "21.09", "28.09"];

        chartInstance.current = new Chart(ctx, {
          type: "line",
          data: {
            labels: displayedDates,
            datasets: [
              {
                label: "User Growth",
                data: chartData.map((item) => ({
                  x: item.date as unknown as number,
                  y: item.users,
                })),
                fill: true,
                borderColor: color,
                backgroundColor: (context) => {
                  const chart = context.chart;
                  const { ctx, chartArea } = chart;
                  if (!chartArea) return;
                  const gradient = ctx.createLinearGradient(
                    chartArea.right,
                    chartArea.bottom,
                    chartArea.right * 0.75,
                    chartArea.top
                  );
                  gradient.addColorStop(0, `${color}00`);
                  gradient.addColorStop(1, `${color}1A`);
                  return gradient;
                },
                tension: 0,
                pointBackgroundColor: "transparent",
                pointBorderColor: "transparent",
              },
            ],
          },
          options: {
            responsive: true,
            scales: {
              x: {
                type: "time",
                time: {
                  unit: "day",
                  displayFormats: {
                    day: "dd.MM",
                  },
                  parser: "dd.MM",
                },
                ticks: {
                  source: "labels",
                },
                grid: {
                  display: false,
                },
                border: {
                  dash: [8, 4],
                  color: "#0000001A",
                },
              },
              y: {
                beginAtZero: true,
                max: 10000,
                ticks: {
                  stepSize: 5000,
                },
                grid: {
                  tickBorderDash: [10, 10],
                  tickBorderDashOffset: 10,
                  tickLength: 10,
                },
                border: {
                  dash: [8, 4],
                  color: "#0000001A",
                },
              },
            },
            plugins: {
              legend: {
                display: false,
              },
            },
          },
        });
      }
    }

    return () => {
      chartInstance.current && chartInstance.current.destroy();
    };
  }, [timeframe]);

  return (
    <div className="p-8 border border-[#0000001A] rounded-[12px] grid grid-cols-2 gap-12 mob:grid-cols-1">
      <div className="flex flex-col gap-6">
        <Typography variant="24px/800/32.78px" className="text-black-2">
          {title}
        </Typography>
        <div className="flex-1 gap-4 h-full grid grid-cols-2">
          {data.map((item, index) => (
            <StatisticCard key={index} {...item} />
          ))}
        </div>
      </div>
      <div className="grid gap-4 ">
        <Typography variant="16px/700/21.86px" className="text-black-4">
          {subTitle}
        </Typography>
        <div className="grid gap-4">
          <canvas ref={chartRef} />
        </div>
      </div>
    </div>
  );
}
