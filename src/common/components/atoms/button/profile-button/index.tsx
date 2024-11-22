import { useNavigate } from "react-router-dom";
import { Button } from "../../ui/button";
import { User } from "lucide-react";

const ProfileButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      className="w-full space-x-2"
      variant="ghost"
      onClick={() => navigate("/profile")}
    >
      <User size={18} />
      <span>Profile</span>
    </Button>
  );
};

export default ProfileButton;
