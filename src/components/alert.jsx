import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import inform from '../actions/after-action'
import payLabourer from '../actions/labourer-pay'
import removeLabourer from '../actions/labourer-remove'
import removeEvent from '../actions/event-remove'

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class Alert extends React.Component {
  
  state = {
    open: false,
    title: 'Confirm you want to remove the item'
  };

  componentWillReceiveProps(props) {
    this.setState({
      open: props.actions.alert,
      title: props.actions.title,
    });
  }

  handleClose = () => {
    this.setState({open: false});
  };

  handleRemove = () => {
    this.handleClose();
    if (!this.props.actions.pay) {
      if (this.props.actions.labourers) {
        this.props.removeLabourer(this.props.actions.item.index);
      } else {
        this.props.removeEvent(this.props.actions.item.index);
      }
      this.props.inform(this.props.actions.labourers ? 'Labourer removed' : (this.props.actions.item.is_sale?'Sale removed':'Expense removed'));
    } else {
      if (this.props.actions.item) {
        this.props.payLabourer(this.props.actions.item);
      } else {
        this.props.labourers.map((labourer, i)=>{
          return this.props.payLabourer(labourer);
        });
      }
      
      this.props.inform(this.props.actions.item ? 'Payment made' : 'Payments made');
    }
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label={this.props.actions.pay?"Pay":"Remove"}
        primary={true}
        onClick={this.handleRemove}
      />,
    ];

    return (
      <div>
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          titleStyle={{fontSize: 20, padding: '10px 20px', borderBottom: '0.5px solid rgb(224,224,224)'}}
          contentStyle={{width: '30%',}}
        >
          {this.state.title}
        </Dialog>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    actions: state.actions,
    labourers: state.labourers,
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({inform: inform, removeEvent: removeEvent, removeLabourer: removeLabourer, payLabourer: payLabourer}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Alert);