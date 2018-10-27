import React from 'react';
import {connect} from 'react-redux';

import {List, ListItem} from 'material-ui/List';
import Dialog from 'material-ui/Dialog';
import LanguageList from '../components/language-list';

class ContentDialog extends React.Component {

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
      open: props.actions.modify_setting ? props.actions.modify_setting : false,
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
          title={this.props.actions.title}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          titleStyle={{fontSize: 20, padding: '10px 20px', borderBottom: '0.5px solid rgb(224,224,224)'}}
          contentStyle={{width:'30%'}}
          bodyStyle={{padding:0}}
        >
          { this.props.actions.setting ? 
            (this.props.actions.setting.id === 1 ?
              <LanguageList handleDialogClose={this.handleClose}/>:
              (
                <List>
                  <ListItem primaryText="Value 1" />
                  <ListItem primaryText="Value 2" />
                </List>
              )):
            null}
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

export default connect(mapStateToProps)(ContentDialog);