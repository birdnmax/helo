import React, { Component } from 'react'
import axios from 'axios';
import {Provider} from 'react-redux';
import {HashRouter as Router} from 'react-router-dom';
import Nav from './components/Nav/Nav';
import routes from './routes';
import store from './Ducks/store';
import './App.css';

class App extends Component {
  // componentDidMount(){
  //   axios.get('http://localhost:4000/api/ping')
  //     .then((res) => {
  //       console.log(res.data)
  //     })
  // }
  
  render(){
    return (
      <div>
        <Provider store={store}>
          <Router>
            <div className='App'>
              <Nav/>
              {routes}
            </div>
          </Router>
        </Provider>
      </div>
    );
  }
}

export default App;