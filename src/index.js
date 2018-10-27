import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
	grey900 as text, 
	teal500 as primary, 
	teal800 as secondary,
	green900 as sales,
	lime900 as expenses } from 'material-ui/styles/colors';

import Land from './land';
import registerServiceWorker from './registerServiceWorker';

import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducers from './reducers';

const theme = getMuiTheme({
  palette: {
    textColor: text,
    primary1Color: primary,
    primary2Color: secondary,
    sales: sales,
    expenses: expenses,
  },
});

const store = createStore(reducers);
ReactDOM.render(
	<Provider store={store}>
		<MuiThemeProvider muiTheme={theme}>
			<BrowserRouter>
				<Land/>
			</BrowserRouter>
		</MuiThemeProvider>
	</Provider>, 
	document.getElementById('root')
);

registerServiceWorker();
