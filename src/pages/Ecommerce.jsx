import React from "react";
import { BsCurrencyDollar } from "react-icons/bs";
import { GoPrimitiveDot } from "react-icons/go";
import { IoIosMore } from "react-icons/io";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";

import { Stacked, Pie, Button, LineChart, SparkLine } from "../components";
import {
  earningData,
  medicalproBranding,
  recentTransactions,
  weeklyStats,
  dropdownData,
  SparklineAreaData,
  ecomPieChartData,
} from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";
import news from "../data/news.png";

// Shared card look, so every block lines up with the same radius, padding and colors
const card =
  "bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6";

const DropDown = ({ currentMode }) => (
  <div className="bg-white dark:text-gray-200 w-28 border-1 border-color px-2 py-1 rounded-md">
    <DropDownListComponent
      id="time"
      fields={{ text: "Time", value: "Id" }}
      style={{ border: "none", color: currentMode === "dark" && "black" }}
      value="4"
      dataSource={dropdownData}
      popupHeight="220px"
      popupWidth="120px"
    />
  </div>
);

const CardHeader = ({ title, children }) => (
  <div className="flex flex-wrap justify-between items-center gap-2">
    <p className="text-xl font-semibold">{title}</p>
    {children}
  </div>
);

const MoreButton = () => (
  <button type="button" className="text-xl font-semibold text-gray-500">
    <IoIosMore />
  </button>
);

/*
 * Layout is CSS grid instead of fixed pixel widths, so every row fills the
 * available space at any window size:
 *   phone   – one column, the four stat boxes stay 2 × 2
 *   lg      – Earnings | 2 × 2 stats, side by side and the same height
 *   xl      – Revenue takes 2/3, the two summary cards stack in the last 1/3
 *   xl      – (also) Earnings 1/3 | the four stats in one row
 */
