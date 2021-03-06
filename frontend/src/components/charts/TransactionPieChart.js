import React, { Component } from "react";
import CanvasJSReact from "../../canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
export class TransactionChart extends Component {
  render() {
    const options = {
      //exportEnabled: true,
      animationEnabled: true,
      title: {
        text: ""
      },
      data: [
        {
          type: "pie",
          startAngle: 75,
          toolTipContent: "<b>{label}</b>: {y}%",
          indexLabelFontSize: 16,
          indexLabel: "{label} - {y}%",
          dataPoints: []
        }
      ]
    };
    var totals = {};
    var total = 0;
    for (var i in this.props.data) {
      let amount = this.props.data[i].amount;
      total += Number(amount);
      let name = this.props.data[i].cat_name;
      totals[name] = totals[name]
        ? Number(totals[name]) + Number(amount)
        : Number(amount);
    }
    for (var key in totals) {
      if (totals.hasOwnProperty(key)) {
        let percent = (totals[key] / total) * 100;
        var d = {
          y: percent.toFixed(1),
          label: key
        };
        options.data[0].dataPoints.push(d);
      }
    }
    options.title.text = this.props.name;
    return (
      <div>
        <CanvasJSChart options={options} />
      </div>
    );
  }
}

export default TransactionChart;
