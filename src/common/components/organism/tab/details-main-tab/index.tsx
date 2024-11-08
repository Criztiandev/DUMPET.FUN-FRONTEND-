import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/common/components/atoms/ui/tabs";
import BetDetailsTab from "@/common/components/molecules/tab/bet-details-tab";
import DistributionTab from "@/common/components/molecules/tab/distribution-tab";

const DetailsMainTab = () => {
  return (
    <Tabs defaultValue="details">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="distrubution">Distrubution</TabsTrigger>
      </TabsList>
      <TabsContent value="details">
        <BetDetailsTab />
      </TabsContent>
      <TabsContent value="distrubution">
        <DistributionTab />
      </TabsContent>
    </Tabs>
  );
};

export default DetailsMainTab;
