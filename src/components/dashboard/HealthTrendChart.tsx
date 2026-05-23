"use client";

import { useState } from "react";

const weeklyData = [
  { height: 113.59, color: "#9CF49C", label: "Sen" },
  { height: 184.59, color: "#2E7D32", label: "Sel" },
  { height: 142, color: "#9CF49C", label: "Rab" },
  { height: 241.39, color: "#2E7D32", label: "Kam" },
  { height: 170.39, color: "#9CF49C", label: "Jum" },
  { height: 213, color: "#2E7D32", label: "Sab" },
  { height: 255.59, color: "#9CF49C", label: "Min" },
];

const monthlyData = [
  { height: 90, color: "#9CF49C", label: "Jan" },
  { height: 155, color: "#2E7D32", label: "Feb" },
  { height: 200, color: "#9CF49C", label: "Mar" },
  { height: 130, color: "#2E7D32", label: "Apr" },
  { height: 240, color: "#9CF49C", label: "Mei" },
  { height: 175, color: "#2E7D32", label: "Jun" },
  { height: 255, color: "#9CF49C", label: "Jul" },
];

export default function HealthTrendChart() {
  const [period, setPeriod] = useState<"weekly" | "monthly">("monthly");
  const data = period === "weekly" ? weeklyData : monthlyData;
  const maxHeight = 260;

  return (
    <div
      className="bg-white rounded-[20px] p-8 flex flex-col gap-8"
      style={{
        border: "1px solid rgba(13, 99, 27, 0.05)",
        boxShadow: "0px 4px 20px 0px rgba(13, 99, 27, 0.05)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3
            className="text-[24px] font-semibold leading-[33.6px] text-[#181D17]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Tren Kesehatan
          </h3>
          <p className="text-[16px] font-normal text-[#40493D] leading-[25.6px]">
            Ringkasan data 7 hari terakhir
          </p>
        </div>

        {/* Period Toggle */}
        <div className="flex gap-2">
          <button
            onClick={() => setPeriod("weekly")}
            className={`px-4 py-[7px] rounded-full text-[12px] font-medium leading-[14.4px] transition-colors ${
              period === "weekly"
                ? "bg-[#0D631B] text-white"
                : "border border-[#BFCABA] text-[#181D17]"
            }`}
          >
            Mingguan
          </button>
          <button
            onClick={() => setPeriod("monthly")}
            className={`px-4 py-[8px] rounded-full text-[12px] font-medium leading-[14.4px] transition-colors ${
              period === "monthly"
                ? "bg-[#0D631B] text-white"
                : "border border-[#BFCABA] text-[#181D17]"
            }`}
          >
            Bulanan
          </button>
        </div>
      </div>

      {/* Chart */}
      <div
        className="relative rounded-xl overflow-hidden"
        style={{ height: 300 }}
      >
        {/* Gradient overlay */}
        <div
          className="absolute inset-0 rounded-xl pointer-events-none z-10"
          style={{
            background:
              "linear-gradient(0deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 100%)",
          }}
        />

        {/* Bars */}
        <div className="absolute bottom-0 left-0 right-0 flex items-end justify-evenly px-12 pb-4 h-full gap-4">
          {data.map((bar, i) => (
            <div key={i} className="flex flex-col items-center gap-2 flex-1">
              <div
                className="w-full rounded-t-lg transition-all duration-500"
                style={{
                  height: (bar.height / maxHeight) * 260,
                  backgroundColor: bar.color,
                  minWidth: 40,
                  maxWidth: 56,
                }}
              />
              <span className="text-[11px] text-[#40493D] font-medium">
                {bar.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
