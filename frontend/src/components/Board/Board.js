import React, { Component } from "react";
import { connect } from "react-redux";
import Square from "./Square";
import GameData from "../../redux/actions/GameData";

import './Board.css';

class Board extends Component {
    constructor(props) {
        super(props);
        this.state =
        {
            WindowInterval: 0,
            // allowanceAmnt: 0
        }
    }
    activateUpdateGameData = () =>{
        //only update game data on opponent's turn
        if (this.props.iAmP1Red === ((this.props.turnNum%2)===0)){
            this.props.updateGameData(this.props.gameID,Date.now())
        }
    }
    componentDidMount = () =>{
        this.setState({
            ...this.state,
            WindowInterval: window.setInterval(this.activateUpdateGameData, 5000)
        })
    }
    componentWillUnmount = () =>{
        window.clearInterval(this.state.WindowInterval)
    }


    render() {
        return (
            <div className="container">
                {this.props.boardMatrix.map((row, rowIndex) =>
                    <div key={rowIndex} className="row">
                        {row.map((piece, colIndex) =>
                            <div key={colIndex}>
                                <Square
                                    rowIndex={rowIndex}
                                    colIndex={colIndex}
                                    piece={piece}
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        boardMatrix: state.GameData.boardMatrix,
        gameID: state.GameData.gameID,
        turnNum: state.GameData.turnNum,
        iAmP1Red: state.GameData.iAmP1Red,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        updateGameData: (gameID,timestamp ) => {
            dispatch(GameData.updateGameData(dispatch, gameID,timestamp))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Board);
