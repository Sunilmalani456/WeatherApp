import { useGlobalContext } from "@/context/gloableContext";
import React from "react";
import { Skeleton } from "../ui/skeleton";
import { unixToDay, kelvinToCelsius } from "@/lib/misc";
import { calender } from "@/lib/icons";

const FiveDayForecast = () => {
  // @ts-ignore
  const { fiveDayForecast } = useGlobalContext();

  const { city, list } = fiveDayForecast;

  if (!fiveDayForecast || !city || !list) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  const processData = (
    dailyData: {
      main: { temp_min: number; temp_max: number };
      dt: number;
    }[]
  ) => {
    let minTemp = Number.MAX_VALUE;
    let maxTemp = Number.MIN_VALUE;

    dailyData.forEach(
      (day: { main: { temp_min: number; temp_max: number }; dt: number }) => {
        if (day.main.temp_min < minTemp) {
          minTemp = day.main.temp_min;
        }
        if (day.main.temp_max > maxTemp) {
          maxTemp = day.main.temp_max;
        }
      }
    );

    return {
      // @ts-ignore
      day: unixToDay(dailyData[0].dt),
      // @ts-ignore
      minTemp: kelvinToCelsius(minTemp),
      // @ts-ignore
      maxTemp: kelvinToCelsius(maxTemp),
    };
  };

  const dailyForecasts = [];

  for (let i = 0; i < 40; i += 8) {
    const dailyData = list.slice(i, i + 5);
    dailyForecasts.push(processData(dailyData));
  }

  return (
    <div
      className="pt-6 pb-5 px-4 flex-1 border rounded-lg flex flex-col
        justify-between dark:bg-dark-grey shadow-sm dark:shadow-none"
    >
      <div>
        <h2 className="flex items-center gap-2 font-medium">
          {calender} 5-Day Forecast for {city.name}
        </h2>

        <div className="forecast-list pt-3">
          {dailyForecasts.map((day, i) => {
            return (
              <div
                key={i}
                className="daily-forevast py-4 flex flex-col justify-evenly border-b-2"
              >
                <p className="text-xl min-w-[3.5rem]">{day.day}</p>
                <p className="text-sm flex justify-between">
                  <span>(low)</span>
                  <span>(high)</span>
                </p>

                <div className="flex-1 flex items-center justify-between gap-4">
                  <p className="font-bold">{day.minTemp}°C</p>
                  <div className="temperature flex-1 w-full h-2 rounded-lg"></div>
                  <p className="font-bold">{day.maxTemp}°C</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FiveDayForecast;
