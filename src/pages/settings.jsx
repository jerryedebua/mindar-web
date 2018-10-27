import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import action from '../actions/outerbar'

import Log from '../components/settings-log'

class Settings extends Component {

  componentWillMount() {
  	/* update toolbar on mount */
  	this.props.action('settings');
  }

  render() {
  	return (
      <div><Log/></div>
    );
  }

}

function mapStateToProps(state) {
	return {
		settings: state.settings
	}
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({action: action}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Settings);
