import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const TreasuryChart = ({ title, data }) => {
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
    tooltip: {
      formatter: function () {
        return `Month: <b>${this.x}</b><br/>Value: <b>${this.y}</b>`;
      }
    },
    plotOptions: {
      series: {
        cursor: 'pointer',
        point: {
          events: {
            click: function () {
              alert(`Month: ${this.category}\nValue: ${this.y}`);
            }
          }
        }
      }
    },
    credits: {
      enabled: false
    }
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default TreasuryChart;
