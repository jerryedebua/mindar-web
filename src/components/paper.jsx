import React from 'react';
import Paper from 'material-ui/Paper';

const style = {
  height: 100,
  width: 100,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

const PaperExampleCircle = () => (
  <div>
    <Paper style={style} zDepth={1} circle={true}/>
  </div>
);

export default PaperExampleCircle;