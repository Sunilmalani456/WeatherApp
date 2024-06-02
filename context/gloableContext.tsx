// @ts-nocheck

"use client";
import defaultStates from "@/lib/defaultState";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { debounce } from "lodash";

// type GlobalContextType = {
//   forecast: any;
// };

const GlobalContext = createContext(null);
const GlobalContextUpdate = createContext(null);

const GloableContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [forecast, setForecast] = useState({});
  const [airQuality, setAirQuality] = useState({});
  const [uvIndex, setUvIndex] = useState({});
  const [fiveDayForecast, setFiveDayForecast] = useState({});
  const [geoCodedList, setGeoCodedList] = useState(defaultStates);
  const [inputValue, setInputValue] = useState("");

  const [activeCityCoords, setActiveCityCoords] = useState([26.9124, 75.7873]);

  const fetchUvIndex = async (lat, lon) => {
    try {
      const res = await axios.get(`api/uv?lat=${lat}&lon=${lon}`);

      setUvIndex(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAirQulity = async (lat, lon) => {
    try {
      const res = await axios.get(`api/pollution?lat=${lat}&lon=${lon}`);

      setAirQuality(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchForecast = async (lat, lon) => {
    try {
      const res = await axios.get(`api/weather?lat=${lat}&lon=${lon}`);

      setForecast(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFiveDayForecast = async (lat, lon) => {
    try {
      const res = await axios.get(`api/fiveday?lat=${lat}&lon=${lon}`);

      setFiveDayForecast(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchGeoCodedList = async (search: any) => {
    try {
      const res = await axios.get(`/api/geocoded?search=${search}`);

      setGeoCodedList(res.data);
    } catch (error: any) {
      console.log("Error fetching geocoded list: ", error.message);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    console.log("e.target.value", e.target.value);

    if (e.target.value === "") {
      setGeoCodedList(defaultStates);
    }
  };

  useEffect(() => {
    const debouncedFetch = debounce((search) => {
      fetchGeoCodedList(search);
    }, 500);

    if (inputValue) {
      debouncedFetch(inputValue);
    }

    // cleanup
    return () => debouncedFetch.cancel();
  }, [inputValue]);

  useEffect(() => {
    fetchAirQulity(activeCityCoords[0], activeCityCoords[1]);
    fetchForecast(activeCityCoords[0], activeCityCoords[1]);
    fetchUvIndex(activeCityCoords[0], activeCityCoords[1]);
    fetchFiveDayForecast(activeCityCoords[0], activeCityCoords[1]);
  }, [activeCityCoords]);

  return (
    <GlobalContext.Provider
      value={{
        forecast,
        uvIndex,
        airQuality,
        inputValue,
        handleInput,
        fiveDayForecast,
        setActiveCityCoords,
        geoCodedList,
        setGeoCodedList,
      }}
    >
      <GlobalContextUpdate.Provider value={{ setActiveCityCoords }}>
        {children}
      </GlobalContextUpdate.Provider>
    </GlobalContext.Provider>
  );
};

export default GloableContextProvider;

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);
