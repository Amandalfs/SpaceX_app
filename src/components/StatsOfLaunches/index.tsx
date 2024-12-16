import { VictoryPie } from "victory";
import { useQuery } from "@tanstack/react-query";
import { getStatsPizza } from "../../services/request";
import { RocketStatus } from "./Stats/Statst";

export function StatsOfLaunches(){
    const { data } = useQuery({
        queryKey: ['stats-pizza'],
        queryFn: async () => {
            const response = await getStatsPizza();
            return response;
        }
    })

    const statsPizza = data?.statsPizza ?? [];
    const success = data?.success ?? 0;
    const failures = data?.failures ?? 0;

    return (<div className="flex flex-col w-full h-30 bg-white pt-4 px-8 md:w-[500px] md:h-[400px] rounded-lg shadow-md">
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
                        <RocketStatus status="orange" />
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
                <div className="md:flex md:flex-col md:gap-2">
                    <div className="flex w-full justify-center items-center md:items-end md:justify-start md:w-[98px]">
                        <h1 className="font-sans font-bold text-1xl  text-black md:text-sm">
                            Resultado de lançamento:
                        </h1>
                    </div>
                    <div className="flex flex-col p-4 gap-2 md:gap-1 md:p-0">
                        <p className="font-sans font-semibold text-sm  text-black">Sucesso: <span className="text-success-50 font-bold">{success}</span></p>
                        <p className="font-sans font-semibold text-sm  text-black">Falha: <span className="text-failure-50 font-bold">{failures}</span></p>
                    </div>
                </div>

            </div>
            <div className="hidden md:flex md:w-[300px] md:h=[300px]">
                <VictoryPie 
                    colorScale={["#000000", "#D9D9D9", "#1267FC", "#F57C00" ]}
                    data={statsPizza}
                    x="name"
                    y="count"
                />
            </div>
        </div>
    </div>)
}