import { Badge } from "@/common/components/atoms/ui/badge";
import {
  Card,
  CardHeader,
  CardContent,
} from "@/common/components/atoms/ui/card";
import { XStack } from "@/common/components/atoms/ui/stack";

const BetDetailsTab = () => {
  return (
    <div>
      <Card className="grid grid-cols-[44%_auto] h-[200px] mb-4">
        <CardHeader className="p-4 ">
          <div className="w-full h-full rounded-md bg-[#F0F0F0] max-h-[200px]"></div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="mb-4">
            <h3 className="font-bold text-lg">Title</h3>
            <XStack className="gap-2 opacity-60">
              <span className="text-sm font-semibold">Created by</span>
              <span className="text-purple-400 font-semibold text-sm">
                Author
              </span>
            </XStack>
          </div>
          <div className="flex justify-start items-start my-4 flex-col space-y-2">
            <span className="font-semibold">MCAP: $ 30203232323</span>
            <Badge>4 days ago</Badge>
          </div>
        </CardContent>
      </Card>
      <div>
        <div className="flex flex-col">
          <span className="text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde in
            laboriosam error tenetur officiis totam? Asperiores laudantium et
            ducimus nemo deserunt maxime neque! Explicabo quibusdam provident
            quas maiores necessitatibus recusandae reiciendis voluptas, eum
            pariatur et, dignissimos, saepe natus. Quaerat
          </span>
        </div>
      </div>
    </div>
  );
};

export default BetDetailsTab;
