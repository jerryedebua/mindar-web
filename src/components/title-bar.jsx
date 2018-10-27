import React from 'react';
import {connect} from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';

import Drawer from './drawer';
import Toolbar from './toolbar';

import {teal500 as primary, white} from 'material-ui/styles/colors';

const theme = getMuiTheme({
  palette: {
    textColor: white,
    primary1Color: primary,
  },
  appBar: {
    height: 50,
  },
});

class TitleBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false,
    };
  }

  componentWillReceiveProps(props) {
    this.setState({drawerOpen: props.actions.drawerOpen || false});
  }

  toggle = (event) => this.setState({drawerOpen: !this.state.drawerOpen});

  render() {
    return (
    	<div>
    		<MuiThemeProvider muiTheme={theme}>
				<AppBar
				title="Miabraids"
				titleStyle={{fontSize: 18}}
				onLeftIconButtonClick={this.toggle}
				iconElementRight={<Toolbar/>} />
			</MuiThemeProvider>
			<Drawer open={this.state.drawerOpen}/>
		</div>
    );
  }
}

function mapStateToProps(state) {
  return {
    actions: state.actions
  }
}

export default connect(mapStateToProps)(TitleBar);