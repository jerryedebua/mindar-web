import {combineReducers} from 'redux';
import events from './events';
import labourers from './labourers';
import products from './products';
import settings from './settings';
import help from './help';
import actions from './actions';
import auth from './auth';

export default combineReducers({
	auth: auth,
	products: products,
	events: events,
	labourers: labourers,
	settings: settings,
	help_menu: help,
	actions: actions
});