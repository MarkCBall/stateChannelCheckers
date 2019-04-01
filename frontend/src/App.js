

import { Provider } from "react-redux";
import store from "./redux/index";
import React, { Component } from "react";

import Login from "./components/Login";
import GameSelection from "./components/GameSelection";


import './App.css';


class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <div className="App">
                    <Login />
                    <GameSelection />
                </div>
            </Provider>
        );
    }
}
export default App;
