import React, { Component } from 'react';
import {connect} from 'react-redux';

import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import { Route } from 'react-router';
import './app.css';

import TitleBar from './components/title-bar';
import SideBar from './components/sidebar';
import Progress from './components/progress';

import DialogForm from './components/dialog-form';
import DialogContent from './components/dialog-content';
import Alert from './components/alert';
import Info from './components/info';
import DateFilter from './components/date-filter'

import home from './pages/home';
import sales from './pages/sales';
import expenses from './pages/expenses';
import profile from './pages/profile';
import summary from './pages/summary';
import products from './pages/products';
import labourers from './pages/labourers';
import settings from './pages/settings';
import about from './pages/about';
import help from './pages/help';

const styles = {
  wrapper: {
    paddingTop: 20,
  },
  plata: {
    width: 300,
    padding: 0,
    borderRight: '0.5px solid rgb(224,224,224)',
    height: 700
  },
  content: {
    fontSize: 16
  },
};

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  componentWillMount() {

    /* let key = window.firebase.database().ref().child('expense/1').push().key;
    window.firebase.database().ref('expense/1/'+ key).set({
      "on" : "1",
      "amount" : "28000",
      "date_incurred" : 1002190929921
    }).then(function(e) {
        console.log('e');
    }, function(e) {
        console.log('error');
    }); */

    // console.log(window.firebase.database().ref().child('user').push().key);

    /* window.firebase.database().ref('expense/1').on('child_added', function(snapshot) {
      console.log(snapshot.key);
    }); */

    // window.firebase.database().ref('user/1').off();

  }

  render() {

    return (

      <div>
        <TitleBar/>
        <div style={styles.wrapper}>
          <Table selectable={false}>
            <TableBody displayRowCheckbox={false}>
              <TableRow displayBorder={true}>
                <TableRowColumn style={styles.plata} className="plata">
                  <SideBar/>
                </TableRowColumn>
                <TableRowColumn style={styles.content} className="content">
                  
                  <Progress open={false}/>
                  {this.props.actions.d?<DialogForm/>:''}
                  {this.props.actions.d?<Alert/>:''}
                  {this.props.actions.d?<Info/>:''}
                  {this.props.actions.d?<DateFilter/>:''}
                  <DialogContent/>
                  
                  <Route exact path="/" component={home}/>
                  <Route path="/sales" component={sales}/>
                  <Route path="/expenses" component={expenses}/>
                  <Route path="/products" component={products}/>
                  <Route path="/labourers" component={labourers}/>
                  <Route path="/profile" component={profile}/>
                  <Route path="/summary" component={summary}/>
                  <Route path="/settings" component={settings}/>
                  <Route path="/about" component={about}/>
                  <Route path="/help" component={help}/>

                </TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

    );
  }
}

function mapStateToProps(state) {
  return {
    actions: state.actions
  }
}

export default connect(mapStateToProps)(App);