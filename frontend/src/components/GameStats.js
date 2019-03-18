import React, { Component } from "react";
import BoardRedux from "../redux/actions/BoardRedux";
import { connect } from "react-redux";

import BoardTranslations from "../Library/BoardTranslations"
import { BigNumber } from "ethers/utils";

class GameStats extends Component {


    componentDidMount(){
        let piecesBN = new BigNumber("0x000000000000000080828486898b8d8f90929496a9abadafb0b2b4b6b9bbbdbf"); //64 digits long,
        this.props.calcBoardMatrix(piecesBN)
    }

    renderBoardBN = (boardBN) =>{
        //console.log(BNString)
        return <div>
            <br/>Board as a string is:
            <br/>{this.prevMoveToHex(this.props.boardMatrix, this.props.prevMove)}
            <br/>{boardBN.substr(0,24)}
            <br/>{boardBN.substr(24,24)}
        </div>

    }

    prevMoveToHex = (boardMatrix, prevMove) => {
        let moveStr = ""
        moveStr += prevMove.rowFrom ? prevMove.rowFrom : "0"
        moveStr += prevMove.colFrom ? prevMove.colFrom : "0"
        moveStr += prevMove.rowTo ? prevMove.rowTo : "0"
        moveStr += prevMove.colTo ? prevMove.colTo : "0"
        if (Math.abs(prevMove.rowFrom - prevMove.rowTo)>1){
            moveStr += (prevMove.rowTo + prevMove.rowFrom)/2
            moveStr += (prevMove.colTo + prevMove.colFrom)/2
        }
        return "0x"+ moveStr.padStart(16,"0")
    }

     render() {
        return (
            <div>
                {BoardTranslations.MatrixtoBN(this.props.boardMatrix)}<br/>
                {this.renderBoardBN(BoardTranslations.MatrixtoBN(this.props.boardMatrix))}
                <p>{this.props.p1Turn ? "P1 RED TURN" : "P2 BLACK TURN"}</p>
            </div>
        )
    }            
}

function mapStateToProps(state) {
    return {
        boardMatrix: state.BoardRedux.boardMatrix,
        p1Turn: state.BoardRedux.p1Turn,
        prevMove:state.BoardRedux.prevMove
    }
}

function mapDispatchToProps(dispatch) {
    return {
        calcBoardMatrix: (piecesBN) =>{
            dispatch(BoardRedux.calcBoardMatrix(dispatch, piecesBN))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(GameStats);

