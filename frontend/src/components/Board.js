import React, { Component } from "react";
// import {ethers} from "ethers";
import { BigNumber } from "ethers/utils";
import { connect } from "react-redux";
// import LoginRedux from "../redux/actions/LoginRedux";
 import BoardRedux from "../redux/actions/BoardRedux";
// import InteractBlockchain from "../redux/actions/InteractBlockchain";
// import {isValidAddress} from "ethereumjs-util";

import BoardTranslations from "../Library/BoardTranslations"
import ValidMoves from "../Library/ValidMoves"

import './Board.css';
//mport { Button } from 'react-bootstrap';

class Board extends Component {

    componentDidMount(){
        let piecesBN = new BigNumber("0x000000000000000080828486898b8d8f90929496a9abadafb0b2b4b6b9bbbdbf"); //64 digits long,
        this.props.calcBoardMatrix(piecesBN)
    }
    

    renderPiece = (piece) => {
        //console.log(piece) make into component
        let temp = () =>{
            if (piece.active)
                if (piece.red){
                    if (piece.queen){
                        return <div className="red queen" onClick={()=>this.props.handlePieceClick(this.props.boardMatrix,piece)}></div>
                    }
                    else{
                        return <div className="red" onClick={()=>this.props.handlePieceClick(this.props.boardMatrix,piece)}></div>
                    }
                }else{
                    if (piece.queen){
                        return <div className="black queen" onClick={()=>this.props.handlePieceClick(this.props.boardMatrix,piece)}></div>
                    }
                    else{
                        return <div className="black" onClick={()=>this.props.handlePieceClick(this.props.boardMatrix,piece)}></div>
                    }
                }
            }

        if ((this.props.validMovesMatrix[piece.row]!==undefined) && this.props.validMovesMatrix[piece.row][piece.col])
            //console.log(piece.row, piece.col)
            return <div className="valid" onClick={()=>this.props.handleMove(this.props.boardMatrix,piece,this.props.activeSquare)}>{temp()}</div>
        if (piece.row === this.props.activeSquare.row && piece.col === this.props.activeSquare.col)
            return <div className="selected" >{temp()}</div>
        else 
            return temp()
    }



    render() {
        return (
            <div>
                
                <div className="container center">
            
                    {this.props.boardMatrix.map((row,rowIndex) =>
                        <div key={rowIndex} className="row">
                            {row.map((piece,colIndex) =>
                                <div key={colIndex} className={"color"+((rowIndex+colIndex)%2)}>
                                    {this.renderPiece(piece)}
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
        validMovesMatrix: state.BoardRedux.validMovesMatrix,
        activeSquare: state.BoardRedux.activeSquare,
        p1Turn: state.BoardRedux.p1Turn
    }
}

function mapDispatchToProps(dispatch) {
    return {
        handlePieceClick: (boardMatrix, piece) =>{
            dispatch(BoardRedux.handlePieceClick(dispatch, boardMatrix, piece))
        },
        calcBoardMatrix: (piecesBN) =>{
            dispatch(BoardRedux.calcBoardMatrix(dispatch, piecesBN))
        },
        handleMove: (board,validSpot,activeSquare) =>{
            dispatch(BoardRedux.handleMove(dispatch, board,validSpot,activeSquare))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Board);
