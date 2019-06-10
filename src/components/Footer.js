import React from "react";
import {
    Charts,
    ChartContainer,
    ChartRow,
    YAxis,
    BarChart,
} from "react-timeseries-charts";
import { TimeSeries, Index } from "pondjs";

const Chart = props => {
  const sampleData = [
    ["2017-01-24T10:00", 0.39],
    ["2017-01-24T23:00", 0.28]
  ];
  const { data, tempUnit } = props;
  const YAxisLabel = `Temperature (°${tempUnit})`;
  const YAxisMaxVal = tempUnit === 'C' ? 30 : 80;
  const points = data[0] ? data[0].list.map(({ dt_txt, main: { temp }})=> [
    dt_txt,
    temp
  ]): sampleData; 

  const series = new TimeSeries({
    name: "Weather Check",
    columns: ["index", "value"],
    points: points.map(([d, value]) => [
        Index.getIndexString("1h", new Date(d)),
        value
    ])
  });
  return (
    <footer>
      <div className="row">
        <div className="col s12 m6">
          <ChartContainer timeRange={series.range()} >
            <ChartRow height="150">
              <YAxis
                id="temp"
                label={YAxisLabel}
                width="70"
                type="linear"
                labelOffset={-5} 
                format=",.1f"
                 min={10} max={YAxisMaxVal}
              />
              <Charts>
                <BarChart
                  axis="temp"
                  spacing={1}
                  columns={["value"]}
                  series={series}
                />
              </Charts>
            </ChartRow>
          </ChartContainer>
        </div>
	  </div>
    </footer>
  );
};

export default Chart;
