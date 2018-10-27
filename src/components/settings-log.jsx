import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {List, ListItem, makeSelectable} from 'material-ui/List';
import Divider from 'material-ui/Divider';
/*import Subheader from 'material-ui/Subheader';*/

import action from '../actions/settings-log'

let SelectableList = makeSelectable(List);

function wrapState(ComposedComponent) {
  return class SelectableList extends Component {
    static propTypes = {
      children: PropTypes.node.isRequired,
      defaultValue: PropTypes.number.isRequired,
    };

    componentWillMount() {
      this.setState({
        selectedIndex: this.props.defaultValue,
      });
    }

    handleRequestChange = (setting, index) => {
      this.setState({
        selectedIndex: index,
      });
    };

    render() {
      return (
        <ComposedComponent
          value={this.props.crud?this.state.selectedIndex:0}
          onChange={this.handleRequestChange}
        >
          {this.props.children}
        </ComposedComponent>
      );
    }
  };
}

SelectableList = wrapState(SelectableList);

const styles = {
    header: {
        paddingLeft: 10, lineHeight: '47px'
    },
    li: {
        padding: 10
    },
    primary: {
        overflow: 'hidden', textOverflow: 'ellipsis', 
        whiteSpace: 'nowrap',
    },
    secondary: {
        fontSize: 12, fontWeight: 200,
        margin: '5px 0 0', color: 'rgba(0, 0, 0, 0.54)', 
        overflow: 'hidden', textOverflow: 'ellipsis', 
        whiteSpace: 'nowrap',
    },
}

class SettingsLog extends Component {

  render () {

    return (<div>
        {/*<Subheader style={styles.header}>{this.props.title || 'Settings'}</Subheader>
        <Divider/>*/}
        <SelectableList crud={this.props.actions.crud} defaultValue={0}>
    
          { this.props.settings.map((setting, i)=>{
              return (<div key={i}><ListItem
                        key={setting.id}
                        value={setting.id}
                        innerDivStyle={styles.li}
                        onClick={()=>this.props.action(setting)}
                      >
                        <div style={styles.primary}>{setting.name}</div>
                        <div style={styles.secondary}>{setting.alts[setting.value]}</div>
                      </ListItem>
                      {i!==(this.props.settings.length-1)?<Divider/>:null}
                      </div>);

          }) }

        </SelectableList>
      </div>)
    }
};


function mapStateToProps(state) {
  return {
    actions: state.actions,
    settings: state.settings,
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({action: action}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(SettingsLog);