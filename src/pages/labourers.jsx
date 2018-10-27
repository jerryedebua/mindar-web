import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Log from '../components/labourers-log'

import action from '../actions/outerbar'

class Labourers extends Component {

  componentWillMount() {
  	/* update toolbar on mount */
  	this.props.action('labourers');
  }

  render() {
  	return (
      <div><Log/></div>
    );
  }

}

function mapStateToProps(state) {
	return {
		labourers: state.labourers
	}
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({action: action}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Labourers);
