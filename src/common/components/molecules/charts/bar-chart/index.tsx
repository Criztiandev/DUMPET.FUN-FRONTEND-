import React, { useMemo, useCallback } from "react";
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
import useFetchAccountBalance from "@/feature/balance/hooks/use-fetch-account-balance";

interface ChartData {
  option: string;
  amount: number;
  fill: string;
}

// Memoized CustomTooltip component
const CustomTooltip = React.memo<{ active?: boolean; payload?: any[] }>(
  ({ active, payload }) => {
    if (active && payload?.[0]) {
      return (
        <div className="tooltip bg-background p-4 rounded-md border-2 border-primary">
          <p>{`Option: ${payload[0].payload.option}`}</p>
          <p>{`Amount: ${payload[0].payload.amount}`}</p>
        </div>
      );
    }
    return null;
  }
);

CustomTooltip.displayName = "CustomTooltip";

// Chart configuration moved outside component to prevent recreating on each render
const chartConfig: ChartConfig = {
  amount: {
    label: "Amount",
    color: "hsl(var(--chart-1))",
  },
};

const BarChart: React.FC = () => {
  const { selectedMarket } = useMarketStore();
  const { data: result } = useFetchAccountBalance();

  const marketInfo = selectedMarket?.MarketInfo as MarketInfo;

  // Memoize formatted values
  const voteATally = useMemo(
    () => formatArweaveTokenAmount(result?.BalanceVoteA || 0),
    [result?.BalanceVoteA]
  );

  const voteBTally = useMemo(
    () => formatArweaveTokenAmount(result?.BalanceVoteB || 0),
    [result?.BalanceVoteB]
  );

  // Memoize chart data
  const chartData: ChartData[] = useMemo(
    () => [
      {
        option: marketInfo?.OptionA || "",
        amount: voteATally || 0,
        fill: "#dc2626",
      },
      {
        option: marketInfo?.OptionB || "",
        amount: voteBTally || 0,
        fill: "#2563eb",
      },
    ],
    [marketInfo?.OptionA, marketInfo?.OptionB, voteATally, voteBTally]
  );

  // Memoize tick formatter function
  const tickFormatter = useCallback(
    (value: string) => {
      const item = chartData.find((item) => item.option === value);
      return `${value} (${item?.amount})`;
    },
    [chartData]
  );

  if (!marketInfo) {
    return null;
  }

  return (
    <Card className="w-full h-full flex justify-center flex-col">
      <CardHeader>
        <CardTitle>{marketInfo.Title}</CardTitle>
        <CardDescription>Created By {marketInfo.Creator}</CardDescription>
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
              tickFormatter={tickFormatter}
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

export default React.memo(BarChart);