const Ecommerce = () => {
  const { currentColor, currentMode } = useStateContext();

  return (
    <div className="p-4 md:p-6 md:pt-4 space-y-4 md:space-y-6">
      {/* ── Row 1: Earnings + key stats ───────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-white rounded-2xl p-6 md:p-8 flex flex-col justify-between gap-6 min-h-[11rem] h-full">
          <div className="flex justify-between items-start gap-4">
            <div>
              <p className="font-bold text-gray-800">Earnings</p>
              <p className="text-3xl lg:text-4xl font-semibold text-gray-700 mt-2">
                $ 63,500.00
              </p>
              <p className="text-sm text-gray-400 mt-1">This month</p>
            </div>
            <button
              type="button"
              style={{ backgroundColor: currentColor }}
              className="text-2xl text-white hover:drop-shadow-xl rounded-full p-4 shrink-0"
            >
              <BsCurrencyDollar />
            </button>
          </div>
          <div>
            <Button
              color="white"
              bgColor={currentColor}
              text="Download"
              borderRadius="10px"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 xl:col-span-2 xl:grid-cols-4 gap-4 md:gap-6">
          {earningData.map((item) => (
            <div
              key={item.title}
              className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-4 md:p-5 flex flex-col justify-between gap-3 min-w-0"
            >
              <button
                type="button"
                style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                className="text-2xl rounded-full p-4 hover:drop-shadow-xl self-start"
              >
                {item.icon}
              </button>
              <div>
                <p className="flex flex-wrap items-baseline gap-x-2">
                  <span
                    className="text-lg font-semibold"
                    style={{ color: currentColor }}
                  >
                    {item.amount}
                  </span>
                  <span className={`text-sm text-${item.pcColor}`}>
                    {item.percentage}
                  </span>
                </p>
                <p className="text-sm text-gray-400 mt-1">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Row 2: Revenue chart + summary cards ──────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6">
        <div className={`${card} xl:col-span-2`}>
          <div className="flex flex-wrap justify-between items-center gap-2">
            <p className="font-semibold text-xl text-gray-600 dark:text-gray-200">
              Revenue Updates
            </p>
            <div className="flex items-center gap-4">
              <p className="flex items-center gap-2 text-gray-600 dark:text-gray-200">
                <GoPrimitiveDot />
                <span>Expense</span>
              </p>
              <p
                className="flex items-center gap-2"
                style={{ color: currentColor }}
              >
                <GoPrimitiveDot />
                <span>Budget</span>
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col md:flex-row gap-8">
            <div className="md:w-64 shrink-0 md:border-r-1 border-color md:pr-8">
              <div>
                <p className="flex flex-wrap items-center gap-3">
                  <span className="text-3xl font-semibold text-gray-600 dark:text-gray-200">
                    $ 374,550.00
                  </span>
                  <span
                    className="px-2 py-1 rounded-full text-xs text-white"
                    style={{ backgroundColor: currentColor }}
                  >
                    +4.39%
                  </span>
                </p>
                <p className="text-gray-500 mt-1">Budget</p>
              </div>
              <div className="mt-8">
                <p className="flex flex-wrap items-center gap-3">
                  <span className="text-3xl font-semibold text-gray-600 dark:text-gray-200">
                    $ 129,360.00
                  </span>
                  <span
                    className="px-2 py-1 rounded-full text-xs text-white"
                    style={{ backgroundColor: currentColor }}
                  >
                    -2.82%
                  </span>
                </p>
                <p className="text-gray-500 mt-1">Expense</p>
              </div>

              <div className="mt-5">
                <SparkLine
                  currentColor={currentColor}
                  id="line-sparkLine"
                  type="Line"
                  height="80px"
                  width="100%"
                  data={SparklineAreaData}
                  color={currentColor}
                />
              </div>
              <div className="mt-8">
                <Button
                  color="white"
                  bgColor={currentColor}
                  text="Download Report"
                  borderRadius="10px"
                />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <Stacked currentMode={currentMode} width="100%" height="360px" />
            </div>
          </div>
        </div>

        {/* Two cards side by side on tablets, stacked next to the chart on wide screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-4 md:gap-6 content-start">
          <div
            className="rounded-2xl p-6 flex flex-col justify-between"
            style={{ backgroundColor: currentColor }}
          >
            <div className="flex justify-between items-start gap-4">
              <p className="font-semibold text-white text-2xl">Earnings</p>
              <div className="text-right">
                <p className="text-2xl text-white font-semibold">$ 63,500.00</p>
                <p className="text-gray-200">Monthly revenue</p>
              </div>
            </div>
            <div className="mt-4">
              <SparkLine
                currentColor={currentColor}
                id="column-sparkLine"
                height="100px"
                type="Column"
                data={SparklineAreaData}
                width="100%"
                color="rgb(242, 252, 253)"
              />
            </div>
          </div>

          <div className={`${card} flex items-center justify-between gap-4`}>
            <div>
              <p className="text-2xl font-semibold">$ 129,360.00</p>
              <p className="text-gray-600 dark:text-gray-200">Expense Details</p>
            </div>
            <div className="w-40 shrink-0">
              <Pie
                id="pie-chart"
                data={ecomPieChartData}
                legendVisiblity={false}
                height="160px"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Row 3: Transactions + crypto chart ────────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6">
        <div className={`${card} flex flex-col`}>
          <CardHeader title="Recent Transactions">
            <DropDown currentMode={currentMode} />
          </CardHeader>
          <div className="mt-8 flex-1">
            {recentTransactions.map((item) => (
              <div
                key={item.title}
                className="flex justify-between items-center gap-4 mt-4"
              >
                <div className="flex gap-4 items-center min-w-0">
                  <button
                    type="button"
                    style={{
                      color: item.iconColor,
                      backgroundColor: item.iconBg,
                    }}
                    className="text-2xl rounded-lg p-4 hover:drop-shadow-xl shrink-0"
                  >
                    {item.icon}
                  </button>
                  <div className="min-w-0">
                    <p className="text-md font-semibold">{item.title}</p>
                    <p className="text-sm text-gray-400 truncate">{item.desc}</p>
                  </div>
                </div>
                <p className={`text-${item.pcColor} shrink-0`}>{item.amount}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mt-5 pt-3 border-t-1 border-color">
            <Button
              color="white"
              bgColor={currentColor}
              text="Add"
              borderRadius="10px"
            />
            <p className="text-gray-400 text-sm">36 Recent Transactions</p>
          </div>
        </div>

        <div className={`${card} xl:col-span-2 min-w-0`}>
          <CardHeader title="Crypto Overview in 3 Months">
            <DropDown currentMode={currentMode} />
          </CardHeader>
          <div className="mt-8 w-full overflow-x-auto">
            <LineChart />
          </div>
        </div>
      </div>

      {/* ── Row 4: Weekly stats, branding, activities ─────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4 md:gap-6">
        <div className={card}>
          <CardHeader title="Weekly Stats">
            <MoreButton />
          </CardHeader>
          <div className="mt-8">
            {weeklyStats.map((item) => (
              <div
                key={item.title}
                className="flex justify-between items-center gap-4 mt-4"
              >
                <div className="flex gap-4 items-center">
                  <button
                    type="button"
                    style={{ background: item.iconBg }}
                    className="text-2xl hover:drop-shadow-xl text-white rounded-full p-3"
                  >
                    {item.icon}
                  </button>
                  <div>
                    <p className="text-md font-semibold">{item.title}</p>
                    <p className="text-sm text-gray-400">{item.desc}</p>
                  </div>
                </div>
                <p className={`text-${item.pcColor}`}>{item.amount}</p>
              </div>
            ))}
            <div className="mt-6">
              <SparkLine
                currentColor={currentColor}
                id="area-sparkLine"
                height="160px"
                type="Area"
                data={SparklineAreaData}
                width="100%"
                color="rgb(242, 252, 253)"
              />
            </div>
          </div>
        </div>

        <div className={`${card} flex flex-col`}>
          <CardHeader title="MedicalPro Branding">
            <MoreButton />
          </CardHeader>
          <p className="text-xs font-semibold rounded-lg w-fit bg-orange-400 py-0.5 px-2 text-gray-200 mt-8">
            16 APR, 2021
          </p>

          <div className="flex flex-wrap gap-4 border-b-1 border-color mt-6">
            {medicalproBranding.data.map((item) => (
              <div
                key={item.title}
                className="border-r-1 border-color pr-4 pb-2 last:border-r-0"
              >
                <p className="text-xs text-gray-400">{item.title}</p>
                <p className="text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="border-b-1 border-color pb-4 mt-4">
            <p className="text-md font-semibold mb-2">Teams</p>
            <div className="flex flex-wrap gap-2">
              {medicalproBranding.teams.map((item) => (
                <p
                  key={item.name}
                  style={{ background: item.color }}
                  className="cursor-pointer hover:drop-shadow-xl text-white py-0.5 px-3 rounded-lg text-xs"
                >
                  {item.name}
                </p>
              ))}
            </div>
          </div>
          <div className="mt-4 flex-1">
            <p className="text-md font-semibold mb-2">Leaders</p>
            <div className="flex flex-wrap gap-3">
              {medicalproBranding.leaders.map((item, index) => (
                <img
                  key={index}
                  className="rounded-full w-8 h-8"
                  src={item.image}
                  alt=""
                />
              ))}
            </div>
          </div>
          <div className="flex justify-between items-center mt-5 pt-3 border-t-1 border-color">
            <Button
              color="white"
              bgColor={currentColor}
              text="Add"
              borderRadius="10px"
            />
            <p className="text-gray-400 text-sm">36 Recent Transactions</p>
          </div>
        </div>

        {/* Full width on tablets (image beside the text), normal card on wide screens */}
        <div className={`${card} md:col-span-2 2xl:col-span-1`}>
          <CardHeader title="Daily Activities">
            <MoreButton />
          </CardHeader>
          <div className="mt-8 flex flex-col sm:flex-row 2xl:flex-col gap-6">
            <img
              className="w-full sm:w-1/2 2xl:w-full rounded-xl object-cover"
              src={news}
              alt=""
            />
            <div className="flex-1">
              <p className="font-semibold text-lg">
                Bitcoin Price and Ethereum Reverse Sharply, Key Support Nearby
              </p>
              <p className="text-gray-400">By Xavick Lo</p>
              <p className="mt-4 text-sm text-gray-400">
                Bitcoin price dropped sharply to the $18,500 support. Ethereum
                dived to $1,265, XRP is down over 10%. QNT and RSR are up over
                5%....
              </p>
              <div className="mt-4">
                <Button
                  color="white"
                  bgColor={currentColor}
                  text="Read More"
                  borderRadius="10px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ecommerce;
