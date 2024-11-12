import { HTMLAttributes, PropsWithChildren } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/common/components/atoms/ui/drawer";

import { Button } from "@/common/components/atoms/ui/button";
import { Menu } from "lucide-react";
interface Props extends PropsWithChildren, HTMLAttributes<HTMLDivElement> {
  title?: string;
}

const MenuDrawer = ({ children, title, ...props }: Props) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button size="icon" className="p-2">
          <Menu size={32} />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div>
          <DrawerHeader className="flex justify-center items-center">
            <DrawerTitle className="text-2xl">Menu</DrawerTitle>
          </DrawerHeader>
          <div {...props}>{children}</div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MenuDrawer;
