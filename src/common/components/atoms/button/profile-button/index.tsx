import { Button } from "../../ui/button";
import { User } from "lucide-react";

const ProfileButton = () => {
  return (
    <Button className="w-full space-x-2" variant="ghost">
      <User size={18} />
      <span>Profile</span>
    </Button>
  );
};

export default ProfileButton;
