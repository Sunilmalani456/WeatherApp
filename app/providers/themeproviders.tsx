import React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";


const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  return (
    <NextThemesProvider {...props}>
      <GlobalContextProvider>{children}</GlobalContextProvider>
    </NextThemesProvider>
  );
};

export default ThemeProvider;
