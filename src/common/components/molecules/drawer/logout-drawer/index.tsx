import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/common/components/atoms/ui/drawer";
import { Button } from "@/common/components/atoms/ui/button";
import { LogOut } from "lucide-react";
import { Card, CardContent } from "@/common/components/atoms/ui/card";
import { DisconnectWalletButton } from "@/common/components/atoms/button/wallet-connect-button";

const LogoutDrawer = () => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <div className="space-x-2 flex px-3 py-1 cursor-pointer">
          <LogOut size={22} />
          <span>Log out</span>
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle className="text-2xl text-center">
              Are you sure you want to Disconnect ?
            </DrawerTitle>
            <DrawerDescription className="text-center opacity-50">
              Lorem ipsum, dolor sit amet consectetur
            </DrawerDescription>
          </DrawerHeader>

          <Card className=" p-0">
            <CardContent className="p-2 overflow-hidden">
              <img
                src="https://media1.tenor.com/m/szs9E1r_rtEAAAAd/nooo-meme-cop-screaming.gif"
                className="w-full  rounded-md"
                style={{
                  objectFit: "cover",
                }}
              />
            </CardContent>
          </Card>

          <DrawerFooter>
            <DrawerClose asChild>
              <DisconnectWalletButton />
            </DrawerClose>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default LogoutDrawer;
