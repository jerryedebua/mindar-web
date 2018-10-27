import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import action from './actions/signup';

import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import Toggle from 'material-ui/Toggle';

import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';

const styles = {
  center : {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  paper : {
    padding: 20,
    margin: '80px 0 0 0',
  },
  radioButton: {
    marginBottom: 16,
  },
};

class AppAuthenticate extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      authenticate: true, authenticate_fresh: true,
      phone: '', code: '', name: '', stock: false, labourers: false,
      finished: false, stepIndex: 0,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateCheck = this.updateCheck.bind(this);
  }

  updateCheck() {
    this.setState((oldState) => {
      return {
        checked: !oldState.checked,
      };
    });
  }

  handleNext = () => {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

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

    if (this.state.authenticate_fresh) {
      this.setState({ authenticate_fresh: false }); return;
    }

    if (this.state.authenticate) {
      this.setState({ authenticate: false }); return;
    }

    this.props.action();

  }

  render() {
    return (
      <div style={styles.center}>
        <Paper style={styles.paper} zDepth={1}>
          <ValidatorForm
            ref="form"
            onSubmit={this.handleSubmit}
            onError={errors => console.log('errors occured')}>
            
            {/* phone */}
            { this.state.authenticate ? 
              <div>
                { this.state.authenticate_fresh ? 
                  <div>
                    <TextValidator name="phone"
                      hintText="This will identify your entity"
                      floatingLabelText="Phone number"
                      autoComplete={'off'}
                      onChange={this.handleInputChange}
                      errorMessages={['This field is required', 'Type valid phone number', 'Type valid phone number']}
                      validators={['required', 'minNumber:0', 'matchRegexp:^[0-9]*$']}
                      value={this.state.phone}
                    />
                    <div id="recaptcha"></div>
                  </div> :
                  <TextValidator name="code" style={{ display:'block' }}
                    hintText="Type verification code"
                    floatingLabelText="Verification code"
                    autoComplete={'off'}
                    onChange={this.handleInputChange}
                    errorMessages={['This field is required', 'Type valid verification code', 'Type valid verification code']}
                    validators={['required', 'minNumber:0', 'matchRegexp:^[0-9]*$']}
                    value={this.state.code}
                  />
                }
              </div> :
              <div>
                <TextValidator name="name"
                  hintText="Type your entity name"
                  floatingLabelText="Entity name"
                  autoComplete={'off'}
                  onChange={this.handleInputChange}
                  errorMessages={['This field is required']}
                  value={this.state.name}
                />
                <Checkbox
                  name="stock"
                  label="I sell products"
                  checked={this.state.stock}
                  onCheck={this.updateCheck}
                  style={{ margin: '15px 0 15px 0' }}
                />
                <Checkbox
                  name="labourers"
                  label="I offer services"
                  checked={this.state.labourers}
                  onCheck={this.updateCheck}
                  style={{ margin: '0 0 15px 0' }}
                />
                <Toggle
                  label="I employ other people"
                  style={{ margin: '0 0 15px 0' }}
                />
              </div>
            }
            <div style={{width: '100%', textAlign: 'right', marginTop: 10}}>
              <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                type="submit"
              />
            </div>
          </ValidatorForm>
        </Paper>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    actions: state.actions
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({action: action}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(AppAuthenticate);