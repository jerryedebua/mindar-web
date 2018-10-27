import React, { Component } from 'react';
import {connect} from 'react-redux';

import Log from '../components/events-log'

import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';

import muiThemeable from 'material-ui/styles/muiThemeable';

let google = window.google;

const styles = {
    header: {
        paddingLeft: 10, lineHeight: '47px'
    }
};

class Home extends Component {

  constructor(props) {
    super(props);
    this.drawChart = this.drawChart.bind(this);
  }

  componentWillMount() {
  	google.charts.load('current', {packages:['corechart']});
  	google.charts.setOnLoadCallback(this.drawChart);
  }

  drawChart() {
  	var data = google.visualization.arrayToDataTable([
      ['Transactions', ''],
      ['Expenses',      3],
      ['Sales',     7],
    ]);

    var chart = new google.visualization.PieChart(document.getElementById('chart-container'));
    chart.draw(data, { 
    	height: 400,
    	pieHole: 0.3,
    	pieSliceTextStyle: {
    		color: 'white',
    	},
    	slices: {
	        0: { color: this.props.muiTheme.palette.expenses },
	        1: { color: this.props.muiTheme.palette.sales }
	    }, legend: { position: 'bottom' } });
  }

  render() {
  	return (
  		<div>
  		  <Subheader style={styles.header}>{this.props.title || 'Transactions'}</Subheader>
        <Divider/>
	      <div className="row">
	      	<div className="col-sm-7 c0l-xs-12"><Log events={this.props.events}/></div>
	      	<div className="col-sm-5 c0l-xs-12">
	      		<div id="chart-container"></div>
	      	</div>
	      </div>
	    </div>
    );
  }
}

function mapStateToProps(state) {
	return {
		events: state.events
	}
}

export default connect(mapStateToProps)(muiThemeable()(Home));
