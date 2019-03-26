

import { Provider } from "react-redux";
import store from "./redux/index";
import React, { Component } from "react";

import Login from "./components/Login";
import Game from "./components/Game";


import './App.css';


class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <div className="App">
                    <Login />
                    <Game />
                </div>
            </Provider>
        );
    }
}
export default App;
