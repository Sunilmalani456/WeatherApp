import React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import GloableContextProvider from "@/context/gloableContext";

const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  return (
    <NextThemesProvider {...props}>
      <GloableContextProvider>{children}</GloableContextProvider>
    </NextThemesProvider>
  );
};

export default ThemeProvider;
