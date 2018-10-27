import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import save_new from '../actions/event-save'
import save_update from '../actions/event-update'

import AutoComplete from 'material-ui/AutoComplete';
import DatePicker from 'material-ui/DatePicker';
import UploadButton from 'material-ui/RaisedButton';
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

const styles = {
  uploadButton: {
    verticalAlign: 'middle',
  },
  uploadInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    opacity: 0,
  },
};

class Form extends React.Component {


  render() {

    return (

      <ValidatorForm
        ref="form"
        onSubmit={this.handleSubmit}
        onError={errors => console.log('errors occured')}>
        
        {/* DESCRIPTION */}
        <AutoCompleteValidator
          hintText={this.props.actions.d.desc_placeholder}
          floatingLabelText={this.props.actions.d.desc_title}
          dataSource={['Hamburger', 'Sandwich', 'Pasta', 'Jupe']}
          onUpdateInput={this.handleUpdateInput}
          fullWidth={true} name="description"
          errorMessages={['This field is required']}
          validators={['required']}
          searchText={this.state.description}
          value={this.state.description}
        />
        
        {/* AMOUNT */}
        <TextValidator name="amount"
          hintText={this.props.actions.d.amount_placeholder}
          autoComplete={'off'}
          onChange={this.handleInputChange}
          errorMessages={['This field is required', 'Type valid number', 'Type valid number']}
          validators={['required', 'minNumber:0', 'matchRegexp:^[0-9]*$']}
          value={this.state.amount}
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
          style={{ margin: '0 0 10px 0' }}
          onChange={(event=null, date) => {
            this.setState({'dateValue':date, 'date': date.toISOString().split('T')[0]}); }}
          errorMessages={['This field is required']}
          validators={['required']}
          value={this.state.dateValue} />:''}

        <UploadButton
          label="Upload Receipt (optional)"
          labelPosition="before"
          style={styles.uploadButton}
          primary={true}
        >
          <input type="file" style={styles.uploadInput} />
        </UploadButton>

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
  
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      checked: (props.actions ? props.actions.editing : false),
      description: '', amount: '', dateValue: null
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateCheck = this.updateCheck.bind(this);
  }

  componentWillMount() {
    if (!this.props.actions)
      return;
    let props = this.props.actions;
    this.setState({
      checked: (props ? props.editing : false),
      description: props.item?props.item.description:'',
      amount: props.item?props.item.amount:'',
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
      'description': value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.handleDialogClose();
    
    let event = {
      description: this.state.description,
      amount: this.state.amount,
      date: this.state.dateValue ? this.state.dateValue.toISOString() : new Date().toISOString(),
      is_sale: this.props.actions.d.is_sale
    };

    if (this.props.actions.editing) {
        this.props.update(event, this.props.actions.item.index);  
    } else
        this.props.save(event);

  }

  updateCheck() {
    this.setState((oldState) => {
      return {
        checked: !oldState.checked,
      };
    });
  }

}

function mapStateToProps(state) {
  return {
    actions: state.actions
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({save: save_new, update: save_update}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Form);