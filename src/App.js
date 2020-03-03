import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Sudoku from './components/Sudoku/Sudoku';
import Login from './components/Login/Login';
import Winner from './components/Winner/Winner';

import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            k: 0,
            time: 0
        };
    }

    changeK = (k) => {
        this.setState({
            k
        });
    }

    setTime = (time) => {
        this.setState({
            time
        });
    }

    render() {
        return (
            <Router>
                <Switch>
                <Route path="/" exact>
                    <Login changeK={this.changeK} />
                </Route>
                <Route path="/sudoku" render={(props) => <Sudoku {...props} k={this.state.k} setTime={this.setTime} />} />
                <Route path='/winner'>
                    <Winner time={this.state.time} />
                </Route>
                </Switch>
            </Router>
        );
    }
}

export default App;