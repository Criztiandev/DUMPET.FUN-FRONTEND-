import { Button } from "@/common/components/atoms/ui/button";
import BarChart from "@/common/components/molecules/charts/bar-chart";
import Topbar from "@/common/components/template/layout/topbar";

import { Input } from "@/common/components/atoms/ui/input";
import { Badge } from "@/common/components/atoms/ui/badge";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/common/components/atoms/ui/select";
import { useState } from "react";
import DetailsMainTab from "@/common/components/organism/tab/details-main-tab";
import { Textarea } from "@/common/components/atoms/ui/textarea";

const DetailsScreen = () => {
  const [selectedToken, setSelectedToken] = useState({
    value: 0,
    type: "AR",
  });

  const handleSelectToken = (type: string) => {
    setSelectedToken((prev) => ({
      ...prev,
      type,
    }));
  };

  const handleInputValue = (value: string) => {
    setSelectedToken((prev) => ({
      ...prev,
      value: Number(value),
    }));
  };

  return (
    <section className="w-full min-h-full">
      <Topbar />
      <div className="grid grid-cols-[auto_35%] gap-8 p-4 ">
        <BarChart />
        <div className="flex flex-col justify-between">
          <div className="w-full ">
            <DetailsMainTab />
          </div>
          <div></div>
          <div className="w-full  flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex gap-4">
                <Input
                  placeholder="0.0"
                  onChange={(e) => handleInputValue(e.currentTarget.value)}
                  value={selectedToken.value}
                />
                <Select onValueChange={handleSelectToken}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a Token" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Tokens</SelectLabel>
                      <SelectItem value="AR">AR</SelectItem>
                      <SelectItem value="SOL">SOL</SelectItem>
                      <SelectItem value="eth">Eth</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Badge className="px-6 cursor-pointer" variant="default">
                  1 {selectedToken.type.toUpperCase()}
                </Badge>
                <Badge className="px-6 cursor-pointer" variant="outline">
                  5 {selectedToken.type.toUpperCase()}
                </Badge>
                <Badge className="px-6 cursor-pointer" variant="outline">
                  10 {selectedToken.type.toUpperCase()}
                </Badge>
              </div>
            </div>
            <div className="flex w-full gap-4">
              <Button className="w-full">Place Bet</Button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div>
          <form>
            <label className="sr-only">Your message</label>
            <div className="flex items-center px-3 py-2 rounded-lg ">
              <button
                type="button"
                className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 18"
                >
                  <path
                    fill="currentColor"
                    d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
                  />
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M18 1H2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                  />
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
                  />
                </svg>
                <span className="sr-only">Upload image</span>
              </button>
              <button
                type="button"
                className="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13.408 7.5h.01m-6.876 0h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM4.6 11a5.5 5.5 0 0 0 10.81 0H4.6Z"
                  />
                </svg>
                <span className="sr-only">Add emoji</span>
              </button>
              <Textarea placeholder="Enter your Message" />
              <button
                type="submit"
                className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
              >
                <svg
                  className="w-5 h-5 rotate-90 rtl:-rotate-90"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 20"
                >
                  <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                </svg>
                <span className="sr-only">Send message</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default DetailsScreen;
