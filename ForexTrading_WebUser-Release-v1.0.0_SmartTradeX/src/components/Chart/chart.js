/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { format } from 'd3-format';
import { timeFormat } from 'd3-time-format';
import {
  discontinuousTimeScaleProviderBuilder,
  Chart,
  ChartCanvas,
  BarSeries,
  CandlestickSeries,
  lastVisibleItemBasedZoomAnchor,
  XAxis,
  YAxis,
  CrossHairCursor,
  EdgeIndicator,
  MouseCoordinateX,
  MouseCoordinateY,
  ZoomButtons,
  withDeviceRatio,
  withSize,
} from 'react-financial-charts';
import OHLCTooltip from './OHLCTooltip';
import {
  axisStyles,
  coordinateStyles,
  zoomButtonStyles,
  crossHairStyles,
  axisStylesY,
  axisStylesX,
} from './utils/constants';
import { yExtentsCalculator } from './service/candleStickService';
import { currencyFormatUSD } from '../../ultils/CurrencyFormat';

// Default green/red colors for candlesticks
const openCloseColor = d => (d.close > d.open ? '#36FFB5' : '#FF715E');

const FinancialChart = props => {
  const { priceDisplayFormat, margin, dateTimeFormat, updatedata, initialChartData, height, ratio, width } = props;
  const [resetCount, setResetCount] = useState(0);

  if (!height || !ratio || !width) return null;
  const timeDisplayFormat = timeFormat(dateTimeFormat);
  const xScaleProvider = discontinuousTimeScaleProviderBuilder().inputDateAccessor(d => d.date);
  const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(initialChartData);

  const min = xAccessor(data[Math.max(0, data.length - parseInt(width / 5))]);
  const max = xAccessor(data[data.length - 1]);
  const xExtents = [min, max + 1];

  const gridHeight = height - margin.top - margin.bottom;
  const barChartHeight = gridHeight / 5;
  const barChartOrigin = (_, h) => [0, h - barChartHeight];

  // ChartCanvas is drawn from top to bottom
  return (
    <ChartCanvas
      height={height}
      ratio={ratio}
      width={width}
      margin={margin}
      seriesName={`Chart ${resetCount}`}
      data={data}
      xScale={xScale}
      xAccessor={xAccessor}
      displayXAccessor={displayXAccessor}
      xExtents={xExtents}
      zoomAnchor={lastVisibleItemBasedZoomAnchor}
    >
      {/* Volume Chart */}
      {/*<Chart id={1} height={barChartHeight} origin={barChartOrigin} yExtents={d => d.volume}>*/}
      {/*  <BarSeries*/}
      {/*    fillStyle={d => (d.close > d.open ? 'rgba(38, 166, 154, 0.3)' : 'rgba(239, 83, 80, 0.3)')}*/}
      {/*    yAccessor={d => d.volume}*/}
      {/*  />*/}
      {/*</Chart>*/}

      {/* Price Chart */}
      <Chart id={2} yExtentsCalculator={yExtentsCalculator}>
        <XAxis {...axisStylesX} showGridLines />
        <MouseCoordinateX fontSize={10} displayFormat={timeDisplayFormat} {...coordinateStyles} />
        <YAxis {...axisStylesY} showGridLines />
        <MouseCoordinateY
          fontSize={10}
          // rectWidth={margin.right + 10}
          // displayFormat={priceDisplayFormat}
          displayFormat={format('.4f')}
          {...coordinateStyles}
        />

        {/* YAxis close price highlight */}
        <EdgeIndicator
          fontSize={11}
          itemType="last"
          // rectWidth={margin.right + 10}
          fill={openCloseColor}
          lineStroke={openCloseColor}
          displayFormat={priceDisplayFormat}
          yAccessor={d => d.close}
          textFill={'#1D1D42'}
        />

        <CandlestickSeries
          fill={d => (d.close > d.open ? '#FFCD08' : 'transparent')}
          wickStroke={d => (d.close > d.open ? '#FFCD08' : '#FFCD08')}
          stroke={'#FFCD08'}
        />
        {/*<OHLCTooltip fontSize={10} origin={[8, 16]} textFill={openCloseColor} className="react-no-select" />*/}
        {/*<ZoomButtons onReset={() => setResetCount(resetCount + 1)} {...zoomButtonStyles} />*/}
      </Chart>
      <CrossHairCursor {...crossHairStyles} />
    </ChartCanvas>
  );
};

FinancialChart.propTypes = {
  dateTimeFormat: PropTypes.string,
  height: PropTypes.number,
  margin: PropTypes.object,
  priceDisplayFormat: PropTypes.func,
  ratio: PropTypes.number,
  width: PropTypes.number,
};

FinancialChart.defaultProps = {
  dateTimeFormat: "%d %b '%y \xa0 %H:%M",
  height: 0,
  margin: { left: 0, right: 58, top: 0, bottom: 24 },
  priceDisplayFormat: format(''),
  ratio: 2,
  width: 0,
};

export const PriceChart = withSize({ style: { minHeight: 'calc(100vh - 343px)' } })(withDeviceRatio()(FinancialChart));
