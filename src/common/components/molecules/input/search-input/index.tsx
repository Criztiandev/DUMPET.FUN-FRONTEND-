import { Input } from "@/common/components/atoms/ui/input";
import { Button } from "@/common/components/atoms/ui/button";
import { Search } from "lucide-react";
import { useEffect } from "react";
import useMarketStore from "@/feature/market/store/market.store";
const SearchInput = () => {
  const { searchTerm, searchMarket, clearSearch } = useMarketStore();

  const handleSearch = () => {};

  useEffect(() => {
    if (searchTerm.length === 0) {
      clearSearch();
    }
  }, [searchTerm]);

  return (
    <>
      <Input
        placeholder="Search by Contact Addess"
        value={searchTerm}
        onChange={(e) => searchMarket(e.currentTarget.value)}
      />
      <Button size="icon" className="w-[48px]" onClick={handleSearch}>
        <Search size={18} />
      </Button>
    </>
  );
};

export default SearchInput;
