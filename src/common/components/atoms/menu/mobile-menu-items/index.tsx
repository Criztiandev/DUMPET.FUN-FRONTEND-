import { DrawerClose } from "../../ui/drawer";
import { Button } from "../../ui/button";
import { useNavigate } from "react-router-dom";
import { MobileTopbarItem } from "./types";

const MobileMenuItems = (props: MobileTopbarItem) => {
  const navigate = useNavigate();
  return (
    <DrawerClose asChild>
      <Button
        variant="ghost"
        className="w-full space-x-2"
        onClick={() => navigate(props.path)}
      >
        <div className="grid grid-cols-[25%_auto] gap-2">
          {props.icon && props.icon}
          <span>{props.title}</span>
        </div>
      </Button>
    </DrawerClose>
  );
};

export default MobileMenuItems;
