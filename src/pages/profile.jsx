import React from 'react';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';

import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Checkbox from 'material-ui/Checkbox';
import Toggle from 'material-ui/Toggle';

import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';

import Submit from 'material-ui/svg-icons/navigation/chevron-right';

const styles = {
  header: {
      paddingLeft: 10, lineHeight: '47px'
  },
  card: {
  	display: 'inline-block',
  	width: '31%',
  	margin: '15px 3.5% 0 0',
  },
  toggle: {
    display: 'inline-block',
  },
  center : {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  paper : {
    padding: 20,
    margin: '20px 0'
  },
  radioButton: {
    marginBottom: 16,
  },
  submit: { margin: '0 0 20px 20px', backgroundColor: 'rgba(153, 153, 153, 0.2)' }
};

class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      phone: '+256759400933',
      name: 'Miabraids',
      stock: false,
      labourers: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <Subheader style={styles.header}>
          Profile
        </Subheader>
        <Divider/>
        <div className="row">
          <div className="col-sm-5 col-xs-12">
            <Paper style={styles.paper} zDepth={1}>
              <ValidatorForm
                ref="form"
                onSubmit={this.handleSubmit}
                onError={errors => console.log('errors occured')}>
                
                {/* phone */}
                <label style={{ zIndex: 1, color: 'rgba(0, 0, 0, 0.3)', fontSize: 12, margin: 0 }}>Telephone</label>
                <MenuItem primaryText={this.state.phone} style={{ color: '#000', padding: 0, minHeight: '30px', lineHeight: '30px' }} disabled={true} />
                
                {/* name */}
                {/*<FlatButton style={styles.submit} icon={<Submit />} />*/}
                <div style={{ margin: '20px 0 0 20px', float: 'right' }}>
                  <FloatingActionButton mini={true} zDepth={1} type="submit">
                    <Submit />
                  </FloatingActionButton>
                </div>
                <TextValidator name="name"
                  hintText="Type your entity name"
                  floatingLabelText="Entity name"
                  autoComplete={'off'}
                  onChange={this.handleInputChange}
                  errorMessages={['This field is required', 'Type valid name']}
                  validators={['required', 'matchRegexp:^[0-9]*$']}
                  value={this.state.name}
                />
                <div>
                  <Checkbox
                    name="stock"
                    label="I sell products"
                    checked={true || this.state.stock}
                    onCheck={this.handleInputChange}
                    style={{ margin: '15px 0 15px 0' }}
                  />
                  <Checkbox
                    name="not_stock"
                    label="I offer services"
                    checked={this.state.labourers}
                    onCheck={this.handleInputChange}
                    style={{ margin: '0 0 15px 0' }}
                  />
                  <Toggle
                    name="labourers"
                    checked={true || this.state.labourers}
                    label="I employ other people"
                    style={{ margin: '0 0 15px 0' }}
                  />
                </div>
              </ValidatorForm>
            </Paper>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
