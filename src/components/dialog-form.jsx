import React from 'react';
import {connect} from 'react-redux';

import Dialog from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';

import EventForm from '../components/event-form';
import LabourerForm from '../components/labourer-form';

class FormDialog extends React.Component {

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
      open: props.actions.open && !props.actions.filter,
    });
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {

    return (
      <div>
        <Dialog
          title={this.props.actions.d.title}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          titleStyle={{fontSize: 18, padding: '10px 20px', borderBottom: '0.5px solid rgb(224,224,224)'}}
          contentStyle={{width: '40%',}}
        >
          <Divider/>
          {this.props.actions.labourers?<LabourerForm handleDialogClose={this.handleClose}/>:<EventForm handleDialogClose={this.handleClose}/>}
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

export default connect(mapStateToProps)(FormDialog);