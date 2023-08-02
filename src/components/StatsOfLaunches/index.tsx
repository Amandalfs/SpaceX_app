import { VictoryPie } from "victory";
import { useState, useEffect } from 'react';
import { apiSpace } from "../../services/api";

export function StatsOfLaunches(){
    const [statsPizza, setStatsPizza] = useState([]);
    const [success, setSuccess] = useState(0);
    const [failures, setFailures] = useState(0);

    async function getStatsPizza(){
        const response = await apiSpace.get("/launches/stats");
        setSuccess(response.data.success);
        setFailures(response.data.failures);
        setStatsPizza(response.data["statsPizza"]);
    }

    useEffect(()=>{
        getStatsPizza()
    },[]);

    return (<div className="flex flex-col w-full h-30 bg-gray-100 pt-4 px-8 md:w-[500px] md:h-[400px]">
        <div className="hidden md:flex md:justify-center">
            <h1 className="font-sans font-semibold text-xl  text-black">Lançamentos de foguetes</h1>
        </div>
        <div className="md:flex md:flex-row md:justify-between md:items-center">
            <div className="md:flex md:flex-col gap-8">
                <div className="hidden md:flex md:flex-col md:gap-2">
                    <div className="flex flex-row gap-2 items-center">
                        <div className="h-4 w-4 bg-black">
                        </div>
                        <h3 className="font-sans font-semibold text-sm  text-black">Old Falcon 9</h3>
                    </div>

                    <div className="flex flex-row gap-2 items-center">
                        <div className="h-4 w-4 bg-orange-50">
                        </div>
                        <h3 className="font-sans font-semibold text-sm  text-black">New Falcon 9</h3>
                    </div>

                    <div className="flex flex-row gap-2 items-center">
                        <div className="h-4 w-4 bg-blue">
                        </div>
                        <h3 className="font-sans font-semibold text-sm  text-black">Falcon 1</h3>
                    </div>

                    <div className="flex flex-row gap-2 items-center">
                        <div className="h-4 w-4 bg-gray-50">
                        </div>
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