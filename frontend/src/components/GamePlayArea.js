import React, { Component } from "react";
import { connect } from "react-redux";


import Board from "./Board";
import GameStats from "./GameStats";

import ColorIndicator from "./GameDetails/ColorIndicator";
import TurnExpiry from "./GameDetails/TurnExpiry";

// import BoardRedux from "../redux/actions/BoardRedux";
// import ColorIndicator from "./GameDetails/ColorIndicator";
// import TurnExpiry from "./GameDetails/TurnExpiry";
// import { BigNumber } from "ethers/utils";

import './Board.css';

class GamePlayArea extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-6">
                        <div className="row">
                            <div className="col-sm-2"><ColorIndicator/></div>
                            <div className="col-sm-4"><TurnExpiry/></div>
                        </div>
                        <div className="row">
                            <Board />
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <GameStats/>
                    </div>
                </div>
            </div>   
       
        )
    }       
}

function mapStateToProps(state) {
    return {
        // boardMatrix: state.BoardRedux.boardMatrix,
        // prevMove:state.BoardRedux.prevMove,
        // turnNum:state.BoardRedux.turnNum
    }
}
function mapDispatchToProps(dispatch) {
    return {
        // calcBoardMatrix: (boardBN) =>{
        //     dispatch(BoardRedux.calcBoardMatrix(dispatch, boardBN))
        // },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(GamePlayArea);
