import { github } from "@/lib/icons";
import Link from "next/link";
import { Button } from "../ui/button";
import SearchDialog from "./SearchDialog ";
import ThemeDropdown from "./themeDropdown";

const NavBar = () => {
  return (
    <div className="w-full py-4 flex items-center justify-between">
      <div className="left"></div>
      <div className="search-container flex shrink-0 w-full gap-2 sm:w-fit">
        <SearchDialog />

        <div className="btn-group flex items-center gap-2">
          <ThemeDropdown />

          <Button asChild className="source-code-btn flex items-center gap-2">
            <Link target="_blank" href="https://github.com/sunilmalani456">
              {github} Source Code
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
