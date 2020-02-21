import React from 'react';
import './App.css';
import { getData } from './services/api-helper';
import Header from './components/Header';
import Footer from './components/Footer';
import { Route } from 'react-router-dom';
import Home from './components/Home';
import PipsFeed from './components/PipsFeed';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      something: [],

    }
  }
  handleChange = (event) => {
    //dosomething
    //this.setState({ something })
  }

  componentDidMount = async () => {
    //const something = await getData();
    //this.setState({ something });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    //do domething
  }

  render() {
    return (
      <div className="app" >
        <Header />
        <Route exact path="/" render={() => (<Home
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
        />)} />
        <Route path="/pips" render={() => (<PipsFeed />)} />
        <Footer />
      </div>
    );
  }
}

export default App;
