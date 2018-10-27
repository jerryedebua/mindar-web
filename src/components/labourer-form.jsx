import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import save_new from '../actions/labourer-save'
import save_update from '../actions/labourer-update'

import AutoComplete from 'material-ui/AutoComplete';
import DatePicker from 'material-ui/DatePicker';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';

import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { ValidatorComponent } from 'react-form-validator-core';

class AutoCompleteValidator extends ValidatorComponent {
    render() {
        // eslint-disable-next-line
        const { errorMessages, validators, requiredError, errorText, validatorListener, ...rest } = this.props;
        const { isValid } = this.state;
        return (
            <AutoComplete
                {...rest}
                ref={(r) => { this.input = r; }}
                errorText={(!isValid && this.getErrorMessage()) || errorText}
            />
        );
    }
}

class DateValidator extends ValidatorComponent {
    render() {
        // eslint-disable-next-line
        const { errorMessages, validators, requiredError, errorText, validatorListener, ...rest } = this.props;
        const { isValid } = this.state;
        return (
            <DatePicker
                {...rest}
                ref={(r) => { this.input = r; }}
                errorText={(!isValid && this.getErrorMessage()) || errorText}
            />
        );
    }
}

class Form extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      checked: (props.actions ? props.actions.editing : false),
      name: '', wage: '', dateValue: null
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
    this.updateCheck = this.updateCheck.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    if (!this.props.actions)
      return;
    let props = this.props.actions;
    this.setState({
      checked: (props ? props.editing : false),
      name: props.item?props.item.name:'',
      wage: props.item?props.item.wage:'',
      dateValue: props.item?new Date(props.item.date): null,
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.name === 'date_selected' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: (value?value:'')
    });
  }

  handleUpdateInput(value) {
    this.setState({
      dataSource: [
        value,
      ],
      'name': value
    });
  }

  handleSubmit(event) {

    event.preventDefault();
    this.props.handleDialogClose();
    
    let labourer = {
      name: this.state.name,
      wage: this.state.wage,
      date: this.state.dateValue ? this.state.dateValue.toISOString() : new Date().toISOString()};

    if (this.props.actions.editing) {
        this.props.update(labourer, this.props.actions.item.index);  
    } else
        this.props.save(labourer);
    

  }

  updateCheck() {
    this.setState((oldState) => {
      return {
        checked: !oldState.checked,
      };
    });
  }

  render() {

    return (

      <ValidatorForm
        ref="form"
        onSubmit={this.handleSubmit}
        onError={errors => console.log('errors occured')}>
        
        {/* name */}
        <AutoCompleteValidator
          hintText={this.props.actions.d.desc_placeholder}
          floatingLabelText={this.props.actions.d.desc_title}
          dataSource={['Hamburger', 'Sandwich', 'Pasta', 'Jupe']}
          onUpdateInput={this.handleUpdateInput}
          fullWidth={true} name="name"
          errorMessages={['This field is required']}
          validators={['required']}
          searchText={this.state.name}
          value={this.state.name}
        />
        
        {/* wage */}
        <TextValidator name="wage"
          hintText={this.props.actions.d.amount_placeholder}
          autoComplete={'off'}
          onChange={this.handleInputChange}
          errorMessages={['This field is required', 'Type valid number', 'Type valid number']}
          validators={['required', 'minNumber:0', 'matchRegexp:^[0-9]*$']}
          value={this.state.wage}
        />
        
        {/* DATE */}
        {this.props.actions.editing === true ? '' :
        <Checkbox
          label={this.props.actions.d.date_description}
          checked={this.state.checked}
          onCheck={this.updateCheck.bind(this)}
          style={{margin: '12px 0 12px 0',}} name="date_selected"
        />}
        {this.state.checked?
          <DateValidator name="date" hintText={this.props.actions.d.date_placeholder} mode="landscape" 
          autoOk={true} maxDate={new Date()} hideCalendarDate={true} 
          onChange={(event=null, date) => {
            this.setState({'dateValue':date, 'date': date.toISOString().split('T')[0]}); }}
          errorMessages={['This field is required']}
          validators={['required']}
          value={this.state.dateValue} />:''}

        {/* SUBMIT */}
        <div style={{width: '100%', textAlign: 'right', marginTop: 10}}>
          <FlatButton
            label="Cancel"
            primary={true}
            onClick={this.props.handleDialogClose}
          />,
          <FlatButton
            label="Submit"
            primary={true}
            keyboardFocused={true}
            type="submit"
          />
        </div>
         
      </ValidatorForm>
    );
  }
}

function mapStateToProps(state) {
  return {
    actions: state.actions,
    labourers: state.labourers,
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({save: save_new, update: save_update}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Form);