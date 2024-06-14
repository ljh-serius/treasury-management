import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const TreasuryChart = ({ title, data, onHover, highlightedCumulativeMonth }) => {
  const options = {
    title: {
      text: title
    },
    xAxis: {
      categories: ["Initial", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    },
    yAxis: {
      title: {
        text: 'Amount'
      }
    },
    series: data.map(series => ({
      ...series,
      data: series.data.map((point, index) => ({
        y: point,
        color: highlightedCumulativeMonth !== null && index <= highlightedCumulativeMonth + 1 ? 'rgba(255, 0, 0, 0.5)' : null // Highlight up to the selected month
      }))
    })),
    credits: {
      enabled: false
    },
    tooltip: {
      formatter: function () {
        return `Month: <b>${this.x}</b><br/>Value: <b>${this.y}</b>`;
      }
    },
    plotOptions: {
      series: {
        point: {
          events: {
            mouseOver: function () {
              const monthIndex = this.index;
              onHover(this.series.name, monthIndex);
            },
            mouseOut: function () {
              onHover(null, null);
            }
          }
        }
      }
    }
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default TreasuryChart;
