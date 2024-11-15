import { useTheme } from "@/common/components/template/provider/theme-provider";
import { Moon, Sun } from "lucide-react";
import { Button } from "../../ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/common/lib/utils";

const ThemeButton = () => {
  const isSmallScreen = useIsMobile();
  const { theme, setTheme } = useTheme();

  const handleChangeTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button
      size={isSmallScreen ? "default" : "icon"}
      onClick={handleChangeTheme}
      variant="ghost"
      className={cn(`${isSmallScreen && "w-full"}`)}
    >
      {theme === "dark" ? (
        <div className="space-x-2 flex items-center">
          <Sun />
          {isSmallScreen && <span>Light Mode</span>}
        </div>
      ) : (
        <div className="space-x-2 flex items-center">
          <Moon />
          {isSmallScreen && <span>Light Mode</span>}
        </div>
      )}
    </Button>
  );
};

export default ThemeButton;
