import { Button } from "@/common/components/atoms/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/common/components/atoms/ui/dropdown-menu";
import { Settings } from "lucide-react";
const FilterMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button size="icon" className="w-[42px]" variant="ghost">
          <Settings size={22} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Sort by</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>MCAP</DropdownMenuItem>
        <DropdownMenuItem>Most Votes</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterMenu;
