import React, { Component } from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';

const styles = {
    header: {
        paddingLeft: 10, lineHeight: '47px'
    },
    card: { marginTop: 20}
}

let google = window.google;

class Growth extends Component {

  constructor(props) {
    super(props);
    this.drawChart = this.drawChart.bind(this);
  }

  componentWillMount() {
  	
    google.charts.load('current', {packages:['corechart']});
  	google.charts.setOnLoadCallback(this.drawChart);

  }

  drawChart() {

    var data = new google.visualization.DataTable();
          
    data.addColumn('string');
    data.addColumn('number', 'Profit margin');
    data.addColumn('number', 'Sales');
    data.addColumn('number', 'Expenses');
          
    data.addRows([
      ['Mon', 167, 373, 489],
      ['Tue', 918, 373, 489],
      ['Wed', 489, 918, 167],
      ['Thur', 373, 918, 267],
      ['Fri', 267, 373, 167],
      ['Sat', 489, 918, 167],
      ['Sun', 373, 918, 267],
    ]);

    var options = {
      vAxis: { gridlines: { count: 3 } },
      chartArea: {
        width: '85%',
        height: '70%',
        top: 10,
        left: '8%',
        right: '5%',
      },
      legend: { position: 'bottom' },
      curveType: 'function',
    };

    var chart = new google.visualization.LineChart(document.getElementById('chart-container'));
    chart.draw(data, options);

    /*document.getElementById('chart-container').onchange = function() {
      options['vAxis']['format'] = this.value;
      chart.draw(data, options);
    };*/

  }

  render() {
    return (
      <div>
        <Subheader style={styles.header} className="col-sm-10">
          Growth analysis -- Still needs to be thought through
        </Subheader>
        <Divider/>
        <div className="row" style={{ paddingTop: '20px' }}>
          <div className="col-sm-3">
            <Card>
        		  <CardHeader title="Total sales"/>
        		  <CardText>12000</CardText>
      	  	</Card>
            <Card style={styles.card}>
        		  <CardHeader title="Total expenses"/>
        		  <CardText>0</CardText>
      	  	</Card>
            <Card style={styles.card}>
        		  <CardHeader title="Profit margin"/>
        		  <CardText>12000</CardText>
      	  	</Card>
          </div>
          <div className="col-sm-9">
            <Card style={{ height: '100%' }}>
        		  <CardHeader title="Profit margin, sales, expenses over time"/>
        		  <CardText>
        	      	<div id="chart-container" style={{width:'100%', height:'295px'}}></div>
      	      </CardText>
      	  	</Card>
          </div>
        </div>
      </div>
    );
  }
}

export default Growth;
