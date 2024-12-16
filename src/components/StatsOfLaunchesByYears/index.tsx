import { VictoryBar, VictoryChart, VictoryAxis } from "victory";
import { useQuery } from "@tanstack/react-query";
import { listDatasByYears } from "../../services/request";

interface IStats {
  rocketName: string,
  rocketId: string,
  year: string,
  reused: boolean,
  count:  number,

}

const renderChart = (data: IStats[], color: string) => {
  return (
    <VictoryBar
      data={data}
      x="year"
      y="count"
      barWidth={20}
      style={{ data: { fill: color } }}
    />
  );
};

export function StatsOfLaunchesByYears(){
  const { data } = useQuery({
    queryKey: ["collumn-stats-launcheses"],
    queryFn: ()=> {
      const response = listDatasByYears()
      return response;
    }
  })

  const stats = data ?? {};

  return (
    <div className="w-full bg-white mt-8 mb-8 md:w-[500px] md:h-[400px] rounded-lg shadow-md">
      <div className="h-60 md:h-96">
        <VictoryChart>
          {renderChart(stats["Falcon 1_false"], "#D9D9D9")}
          {renderChart(stats["Falcon 9_false"], "#F57C00")}
          {renderChart(stats["Falcon 9_true"], "#000000")}
          {renderChart(stats["Falcon Heavy_false"], "#1267FC")}
          <VictoryAxis
            tickValues={[ 
              2000, 2001, 2002, 
              2003, 2004, 2005, 
              2006, 2007, 2008, 
              2009, 2010, 2011, 
              2012, 2013, 2014, 
              2015, 2016, 2017, 
              2018, 2019, 2020, 
              2021, 2022]}
          />
          <VictoryAxis
            dependentAxis            
            tickFormat={(x) => `${x}`}
            />
        </VictoryChart>
      </div>
    </div>)
}
