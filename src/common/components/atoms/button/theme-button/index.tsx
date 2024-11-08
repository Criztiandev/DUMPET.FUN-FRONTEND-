import { useTheme } from "@/common/components/template/provider/theme-provider";
import { Moon, Sun } from "lucide-react";
import { Button } from "../../ui/button";

const ThemeButton = () => {
  const { theme, setTheme } = useTheme();

  const handleChangeTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button
      size="icon"
      onClick={handleChangeTheme}
      variant={theme === "light" ? "default" : "ghost"}
    >
      {theme === "dark" ? <Sun /> : <Moon />}
    </Button>
  );
};

export default ThemeButton;
