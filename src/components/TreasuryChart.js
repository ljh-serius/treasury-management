import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const TreasuryChart = ({ title, data, onHover }) => {
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
    series: data,
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
              onHover(this.series.name);
            },
            mouseOut: function () {
              onHover(null);
            }
          }
        }
      }
    }
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default TreasuryChart;
