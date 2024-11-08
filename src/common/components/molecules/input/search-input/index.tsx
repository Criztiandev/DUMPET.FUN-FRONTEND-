import { Input } from "@/common/components/atoms/ui/input";
import { Button } from "@/common/components/atoms/ui/button";
import { Search } from "lucide-react";
const SearchInput = () => {
  return (
    <>
      <Input placeholder="Search by Contact Addess" />
      <Button size="icon" className="w-[48px]">
        <Search size={18} />
      </Button>
    </>
  );
};

export default SearchInput;
