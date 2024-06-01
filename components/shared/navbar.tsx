"use client";

import router from "next/router";
import React from "react";
import { Button } from "../ui/button";
import { github } from "@/lib/icons";
import ThemeDropdown from "./themeDropdown";
import SearchDialog from "./SearchDialog ";

const NavBar = () => {
  return (
    <div className="w-full py-4 flex items-center justify-between">
      <div className="left"></div>
      <div className="search-container flex shrink-0 w-full gap-2 sm:w-fit">
        <SearchDialog />

        <div className="btn-group flex items-center gap-2">
          <ThemeDropdown />

          <Button
            className="source-code-btn flex items-center gap-2"
            onClick={() => {
              router.push("https//github.com");
            }}
          >
            {github} Source Code
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
