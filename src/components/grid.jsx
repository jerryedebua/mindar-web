import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';

import RaisedButton from 'material-ui/RaisedButton';
import List from './list';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
  },
  titleStyle: {
    color: 'rgb(0, 188, 212)',
  },
};

/**
 * This example demonstrates the horizontal scrollable single-line grid list of images.
 */
const _Grid = () => (
  <div>
    <GridList cols={8}>
      <GridTile cols={2}>
        <List/>
      </GridTile>
      <GridTile cols={6}>
        <RaisedButton/>
      </GridTile>
    </GridList>
  </div>
);

export default _Grid;