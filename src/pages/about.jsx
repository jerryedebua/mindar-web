import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import action from '../actions/outerbar'

import Button from 'material-ui/RaisedButton';
import Slider from 'material-ui/Slider';
import Paper from 'material-ui/Paper';
import ActionHome from 'material-ui/svg-icons/action/home';

const style = {
  height: 150,
  width: 150,
  margin: 40,
  textAlign: 'center',
  display: 'inline-block',
};

class About extends Component {
  componentWillMount() {
  	/* update toolbar on mount */
  	this.props.action('about');
  }

  render() {
    return (
      <div style={{textAlign: 'center', margin: '20px 0' }}>
        Mindar v1.0 Demo
        <div style={{textAlign: 'center',}}>
          <Paper style={style} zDepth={2} circle={true}>
            <ActionHome style={{margin:60,}}/>
          </Paper>
        </div>
        <div style={{ margin: '25px auto', width: '40%' }}>
          Rate Mindar
          <Slider step={0.1} value={0.1}/>
        </div>
        <div style={{ margin: '15px 0' }}><Button label="Terms of service" primary={true}/></div>
      </div>
    );
  }
}

function mapStateToProps(state) {
	return {}
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({action: action}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(About);