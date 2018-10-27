import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import action from '../actions/outerbar'

import { Link } from 'react-router-dom';

import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

import ActionSettings from 'material-ui/svg-icons/action/settings';
import ActionHelp from 'material-ui/svg-icons/action/help-outline';
import ActionInfo from 'material-ui/svg-icons/action/info-outline';

class DrawerList extends React.Component {
  render() {
    return (
      <div>
  	    <Link style={{'textDecoration': 'none'}} to="/about"><MenuItem style={{padding: '15px 0 15px 0'}} onClick={()=>this.props.action('about')}>Mindar Demo</MenuItem></Link>
  	    <Divider/>
        <Link style={{'textDecoration': 'none'}} to="/settings"><MenuItem primaryText="Settings" rightIcon={<ActionSettings />} onClick={()=>this.props.action('settings')} /></Link>
        <Link style={{'textDecoration': 'none'}} to="/help"><MenuItem primaryText="Help" rightIcon={<ActionHelp />} onClick={()=>this.props.action('help')} /></Link>
        <Link style={{'textDecoration': 'none'}} to="/about"><MenuItem primaryText="About" rightIcon={<ActionInfo />} onClick={()=>this.props.action('about')} /></Link>
        <Divider/>
        <Link style={{'textDecoration': 'none'}} to="/logout"><MenuItem onClick={()=>this.props.action('about')}>Log out</MenuItem></Link>
  	  </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    actions: state.actions
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({action: action}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(DrawerList);