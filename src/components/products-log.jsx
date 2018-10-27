import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {List, ListItem, makeSelectable} from 'material-ui/List';

import action from '../actions/products-log'

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

    handleRequestChange = (product, index) => {
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
        fontSize: 15, fontWeight: 200,
        margin: '5px 0 0', color: 'rgba(0, 0, 0, 0.54)', 
        overflow: 'hidden', textOverflow: 'ellipsis', 
        whiteSpace: 'nowrap',
    },
}

class productLog extends Component {

  render () {

    return (<div>
        <SelectableList crud={this.props.actions.crud} defaultValue={0}>
    
          { this.props.products.map((product, i)=>{

              if (this.props.filter)
                if (!this.props.filter(product))
                  return null;

              product.index = i;
              return (<ListItem
                        key={product.id}
                        value={product.id}
                        innerDivStyle={styles.li}
                        onClick={()=>this.props.action(product, i)}
                      >
                        <div style={styles.primary}>{product.name}</div>
                        <div style={styles.secondary}>Price&#44;&nbsp;{product.price}</div>
                      </ListItem>);

          }) }

        </SelectableList>
      </div>)
    }
};

function mapStateToProps(state) {
  return {
    products: state.products,
    actions: state.actions
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({action: action}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(productLog);