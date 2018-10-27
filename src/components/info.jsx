import React from 'react';
import {connect} from 'react-redux';

import Snackbar from 'material-ui/Snackbar';

class InfoSnackbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      open: props.actions.showMessage || false,
    });
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    return (
      <div>
        <Snackbar
          open={this.state.open}
          message={this.props.actions.message || ''}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    actions: state.actions
  }
}

export default connect(mapStateToProps)(InfoSnackbar);