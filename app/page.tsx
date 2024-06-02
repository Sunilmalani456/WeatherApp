"use client";

import AirPolution from "@/components/shared/airPolution";
import DailyForcast from "@/components/shared/dailyForcast";
import FeelsLikes from "@/components/shared/feelsLikes";
import FiveDayForecast from "@/components/shared/fiveDayForecast";
import Humidity from "@/components/shared/humidity";
import Mapbox from "@/components/shared/MapBox";
import NavBar from "@/components/shared/navbar";
import Population from "@/components/shared/Population";
import Pressure from "@/components/shared/pressure";
import Sunset from "@/components/shared/sunset";
import Temperature from "@/components/shared/Temperature";
import UVIndex from "@/components/shared/uvIndex";
import Wind from "@/components/shared/wind";
import { useGlobalContextUpdate } from "@/context/gloableContext";
import defaultStates from "@/lib/defaultState";

export default function Home() {
  // @ts-ignore
  const { setActiveCityCoords } = useGlobalContextUpdate();

  const getClickedCityCords = (lat: number, lon: number) => {
    setActiveCityCoords([lat, lon]);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <main className="mx-[1rem] lg:mx-[2rem] xl:mx-[6rem] 2xl:mx-[16rem] m-auto">
      <NavBar />
      <div className="pb-4 flex flex-col gap-4 md:flex-row">
        <div className="flex flex-col gap-4 w-full min-w-[18rem] md:w-[35rem]">
          <Temperature />
          <FiveDayForecast />
        </div>
        <div className="flex flex-col w-full">
          <div className="instruments grid h-full gap-4 col-span-full sm-2:col-span-2 lg:grid-cols-3 xl:grid-cols-4">
            <AirPolution />
            <Sunset />
            <Wind />
            <DailyForcast />
            <UVIndex />
            <Population />
            <FeelsLikes />
            <Humidity />
            <Pressure />
          </div>
          <div className="mapbox-con mt-4 flex gap-4">
            <Mapbox />
            <div className="states flex flex-col gap-3 flex-1">
              <h2 className="flex items-center gap-2 font-medium">
                Top Large Cities
              </h2>
              <div className="flex flex-col gap-4">
                {defaultStates.map((state, index) => {
                  return (
                    <div
                      key={index}
                      className="border rounded-lg cursor-pointer dark:bg-dark-grey shadow-sm dark:shadow-none"
                      onClick={() => {
                        getClickedCityCords(state.lat, state.lon);
                      }}
                    >
                      <p className="px-6 py-4">{state.name}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
