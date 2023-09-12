/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React from 'react';
import {
  Chart,
  ChartCanvas,
  discontinuousTimeScaleProviderBuilder,
  elderRay,
  ema,
  lastVisibleItemBasedZoomAnchor,
  LineSeries,
} from 'react-financial-charts';

function ChartPrice(props) {
  const { initialChartData, corePercent } = props;
  const ScaleProvider = discontinuousTimeScaleProviderBuilder().inputDateAccessor(d => new Date(d.date));
  // const height = 200;
  const height = 40;

  const width = 100;
  const margin = { left: 0, right: 0, top: 0, bottom: 0 };

  const ema12 = ema()
    .id(1)
    .options({ windowSize: 12 })
    .merge((d, c) => {
      d.ema12 = c;
    })
    .accessor(d => d.ema12);

  const ema26 = ema()
    .id(2)
    .options({ windowSize: 26 })
    .merge((d, c) => {
      d.ema26 = c;
    })
    .accessor(d => d.ema26);

  const elder = elderRay();

  const calculatedData = elder(ema26(ema12(initialChartData)));
  const { data, xScale, xAccessor, displayXAccessor } = ScaleProvider(initialChartData);
  // const max = xAccessor(data[data.length - 1]);
  // const min = xAccessor(data[Math.max(0, data.length - 100)]);
  // const xExtents = [min, max + 5];
  const min = xAccessor(data[0]);
  const max = xAccessor(data[data.length - 1]);
  const xExtents = [min, max + 1];

  const gridHeight = height - margin.top - margin.bottom;

  // const elderRayHeight = 150;
  const elderRayHeight = 5;

  const chartHeight = gridHeight - elderRayHeight;

  const candleChartExtents = data => {
    // return [data.high, data.low];
    return [data.close];
  };

  const colorChart = data[data?.length - 1].close - data[0].close;

  return (
    <ChartCanvas
      disableInteraction={true}
      disableZoom={true}
      height={height}
      ratio={1}
      width={width}
      margin={margin}
      data={data}
      displayXAccessor={displayXAccessor}
      seriesName="Data"
      xScale={xScale}
      xAccessor={xAccessor}
      xExtents={xExtents}
      zoomAnchor={lastVisibleItemBasedZoomAnchor}
    >
      <Chart id={3} height={chartHeight} yExtents={candleChartExtents}>
        <LineSeries
          yAccessor={ema12.accessor()}
          strokeStyle={corePercent > 0 ? '#36FFB5' : ' #FF715E'}
          highlightOnHover={false}
        />
      </Chart>
    </ChartCanvas>
  );
}
export default ChartPrice;
