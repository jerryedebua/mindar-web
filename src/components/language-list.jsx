import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {List, ListItem} from 'material-ui/List';
import action from '../actions/languages-list'

class LanguageList extends React.Component {

  render() {
    return (
      <div>
        <List>
          { this.props.settings[0].alts.map((language, i)=>{
            return <ListItem key={i} onClick={()=>this.props.action(i)} primaryText={language} />
          }) }
        </List>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    actions: state.actions,
    settings: state.settings,
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({action: action}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(LanguageList);