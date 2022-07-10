import React from "react";
import { BsCurrencyDollar } from "react-icons/bs";
import { GoPrimitiveDot } from "react-icons/go";
import { Stacked, Pie, Button, LineChart, SparkLine } from "../components";
import {
  earningData,
  SparklineAreaData,
  ecomPieChartData,
} from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";

const Ecommerce = () => {
  const { currentColor, currentMode } = useStateContext();
  return (
    <div className="mt-2">
      <div className="flex flex-wrap w-full justify-center">
        <div
          className="bg-white 
          dark:text-gray-200 
          dark:bg-secondary-dark-bg h-44 rounded-xl w-full 
          lg:w-80 p-8 pt-5 m-3 bg-no-repeat bg-cover bg-center"
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold" style={{ color: currentColor }}>
                Earnings
              </p>
              <p className="text-2xl">$125,443.00</p>
            </div>
          </div>
          <div className="mt-10">
            <Button
              color="white"
              bgColor={currentColor}
              text="Download"
              borderRadius="10px"
              size="md"
            />
          </div>
        </div>
        <div className="flex flex-wrap lg:flex-nowrap justify-center gap-1 items-center ml-3 mr-2">
          {earningData.map((item) => (
            <div
              key={item.title}
              className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg w-56 md:w-48 p-4 pt-9 rounded-2xl "
            >
              <button
                type="button"
                style={{
                  color: item.iconColor,
                  backgroundColor: item.iconBg,
                }}
                className="text-2xl opacity-[0.9] rounded-full p-4 hover:drop-shadow-xl"
              >
                {item.icon}
              </button>
              <p className="mt-3">
                <span className="text-lg font-semibold">{item.amount}</span>
                <span className={`text-sm ml-2 ${item.pcColor}`}>
                  {item.percentage}
                </span>
              </p>
              <p className="text-sm mt-1" style={{ color: currentColor }}>
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-10 flex-wrap justify-start">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl ">
          <div className="flex justify-between">
            <p className="font-semibold text-xl">Revenue Updates</p>
            <div className="flex items-center gap-4">
              <p className="flex items-center gap-2 text-gray-600 dark:text-gray-200 hover:drop-shadow-xl">
                <span>
                  <GoPrimitiveDot />
                </span>
                <span>Expense</span>
              </p>

              <p
                className="flex items-center gap-2 hover:drop-shadow-xl"
                style={{ color: currentColor }}
              >
                <span>
                  <GoPrimitiveDot />
                </span>
                <span>Budget</span>
              </p>
            </div>
          </div>
          <div className="mt-10 flex gap-10 flex-wrap justify-center">
            <div className="border-r-1 border-color m-4 pr-10">
              <div>
                <p>
                  <span className="text-3xl font-semibold">$125,443</span>
                  <span
                    className="p-1.5 hover:drop-shadow-xl cursor-pointer rounded-full text-white ml-3 text-xs"
                    style={{ backgroundColor: currentColor }}
                  >
                    36%
                  </span>
                </p>
                <p className="text-gray-500 dark:text-gray-500 mt-1">Budget</p>
              </div>

              <div className="mt-8">
                <p>
                  <span className="text-3xl font-semibold">$33,287</span>
                </p>
                <p className="text-gray-500  dark:text-gray-500 mt-1">
                  Expense
                </p>
              </div>
              <div className="mt-5">
                <SparkLine
                  currentColor={currentColor}
                  id="line-sparkline"
                  type="Line"
                  height="80px"
                  width="250px"
                  data={SparklineAreaData}
                  color={currentColor}
                />
              </div>
              <div className="mt-10">
                <Button
                  color="white"
                  bgColor={currentColor}
                  text="Download Report"
                  borderRadius="10px"
                />
              </div>
            </div>
            <div>
              <Stacked width="320px" height="360px" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ecommerce;
