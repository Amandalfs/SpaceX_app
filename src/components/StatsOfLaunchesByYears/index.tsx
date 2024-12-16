import { VictoryBar, VictoryChart, VictoryAxis } from "victory";
import { useEffect, useState } from 'react';
import { apiSpace } from "../../services/api";

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
  const [stats, setStats] = useState({
    "Falcon 1_false": [{
      rocketName: "",
      rocketId: "",
      year: "",
      reused: false,
      count:  0,
    }],
    "Falcon 9_false": [{
      rocketName: "",
      rocketId: "",
      year: "",
      reused: false,
      count:  0,
    }],
    "Falcon 9_true": [{
      rocketName: "",
      rocketId: "",
      year: "",
      reused: false,
      count:  0,
    }],
    "Falcon Heavy_false": [{
      rocketName: "",
      rocketId: "",
      year: "",
      reused: false,
      count:  0,
    }]
  });

  async function listDatasByYears() {
    const response = await apiSpace.get("/launches/stats/years");
    console.log(response);
    setStats(response.data.stats);
  }

  useEffect(()=>{
    listDatasByYears();
  },[])


  return (
    <div className="w-full bg-gray-100 mt-8 mb-8 md:w-[500px] md:h-[400px]">
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
