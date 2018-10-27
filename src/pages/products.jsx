import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Log from '../components/products-log'

import action from '../actions/outerbar'

class Products extends Component {

  componentWillMount() {
  	/* update toolbar on mount */
  	this.props.action('products');
  }

  render() {
  	return (
      <div><Log/></div>
    );
  }

}

function mapStateToProps(state) {
	return {
		products: state.products
	}
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({action: action}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Products);
