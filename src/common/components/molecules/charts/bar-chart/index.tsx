import React from "react";
import {
  Bar,
  BarChart as BarChartParent,
  CartesianGrid,
  XAxis,
  Tooltip,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/common/components/atoms/ui/card";
import {
  ChartConfig,
  ChartContainer,
} from "@/common/components/atoms/ui/chart";
import useMarketStore from "@/feature/market/store/market.store";
import { MarketInfo } from "@/feature/market/interface/market.interface";
import { formatArweaveTokenAmount } from "@/common/utils/format.utils";
import { useParams } from "react-router-dom";
import useFetchAccountBalance from "@/feature/balance/hooks/use-fetch-account-balance";

// Define the structure of the chart data with color
interface ChartData {
  option: string;
  amount: number;
  fill: string;
}

const BarChart: React.FC = () => {
  const { id: marketId } = useParams();
  const { selectedMarket } = useMarketStore();
  const { data: result } = useFetchAccountBalance(marketId || "");

  const curretnMarketInfo = selectedMarket?.MarketInfo as MarketInfo;

  const VoteATally = formatArweaveTokenAmount(result?.BalanceVoteA || 0);
  const VoteBTally = formatArweaveTokenAmount(result?.BalanceVoteB || 0);

  console.log(selectedMarket);

  const chartData: ChartData[] = [
    {
      option: curretnMarketInfo?.OptionA,
      amount: VoteATally || 0,
      fill: "#dc2626",
    },
    {
      option: curretnMarketInfo?.OptionB,
      amount: VoteBTally || 0,
      fill: "#2563eb",
    },
  ];

  // Define chart configuration
  const chartConfig: ChartConfig = {
    amount: {
      label: "Amount",
      color: "hsl(var(--chart-1))",
    },
  };

  return (
    <Card className="w-full h-full flex justify-center flex-col">
      <CardHeader>
        <CardTitle>{curretnMarketInfo?.Title}</CardTitle>
        <CardDescription>
          Created By {curretnMarketInfo?.Creator}{" "}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChartParent data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="option"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                `${value} (${
                  chartData.find((item) => item.option === value)?.amount
                })`
              }
            />
            <Tooltip content={<CustomTooltip />} cursor={false} />
            <Bar
              dataKey="amount"
              fill="var(--color-amount)"
              radius={8}
              barSize={200}
            />
          </BarChartParent>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

// Custom Tooltip Component
const CustomTooltip: React.FC<{ active?: boolean; payload?: any[] }> = ({
  active,
  payload,
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="tooltip bg-background p-4 rounded-md border-2 border-primary">
        <p>{`Option: ${payload[0].payload.option}`}</p>
        <p>{`Amount: ${payload[0].payload.amount}`}</p>
      </div>
    );
  }

  return null;
};

export default BarChart;
