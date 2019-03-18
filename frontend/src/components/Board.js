import React, { Component } from "react";
// import {ethers} from "ethers";
import { BigNumber } from "ethers/utils";
import { connect } from "react-redux";
import Piece from "./Piece";
import BoardRedux from "../redux/actions/BoardRedux";
// import InteractBlockchain from "../redux/actions/InteractBlockchain";
// import {isValidAddress} from "ethereumjs-util";

import BoardTranslations from "../Library/BoardTranslations"
// import ValidMoves from "../Library/ValidMoves"

import './Board.css';
//mport { Button } from 'react-bootstrap';

class Board extends Component {

    componentDidMount(){
        let piecesBN = new BigNumber("0x000000000000000080828486898b8d8f90929496a9abadafb0b2b4b6b9bbbdbf"); //64 digits long,
        this.props.calcBoardMatrix(piecesBN)
    }
    
    render() {
        return (
            <div>
                <div className="container center">
                    {this.props.boardMatrix.map((row,rowIndex) =>
                        <div key={rowIndex} className="row">
                            {row.map((piece,colIndex) =>
                                <div key={colIndex} className={"color"+((rowIndex+colIndex)%2)}>
                                    <Piece piece={piece}/>
                                </div>
                            )}
                        </div>
                    )}


                    <p>boardState:{BoardTranslations.MatrixtoBN(this.props.boardMatrix)}</p>
                    <p>{this.props.p1Turn ? "P1 RED TURN" : "P2 BLACK TURN"}</p>
                </div>        
            </div>
        )
    }       
}



function mapStateToProps(state) {
    return {
        boardMatrix: state.BoardRedux.boardMatrix,
        p1Turn: state.BoardRedux.p1Turn
    }
}

function mapDispatchToProps(dispatch) {
    return {
        calcBoardMatrix: (piecesBN) =>{
            dispatch(BoardRedux.calcBoardMatrix(dispatch, piecesBN))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Board);
