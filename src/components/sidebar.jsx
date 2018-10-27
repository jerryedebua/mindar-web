import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { Link } from 'react-router-dom';

import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';

import ActionGrade from 'material-ui/svg-icons/action/grade';
import AccountCircle from 'material-ui/svg-icons/action/account-circle';

import action from '../actions/outerbar'

import muiThemeable from 'material-ui/styles/muiThemeable';

const styles = {
  divider: {
    marginRight: 20,
  }
};

class SideBar extends React.Component {
  render() {
    return (
      <div>
        <List style={{ padding: 0 }}>
          <Link style={{'textDecoration': 'none'}} to="/profile"><ListItem primaryText="Profile" leftIcon={<AccountCircle color={this.props.muiTheme.palette.primary1Color} />} onClick={()=>this.props.action('profile')}/></Link>
          <Link style={{'textDecoration': 'none'}} to="/summary"><ListItem primaryText="Summary" leftIcon={<AccountCircle />} onClick={()=>this.props.action('profile')}/></Link>
          <Divider style={styles.divider}/>
          <Link style={{'textDecoration': 'none'}} to="/"><ListItem primaryText="Transactions" leftIcon={<ActionGrade />} onClick={()=>this.props.action('transactions')}/></Link>
          <Link style={{'textDecoration': 'none'}} to="/sales"><ListItem primaryText="Income" leftIcon={<ActionGrade />} onClick={()=>this.props.action('income')}/></Link>
          <Link style={{'textDecoration': 'none'}} to="/expenses"><ListItem primaryText="Expenses" leftIcon={<ActionGrade />} onClick={()=>this.props.action('expenses')}/></Link>
          <Divider style={styles.divider}/>
          <Link style={{'textDecoration': 'none'}} to="/products"><ListItem primaryText="Products" leftIcon={<ActionGrade />} onClick={()=>this.props.action('labourers')}/></Link>
          <Link style={{'textDecoration': 'none'}} to="/labourers"><ListItem primaryText="Labourers" leftIcon={<ActionGrade />} onClick={()=>this.props.action('labourers')}/></Link>
        </List>
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

export default connect(mapStateToProps, matchDispatchToProps)(muiThemeable()(SideBar));