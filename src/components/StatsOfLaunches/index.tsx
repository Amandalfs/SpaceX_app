
export function StatsOfLaunches(){
    return (<div className="flex flex-col w-full h-30 bg-gray-100 pt-4 px-8">
        <div className="flex w-full justify-center items-center">
            <h1 className="font-sans font-bold text-1xl  text-black">
                Resultado de lançamento:
            </h1>
        </div>
        <div className="flex flex-col p-4 gap-2">
            <p className="font-sans font-semibold text-sm  text-black">Sucesso: <span className="text-success-50 font-bold">70</span></p>
            <p className="font-sans font-semibold text-sm  text-black">Falha: <span className="text-failure-50 font-bold">30</span></p>
        </div>
    </div>)
}