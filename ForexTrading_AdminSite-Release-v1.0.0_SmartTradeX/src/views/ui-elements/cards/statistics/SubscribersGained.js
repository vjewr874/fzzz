// @ts-nocheck
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Users } from 'react-feather'
import StatsWithAreaChart from '@components/widgets/stats/StatsWithAreaChart'

const SubscribersGained = ({ kFormatter, data, title = "", icon, color="primary", warning }) => {
  const [dataChart, setDataChart] = useState(null)
  useEffect(() => {
    axios.get('/card/card-statistics/subscribers').then(res => setDataChart(res.data))
  }, [])

  const options = {
    chart: {
      id: 'revenue',
      toolbar: {
        show: false
      },
      sparkline: {
        enabled: true
      }
    },
    grid: {
      show: false
    },
    colors: [warning],
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 2.5
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 0.9,
        opacityFrom: 0.7,
        opacityTo: 0.5,
        stops: [0, 80, 100]
      }
    },

    xaxis: {
      labels: {
        show: false
      },
      axisBorder: {
        show: false
      }
    },
    yaxis: {
      labels: {
        show: false
      }
    },
    tooltip: {
      x: { show: false }
    }
  }

  return data !== null  && dataChart !==null? (
    <StatsWithAreaChart
      icon={icon ? icon :<Users size={21} />}
      color={color}
      stats={kFormatter(data)}
      statTitle={title}
      series={dataChart.series}
      type='area'
      options={options}
    />
  ) : null
}

export default SubscribersGained
