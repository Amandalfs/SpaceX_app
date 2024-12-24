import { useQuery } from "@tanstack/react-query";
import { getStatsPizza } from "../../services/request";
import { RocketStatus } from "./Stats/Stats";
import { Skeleton } from "../ui/skeleton";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
  } from "@/components/ui/chart"
import { Pie, PieChart } from "recharts"

const chartConfig = {
    count: {
        label: "count",
    },
    "Falcon Heavy": {
        label: "Falcon Heavy",
        color: "#6ee7b7"
    },
    "Falcon 1": {
        label: "Falcon1",
        color: "#6366f1",
    },
    "Falcon 9": {
        label: "Falcon 9",
        color: "#6d28d9",
    },
    "Falcon 9 Reused": {
        label: "Falcon 9 Reusavel ",
        color: "#475569",
    }
    
} satisfies ChartConfig

export function StatsOfLaunches(){
    const { data, isLoading } = useQuery({
        queryKey: ['stats-pizza'],
        queryFn: async () => {
            const response = await getStatsPizza();
            const formatedStats = response.statsPizza.map((stats)=> {
                if(stats.used){
                    return {
                        ...stats,
                        name: `${stats.name} Reused`,
                    }
                }
                return stats
            });

            return {
                ... response,
                statsPizza: formatedStats
            };
        }
    })

    const statsPizza = data?.statsPizza ?? [];
    const success = data?.success ?? 0;
    const failures = data?.failures ?? 0;

    return (<Card className="w-[600px] h-[400px]">
        <CardHeader className="text-center">
            <CardTitle className="text-lg">Lançamentos de foguetes</CardTitle>
        </CardHeader>
        <CardContent className="md:flex md:flex-row md:justify-between md:items-center">
            <div className="md:flex md:flex-col gap-8">
                <div className="hidden md:flex md:flex-col md:gap-2">
                    <div className="flex flex-row gap-2 items-center">
                        <RocketStatus status="black" />
                        <h3 className="font-sans font-semibold text-sm  text-primary">Falcon 9 Reusado</h3>
                    </div>

                    <div className="flex flex-row gap-2 items-center">
                        <RocketStatus status="violet" />
                        <h3 className="font-sans font-semibold text-sm  text-primary">Falcon 9 Novo</h3>
                    </div>

                    <div className="flex flex-row gap-2 items-center">
                        <RocketStatus status="blue" />
                        <h3 className="font-sans font-semibold text-sm  text-primary">Falcon 1</h3>
                    </div>

                    <div className="flex flex-row gap-2 items-center">
                        <RocketStatus status="gray" />
                        <h3 className="font-sans font-semibold text-sm  text-primary">Falcon Heavy</h3>
                    </div>
                    
                </div>
                {
                    isLoading &&
                        (<div className="md:flex md:flex-col md:gap-2">
                            <Skeleton className="w-[140px] h-[20px] rounded-lg md:h-6" />
                            <Skeleton className="w-[140px] h-[20px] rounded-lg md:h-6" />
                        </div>)
                }
                {
                    data &&  
                    (<div className="hidden md:flex md:flex-col md:gap-2">
                        <p className="font-sans font-semibold text-sm  text-primary">Sucessos: <span className="text-success-50 font-bold">{success}</span></p>
                        <p className="font-sans font-semibold text-sm  text-primary">Falhas: <span className="text-failure-150 font-bold">{failures}</span></p>
                    </div>)
                }
            </div>
            { 
               isLoading && 
                <Skeleton className="w-[400px] h-[250px]" />
            }
            {   
                statsPizza &&  !isLoading && <ChartContainer
                    config={chartConfig}
                    className="aspect-square md:w-[400px] md:h-[300px] w-[50%] h-[50%] mx-auto"
                >
                    <PieChart>
                        <ChartTooltip content={<ChartTooltipContent nameKey="name" hideLabel />}/>
                        <Pie
                            data={statsPizza.map((entry) => {
                                const configItem = chartConfig[entry.name as keyof typeof chartConfig];
                                return {
                                    ...entry,
                                    fill: 'color' in configItem ? configItem.color : "#D9D9D9",
                                };
                            })}
                            dataKey="count"
                            labelLine={false}
                            label={({ payload, ...props }) => {
                                return (
                                <text
                                    cx={props.cx}
                                    cy={props.cy}
                                    x={props.x}
                                    y={props.y}
                                    textAnchor={props.textAnchor}
                                    dominantBaseline={props.dominantBaseline}
                                    fill={"hsla(var(--foreground))"}
                                >
                                    {payload.name}
                                </text>
                                )
                            }}
                            nameKey="name"
                        />
                    </PieChart>
                </ChartContainer>
            }
            <CardFooter className="flex md:hidden justify-center">
                <p className="font-sans font-semibold text-sm  text-primary">Sucesso: <span className="text-success-50 font-bold">{success}</span></p>
                <p className="font-sans font-semibold text-sm  text-primary">Falha: <span className="text-failure-50 font-bold">{failures}</span></p>
            </CardFooter>
        </CardContent>
    </Card>)
}

