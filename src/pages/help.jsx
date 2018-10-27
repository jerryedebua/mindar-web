import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import action from '../actions/outerbar'

import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import {List, ListItem} from 'material-ui/List';

const styles = {
    header: {
        paddingLeft: 10, lineHeight: '47px'
    },
    li: {
        padding: 15
    },
    ili: {
        fontSize: 15, padding: 7
    },
    nli: {
        padding: '5px 0 0 0', borderTop: '0.5px solid rgb(224,224,224)'
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

class Help extends Component {
  componentWillMount() {
  	/* update toolbar on mount */
  	this.props.action('help');
  }

  render() {
    return (
      <div>
        <Subheader style={styles.header}>Guidelines on making the most of Mindar</Subheader>
        <Divider/>
        <List>
          { this.props.items.map((item, i)=>{
              return (<ListItem
                        key={item.id}
                        value={item.id}
                        innerDivStyle={styles.li}
                        nestedListStyle={styles.nli}
                        primaryText={item.title}
                        primaryTogglesNestedList={true}
                        nestedItems={[
                          <ListItem
                            value={item.id}
                            style={styles.ili}
                            primaryText={item.description[0]}
                            disabled={true}
                          />,
                          <ListItem
                            value={item.id}
                            style={styles.ili}
                            primaryText={item.description[1]}
                            disabled={true}
                          />
                        ]}
                      />);
          }) }
        </List>
      </div>
    );
  }
}

function mapStateToProps(state) {
	return {
    items: state.help_menu
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({action: action}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Help);