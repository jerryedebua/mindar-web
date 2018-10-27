import React from 'react';
import {connect} from 'react-redux';

import Dialog from 'material-ui/Dialog';
import DateRangePicker from './date-range-picker';

class DateFilter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({
      open: props.actions.filter,
    });
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {

  	/* GET title FROM DateRangePicker */
    return (
      <div>
        <Dialog
          title="Select date range"
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          titleStyle={{fontSize: 18, padding: '10px 20px', borderBottom: '0.5px solid rgb(224,224,224)'}}
          contentStyle={{width: '45%'}}
        >
          <DateRangePicker/>
        </Dialog>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    actions: state.actions
  }
}

export default connect(mapStateToProps)(DateFilter);