import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const TreasuryChart = ({ title, data }) => {
  const options = {
    title: {
      text: title,
    },
    xAxis: {
      categories: [
        "Initial", "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"
      ],
    },
    yAxis: {
      title: {
        text: 'Amount',
      },
    },
    series: data.map(series => ({
      ...series,
      data: series.data, // No conditional coloring
    })),
    credits: {
      enabled: false,
    },
    tooltip: {
      formatter: function () {
        return `Month: <b>${this.x}</b><br/>Value: <b>${this.y}</b>`;
      },
    },
    plotOptions: {
      series: {
        point: {
          events: {
            mouseOver: function () {
              const monthIndex = this.index; // Kept this if you need it for other purposes
            },
          },
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default TreasuryChart;
