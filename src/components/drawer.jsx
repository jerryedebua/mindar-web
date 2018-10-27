import React from 'react';
import Drawer from 'material-ui/Drawer';

import DrawerList from './drawer-list';

export default class LeftDrawer extends React.Component {
  render() {
    return (
      <div>
        <Drawer width={300} openSecondary={true} open={this.props.open}>
          <DrawerList/>
        </Drawer>
      </div>
    );
  }
}

