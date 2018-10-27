import React from 'react';
import Dialog from 'material-ui/Dialog';
import CircularProgress from 'material-ui/CircularProgress';

export default class Progress extends React.Component {
  
  state = {
    open: this.props.open,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    return (
      <div>
        <Dialog modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          contentStyle={{
            width: '30%',
            textAlign: 'center',
          }}
        >
          <CircularProgress />
        </Dialog>
      </div>
    );
  }
}