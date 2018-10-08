import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';
import { getStations } from '../../actions';
import './App.css';

class App extends Component {

  componentDidMount(){
    this.props.getStations();
  }

  
  render() {
    return (
      <div className="App">
        <Nav />
      </div>
    );
  }
}

function mapStateToProps({ stations }){
  return { stations }
}

export default connect(mapStateToProps, { getStations })(App);
