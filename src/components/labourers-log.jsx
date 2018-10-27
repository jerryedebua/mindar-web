import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {List, ListItem, makeSelectable} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';

import action from '../actions/labourers-log'

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

    handleRequestChange = (labourer, index) => {
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

class labourerLog extends Component {
  render () {

    return (<div>
        <Subheader style={styles.header}>{this.props.title || 'Labourers'}</Subheader>
        <Divider/>
        <SelectableList crud={this.props.actions.crud} defaultValue={0}>
    
          { this.props.labourers.map((labourer, i)=>{

              labourer.index = i;
              return (<ListItem
                        key={labourer.id}
                        value={labourer.id}
                        innerDivStyle={styles.li}
                        nestedListStyle={styles.nli}
                        onClick={()=>this.props.action(labourer, i)}
                        primaryText={labourer.name}
                        nestedItems={[
                          <ListItem
                            value={labourer.id}
                            style={styles.ili}
                            primaryText={labourer.wage}
                            disabled={true}
                          />,
                          <ListItem
                            value={labourer.id}
                            style={styles.ili}
                            primaryText={labourer.date.split('T')[0]}
                            disabled={true}
                          />,
                        ]}
                      >
                      </ListItem>);

          }) }

        </SelectableList>
      </div>)
    }
};

function mapStateToProps(state) {
  return {
    actions: state.actions,
    labourers: state.labourers,
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({action: action}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(labourerLog);