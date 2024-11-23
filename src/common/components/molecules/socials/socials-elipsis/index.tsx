import { Button } from "@/common/components/atoms/ui/button";

import { EllipsisVertical, Github, Send } from "lucide-react";
import { Tooltip, TooltipTrigger } from "@/common/components/atoms/ui/tooltip";
import { TooltipContent } from "@radix-ui/react-tooltip";
import { useState } from "react";

const SocialElipsis = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleNavigate = (uri: string) => {
    window.open(uri, "_blank", "noopener,noreferrer");
  };
  return (
    <div className="relative">
      <Tooltip>
        <TooltipTrigger>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <EllipsisVertical />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <span className="text-[12px]">More</span>
        </TooltipContent>
      </Tooltip>

      {isOpen && (
        <div className="flex flex-col gap-4 absolute top-14">
          <Tooltip>
            <TooltipTrigger>
              <Button
                size="icon"
                variant={"ghost"}
                onClick={() =>
                  handleNavigate("https://github.com/drumfeet/dumpet")
                }
              >
                <Github />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <span className="text-[12px]">Github</span>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <Button size="icon" variant={"ghost"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  width={18}
                  height={18}
                  fill="white"
                >
                  <path d="M448 209.9a210.1 210.1 0 0 1 -122.8-39.3V349.4A162.6 162.6 0 1 1 185 188.3V278.2a74.6 74.6 0 1 0 52.2 71.2V0l88 0a121.2 121.2 0 0 0 1.9 22.2h0A122.2 122.2 0 0 0 381 102.4a121.4 121.4 0 0 0 67 20.1z" />
                </svg>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <span className="text-[12px]">Tiktok</span>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <Button
                size="icon"
                variant={"ghost"}
                onClick={() => handleNavigate("https://t.me/dumpetdotfun")}
              >
                <Send size={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <span className="text-[12px]">Telegram</span>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <Button
                size="icon"
                variant={"ghost"}
                onClick={() => handleNavigate("https://x.com/dumpetdotfun")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  width={18}
                  height={18}
                  fill="white"
                >
                  <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                </svg>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <span className="text-[12px]">Twitter(X)</span>
            </TooltipContent>
          </Tooltip>
        </div>
      )}
    </div>
  );
};

export default SocialElipsis;
