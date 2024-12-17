import { VictoryPie } from "victory";
import { useQuery } from "@tanstack/react-query";
import { getStatsPizza } from "../../services/request";
import { RocketStatus } from "./Stats/Statst";
import { Skeleton } from "../ui/skeleton";

export function StatsOfLaunches(){
    const { data, isLoading } = useQuery({
        queryKey: ['stats-pizza'],
        queryFn: async () => {
            const response = await getStatsPizza();
            return response;
        }
    })

    const statsPizza = data?.statsPizza ?? [];
    const success = data?.success ?? 0;
    const failures = data?.failures ?? 0;

    return (<div className="flex flex-col w-full h-30 bg-white pt-4 px-8 md:w-[500px] md:h-[400px] rounded-lg box-shadow-[0_0_8px_0px_rgba(0,0,0,0.25)]">
        <div className="hidden md:flex md:justify-center">
            <h1 className="font-sans font-semibold text-xl  text-black">Lançamentos de foguetes</h1>
        </div>
        <div className="md:flex md:flex-row md:justify-between md:items-center">
            <div className="md:flex md:flex-col gap-8">
                <div className="hidden md:flex md:flex-col md:gap-2">
                    <div className="flex flex-row gap-2 items-center">
                        <RocketStatus status="black" />
                        <h3 className="font-sans font-semibold text-sm  text-black">Old Falcon 9</h3>
                    </div>

                    <div className="flex flex-row gap-2 items-center">
                        <RocketStatus status="violet" />
                        <h3 className="font-sans font-semibold text-sm  text-black">New Falcon 9</h3>
                    </div>

                    <div className="flex flex-row gap-2 items-center">
                        <RocketStatus status="blue" />
                        <h3 className="font-sans font-semibold text-sm  text-black">Falcon 1</h3>
                    </div>

                    <div className="flex flex-row gap-2 items-center">
                        <RocketStatus status="gray" />
                        <h3 className="font-sans font-semibold text-sm  text-black">Falcon Heavy</h3>
                    </div>
                    
                </div>
                {
                    isLoading &&
                        (<div className="md:flex md:flex-col md:gap-2">
                            <Skeleton className="w-full h-4 rounded-lg md:h-6" />
                            <Skeleton className="w-full h-4 rounded-lg md:h-6" />
                        </div>)
                }
                {
                    data &&  
                    (<div className="md:flex md:flex-col md:gap-2">
                        <p className="font-sans font-semibold text-sm  text-black">Sucesso: <span className="text-success-50 font-bold">{success}</span></p>
                        <p className="font-sans font-semibold text-sm  text-black">Falha: <span className="text-failure-50 font-bold">{failures}</span></p>
                    </div>)
                }
            </div>
            { 
               isLoading && 
               <Skeleton className="flex rounded-full w-[280px] h-[280px] mt-8" />
            }
            {data && <div className="hidden md:flex md:w-[300px] md:h=[300px]">
                <VictoryPie 
                    colorScale={["#000000", "#D9D9D9", "#1267FC", "#6d28d9" ]}
                    data={statsPizza}
                    x="name"
                    y="count"
                />
            </div>}
        </div>
    </div>)
}

