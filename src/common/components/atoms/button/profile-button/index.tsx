import { Button } from "../../ui/button";
import { User } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const ProfileButton = () => {
  const isSmallScreen = useIsMobile();
  return (
    <Button
      className="w-full space-x-2"
      variant={isSmallScreen ? "outline" : "default"}
    >
      <User size={18} />
      <span>Profile</span>
    </Button>
  );
};

export default ProfileButton;
