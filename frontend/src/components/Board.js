import React, { Component } from "react";
// import {ethers} from "ethers";
import { BigNumber } from "ethers/utils";
// import { connect } from "react-redux";
// import LoginRedux from "../redux/actions/LoginRedux";
// import InteractDatabase from "../redux/actions/InteractDatabase";
// import InteractBlockchain from "../redux/actions/InteractBlockchain";
// import {isValidAddress} from "ethereumjs-util";

import BoardTranslations from "../Library/BoardTranslations"
import ValidMoves from "../Library/ValidMoves"

import './Board.css';
//mport { Button } from 'react-bootstrap';

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            boardMatrix: [],
            validMovesMatrix: [],
            activeSquare: {},
            p1Turn: true
            //BNState: ""

        }
    }





    componentDidMount(){
                                // "0x000000000000000080828486898b8d8f90929496a9abadafb0b2b4b6b9bbbdbf"
                                  // "0x80828486898b8d8f909294960000000000000000a9abadafb0b2b4b6b9bbbdbf"
        let piecesBN = new BigNumber("0x000000000000000080828486898b8d8f90929496a9abadafb0b2b4b6b9bbbdbf"); //64 digits long,
        
        this.setState({
            ...this.state,
            boardMatrix: BoardTranslations.BNtoMatrix(piecesBN)
        })
    }
    

    renderPiece = (piece) => {
        //console.log(piece) make into component
        let temp = () =>{
            if (piece.active)
                if (piece.red){
                    if (piece.queen){
                        return <div className="red queen" onClick={()=>this.handlePieceClick(this.state.boardMatrix,piece)}></div>
                    }
                    else{
                        return <div className="red" onClick={()=>this.handlePieceClick(this.state.boardMatrix,piece)}></div>
                    }
                }else{
                    if (piece.queen){
                        return <div className="black queen" onClick={()=>this.handlePieceClick(this.state.boardMatrix,piece)}></div>
                    }
                    else{
                        return <div className="black" onClick={()=>this.handlePieceClick(this.state.boardMatrix,piece)}></div>
                    }
                }
            }

        if ((this.state.validMovesMatrix[piece.row]!==undefined) && this.state.validMovesMatrix[piece.row][piece.col])
            //console.log(piece.row, piece.col)
            return <div className="valid" onClick={()=>this.handleMove(this.state.boardMatrix,piece,this.state.activeSquare)}>{temp()}</div>
        if (piece.row === this.state.activeSquare.row && piece.col === this.state.activeSquare.col)
            return <div className="selected" >{temp()}</div>
        else 
            return temp()
    }

   
    handleMove = (board,validSpot,activeSquare) => {
        let boardMatrix = board;
        let dataToUpdate = {row:validSpot.row, col:validSpot.col}
        //if you get to the end of the board, make the piece a queen
        if (validSpot.row === 7 || validSpot.row === 0){
            dataToUpdate = {...dataToUpdate, queen:true}
        }
        //if you moved two squares, it was an attack - kill the jumped piece
        if (Math.abs(validSpot.row - activeSquare.row)>1){
            let killedRow = (validSpot.row + activeSquare.row)/2
            let killedCol = (validSpot.col + activeSquare.col)/2
            boardMatrix[killedRow][killedCol] = {active:0, row:killedRow, col:killedCol}
        }
        //copy the old piece into the new location
        boardMatrix[validSpot.row][validSpot.col] = {
            ...boardMatrix[activeSquare.row][activeSquare.col],
            ...dataToUpdate
        }
        //delete the old piece from the old location
        boardMatrix[activeSquare.row][activeSquare.col] = {active:0, row:activeSquare.row, col:activeSquare.col}
        this.setState({
            ...this.state,
            boardMatrix:boardMatrix,
            validMovesMatrix: ValidMoves.createEmptyValidMovesMatrix(),
            activeSquare: {},
            p1Turn: !this.state.p1Turn
        })
        //this.calcBNState(this.state.boardMatrix)
    }

    


    

    
    handlePieceClick = (boardMatrix, piece) =>{
 
        if (piece.red === this.state.p1Turn){
            this.setState({
                ...this.state,
                activeSquare:{row:piece.row, col:piece.col},
                validMovesMatrix:ValidMoves.getValidMoves(boardMatrix, piece)
            })
        }

        
    }


    render() {
        return (
            <div>
                
                <div className="container center">
            
                    {this.state.boardMatrix.map((row,rowIndex) =>
                        <div key={rowIndex} className="row">
                            {row.map((piece,colIndex) =>
                                <div key={colIndex} className={"color"+((rowIndex+colIndex)%2)}>
                                    {this.renderPiece(piece)}
                                </div>
                            )}
                        </div>
                    )}


                    <p>boardState:{BoardTranslations.MatrixtoBN(this.state.boardMatrix)}</p>
                    <p>{this.state.p1Turn ? "P1 RED TURN" : "P2 BLACK TURN"}</p>

     
                </div> 
                          
            </div>
        )
    }
                
}

export default Board;
