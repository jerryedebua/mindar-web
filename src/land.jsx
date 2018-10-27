import React, { Component } from 'react';
import {connect} from 'react-redux';

import App from './app';
import AppAuthenticate from './app-authenticate';

class Land extends Component {

  constructor(props) {
    super(props);
    this.state = {
      authenticate: props.auth.authenticate,
    };
  }

  componentWillReceiveProps(props) {
    console.log(props.auth);
    this.setState({ authenticate: props.auth.authenticate});
  }

  render() {

    return (
      this.state.authenticate ? <AppAuthenticate/> : <App/>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    actions: state.actions
  }
}

export default connect(mapStateToProps)(Land);