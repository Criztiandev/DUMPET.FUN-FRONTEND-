import { Badge } from "@/common/components/atoms/ui/badge";
import { Button } from "@/common/components/atoms/ui/button";
import Topbar from "@/common/components/template/layout/topbar";
import { Share2 } from "lucide-react";
import useFetchAllCreatedMarket from "@/feature/market/hooks/market/use-fetch-all-created-market";
import { XStack } from "@/common/components/atoms/ui/stack";
import { MarketCreatedTable } from "@/common/components/molecules/card/profile-market-card";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/common/components/atoms/ui/tabs";
import { MarketTransactedTable } from "@/common/components/molecules/card/profile-transact-table";
import { useParams } from "react-router-dom";
import useFetchTransactedMarket from "../../hooks/fetch-transacted-market";

const PublicProfileScreen = () => {
  const { id: walletAddress } = useParams();

  const { data: createdMarketResult } = useFetchAllCreatedMarket(
    walletAddress || ""
  );
  const { data: transactedMarketResult } = useFetchTransactedMarket(
    "566F7MCrrBhr87n7Hs5JKyEQeRlAT9A14G4OWxfS4kQ",
    walletAddress || ""
  );

  const { Markets: createdMarkets } = createdMarketResult;
  const { Markets: transactedMarkets } = transactedMarketResult;

  const handleShareProfile = () => {
    const text = `Check out this profile on dumpet.fun - `;
    const url = window.location.href;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, "_blank");
  };

  return (
    <div className="w-full ">
      <Topbar />
      <section className="mt-32">
        <div className="mx-auto max-w-screen-lg px-4 2xl:px-0">
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl md:mb-6">
            General overview
          </h2>

          <div className="py-4 md:py-8">
            <div className="mb-4 grid gap-4 sm:grid-cols-2 sm:gap-8 lg:gap-16">
              <div className="space-y-4">
                <div className="flex space-x-4">
                  <img
                    className="h-16 w-16 rounded-lg"
                    src={`https://ui-avatars.com/api/?name=${walletAddress}&background=8058D5&color=fff`}
                    alt="Helene avatar"
                  />
                  <div className="space-y-2">
                    <XStack className="gap-4">
                      <Badge
                        variant="secondary"
                        className="items-center justify-center"
                      >
                        <span>Member</span>
                      </Badge>

                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={handleShareProfile}
                      >
                        <Share2 />
                      </Button>
                    </XStack>
                    <h2 className="flex items-center text-xl font-bold leading-none text-gray-900 dark:text-white sm:text-2xl">
                      Dumpet #{getFirstAndLastThree(walletAddress || "")}
                    </h2>
                  </div>
                </div>
                <dl className="">
                  <dt className="font-semibold text-gray-900 dark:text-white">
                    Wallet Address
                  </dt>
                  <dd className="text-gray-500 dark:text-gray-400">
                    {walletAddress || ""}
                  </dd>
                </dl>
              </div>
            </div>
          </div>

          <Tabs defaultValue="market-held" className="">
            <TabsList>
              <TabsTrigger value="market-held"> Market Held</TabsTrigger>
              <TabsTrigger value="transaced">Transaced</TabsTrigger>
            </TabsList>
            <TabsContent value="market-held">
              <MarketCreatedTable payload={createdMarkets} />
            </TabsContent>
            <TabsContent value="transaced">
              <MarketTransactedTable payload={transactedMarkets} />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default PublicProfileScreen;

function getFirstAndLastThree(str: string) {
  // Check if string is less than 6 characters
  if (str.length < 6) {
    return str;
  }

  // Get first 3 and last 3 letters
  const firstThree = str.slice(0, 3);
  const lastThree = str.slice(-3);

  return firstThree + lastThree;
}
