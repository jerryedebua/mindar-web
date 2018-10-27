import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import IconButton from 'material-ui/IconButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator} from 'material-ui/Toolbar';

import AddSale from 'material-ui/svg-icons/content/add-circle-outline';
import AddExpense from 'material-ui/svg-icons/content/remove-circle-outline';
import AddLabourer from 'material-ui/svg-icons/content/add-circle-outline';
import Pay from 'material-ui/svg-icons/action/payment';
import PayAll from 'material-ui/svg-icons/action/payment';
import Edit from 'material-ui/svg-icons/content/create';
import Remove from 'material-ui/svg-icons/content/remove';
import Filter from 'material-ui/svg-icons/content/filter-list';
import Close from 'material-ui/svg-icons/navigation/close';

import action from '../actions/toolbar'

class IconToolbar extends React.Component {

  render() {

    let hiddenIconsShown = this.props.actions.crud,
        labourers = this.props.actions.labourers,
        dontShowToolbar = this.props.actions.settings || 
                  this.props.actions.help || this.props.actions.about;

    return (
      <div>
        <Toolbar style={{backgroundColor: 'transparent', padding: 0}}>
          {dontShowToolbar ? null : <ToolbarGroup>
            {hiddenIconsShown?'':(!labourers?<IconButton onClick={()=>this.props.action(1)}><AddSale/></IconButton>:'')}
            {hiddenIconsShown?'':(!labourers?<IconButton onClick={()=>this.props.action(2)}><AddExpense/></IconButton>:'')}
            {hiddenIconsShown?'':(!labourers?<IconButton onClick={()=>this.props.action(3)}><Filter/></IconButton>:'')}
            {hiddenIconsShown?'':(labourers?<IconButton onClick={()=>this.props.action(8)}><AddLabourer/></IconButton>:'')}
            {hiddenIconsShown?'':(labourers?<IconButton onClick={()=>this.props.action(9)}><PayAll/></IconButton>:'')}
            {!labourers?(this.props.actions.crud?<IconButton onClick={()=>this.props.action(4)}><Edit/></IconButton>:''):''}
            {!labourers?(this.props.actions.crud?<IconButton onClick={()=>this.props.action(5)}><Remove/></IconButton>:''):''}
            {labourers?(this.props.actions.crud?<IconButton onClick={()=>this.props.action(10)}><Edit/></IconButton>:''):''}
            {labourers?(this.props.actions.crud?<IconButton onClick={()=>this.props.action(11)}><Remove/></IconButton>:''):''}
            {labourers?(this.props.actions.crud?<IconButton onClick={()=>this.props.action(6)}><Pay/></IconButton>:''):''}
            {hiddenIconsShown?<ToolbarSeparator style={{margin: '0 5px 0 5px'}} />:''}
            {hiddenIconsShown?<IconButton onClick={()=>this.props.action(7)}><Close/></IconButton>:''}
          </ToolbarGroup>}
        </Toolbar>
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

export default connect(mapStateToProps, matchDispatchToProps)(IconToolbar);