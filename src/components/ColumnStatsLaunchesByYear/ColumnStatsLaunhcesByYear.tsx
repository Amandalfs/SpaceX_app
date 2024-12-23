import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useQuery } from "@tanstack/react-query"
import { listDatasByYears } from "@/services/request"
import { Skeleton } from "../ui/skeleton"

const chartConfig = {
  falcon1: {
    label: "Falcon 1",
    color: "#6366f1",
  },
  falcon9: {
    label: "Falcon 9",
    color: "#6d28d9",
  },
  falcon9Reused: {
    label: "Falcon 9 (Reusable)",
    color: "#475569",
  },
  falconHeavy: {
    label: "Falcon Heavy ",
    color:  "#6ee7b7",
  },
} satisfies ChartConfig;

export function ColumnStatsLaunhcesByYear() {
  const { data, isLoading } = useQuery({
    queryKey: ["collumn-stats-launcheses"],
    queryFn: async () => {
      const stats = await listDatasByYears()
      const graphObject = {} as {
        [key: string]: {
          year: string;
          falcon1: number;
          falcon9: number;
          falcon9Reused: number;
          falconHeavy: number;
        };
      };

      if(stats){
        stats["Falcon 1_false"].forEach((item) => {
          graphObject[item.year] = {
            ...graphObject[item.year],
            year: item.year,
            falcon1: graphObject[item.year]?.falcon1 ? graphObject[item.year]?.falcon1 + item.count : item.count,
          };
        })
        stats["Falcon 9_false"].forEach((item) => {
          graphObject[item.year] = {
            ...graphObject[item.year],
            year: item.year,
            falcon9: graphObject[item.year]?.falcon9 ? graphObject[item.year]?.falcon9 + item.count : item.count,
          };
        })
        stats["Falcon 9_true"].forEach((item) => {
          graphObject[item.year] = {
            ...graphObject[item.year],
            year: item.year,
            falcon9Reused: graphObject[item.year]?.falcon9Reused ? graphObject[item.year]?.falcon9Reused + item.count : item.count,
          };
        })
        stats["Falcon Heavy_false"].forEach((item) => {
          graphObject[item.year] = {
            ...graphObject[item.year],
            year: item.year,
            falconHeavy: graphObject[item.year]?.falcon1 ? graphObject[item.year]?.falcon1 + item.count : item.count,
          };
        })
      }
      return Object.values(graphObject);
    }
  })
  
  return (
    <Card className="md:w-[600px] md:h-[400px] w-[360px]">
      <CardHeader className="text-center">
        <CardTitle className="text-lg">Gráfico de lançamentos de foguetes por ano</CardTitle>
      </CardHeader>
      <CardContent>
        {data && <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="year"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="falcon1"
              stackId="a"
              fill="var(--color-falcon1)"
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="falcon9"
              stackId="a"
              fill="var(--color-falcon9)"
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="falcon9Reused"
              stackId="a"
              fill="var(--color-falcon9Reused)"
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="falconHeavy"
              stackId="a"
              fill="var(--color-falconHeavy)"
              radius={[0, 0, 0, 0]}
            />
          </BarChart>
        </ChartContainer>}
        {
          isLoading && <Skeleton className="h-[300px]" />
        }
      </CardContent>
    </Card>
  )
}

