

import { Provider } from "react-redux";
import store from "./redux/index";
import React, { Component } from "react";


import Login from "./components/Login";
import Board from "./components/Board";
import GameStats from "./components/GameStats";


import './App.css';


class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <div className="App">
                    <Login />
                    <div className="container">
                        <div className="row">
                            <Board />
                            <GameStats />
                        </div>
                    </div>
                </div>
            </Provider>
        );
    }
}
export default App;
