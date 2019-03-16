import React, { Component } from "react";
// import {ethers} from "ethers";
import { BigNumber } from "ethers/utils";
// import { connect } from "react-redux";
// import InteractReduxState from "../redux/actions/InteractReduxState";
// import InteractDatabase from "../redux/actions/InteractDatabase";
// import InteractBlockchain from "../redux/actions/InteractBlockchain";
// import {isValidAddress} from "ethereumjs-util";

import './Board.css';
//mport { Button } from 'react-bootstrap';

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            boardMatrix: [],
            validMovesMatrix: this.createEmptyValidMovesMatrix(),
            activeSquare: {}
        }
}

    


    componentDidMount(){
        let piecesBN = new BigNumber("0x80828486898b8d8f00929496000000000000000098abadafb0b2b4b6b9bbbdbf"); //64 digits long,
        //setup an empty board
        let boardMatrix = []
        for (let row =0;row<8;row++){
            boardMatrix.push([])
            for (let col=0;col<8;col++){
                boardMatrix[row][col] = {row:row, col:col, active:0}
            }
        }
        //parse the bignumber into pieces data
        let str = piecesBN.toHexString()
        for (let i=1;i<33;i++){
            let pieceHex = str.substr(i*2,2)
            let pieceBinary =  (parseInt(pieceHex, 16)).toString(2).padStart(8,"0")
            let col = parseInt(pieceBinary.substr(5,3),2)
            let row = parseInt(pieceBinary.substr(2,3),2)

            //fill pieces into the board
            if (pieceBinary.charAt(0) === "1"){
                boardMatrix[row][col] = {
                    id: i-1,
                    red: (i<17),
                    active: (pieceBinary.charAt(0) === "1"),
                    queen: (pieceBinary.charAt(1) === "1"),
                    row:row,
                    col:col
                }
            }
        }
        this.setState({
            ...this.state,
            boardMatrix:boardMatrix
        })

    }
    createEmptyValidMovesMatrix = () =>{
        let validMovesMatrix = []
        for (let row =0;row<8;row++){
            validMovesMatrix.push([])
            for (let col=0;col<8;col++){
                validMovesMatrix[row][col] = false;
            }
        }
        return validMovesMatrix
    }

    renderPiece = (piece) => {
        //console.log(piece)
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

        if (this.state.validMovesMatrix[piece.row][piece.col])
            //console.log(piece.row, piece.col)
            return <div className="valid" onClick={()=>this.handleMove(this.state.boardMatrix,piece)}>{temp()}</div>
        if (piece.row === this.state.activeSquare.row && piece.col === this.state.activeSquare.col)
            return <div className="selected" >{temp()}</div>
        else 
            return temp()
    }

    handleMove = () => {
        console.log("make move")
    }

    //currently you can kill your own piece??????
    northWestValid = (boardMatrix,piece) =>{
        return ((piece.row > 0) && (piece.col>0) && boardMatrix[piece.row-1][piece.col-1].active && (!piece.red || piece.queen))
    }
    northValid = (boardMatrix,piece) =>{
        return ((piece.row > 0) && !boardMatrix[piece.row-1][piece.col].active && (!piece.red || piece.queen))
    }
    northEastValid = (boardMatrix,piece) =>{
        return ((piece.row > 0) && (piece.col<7) && boardMatrix[piece.row-1][piece.col+1].active && (!piece.red || piece.queen))
    }
    southEastValid = (boardMatrix,piece) =>{
        return ((piece.row < 7) && (piece.col<7) && boardMatrix[piece.row+1][piece.col+1].active && (piece.red || piece.queen))
    }
    southValid = (boardMatrix,piece) =>{
        return ((piece.row < 7) && !boardMatrix[piece.row+1][piece.col].active && (piece.red || piece.queen))
    }
    southWestValid = (boardMatrix,piece) =>{
        return ((piece.row < 7) && (piece.col>0) && boardMatrix[piece.row+1][piece.col-1].active && (piece.red || piece.queen))
    }

    handlePieceClick = (boardMatrix, piece) =>{
        // console.log(piece)
        let validMovesMatrix = []
        for (let row =0;row<8;row++){
            validMovesMatrix.push([])
            for (let col=0;col<8;col++){
                validMovesMatrix[row][col] = false;
            }
        }
        if (this.northWestValid(boardMatrix,piece)){
            validMovesMatrix[piece.row-1][piece.col-1] = true;
        }
        if (this.northValid(boardMatrix,piece)){
            validMovesMatrix[piece.row-1][piece.col] = true;
        }
        if (this.northEastValid(boardMatrix,piece)){
            validMovesMatrix[piece.row-1][piece.col+1] = true;
        }
        if (this.southEastValid(boardMatrix,piece)){
            validMovesMatrix[piece.row+1][piece.col+1] = true;
        }
        if (this.southValid(boardMatrix,piece)){
            validMovesMatrix[piece.row+1][piece.col] = true;
        }
        if (this.southWestValid(boardMatrix,piece)){
            validMovesMatrix[piece.row+1][piece.col-1] = true;
        }

        this.setState({
            ...this.state,
            activeSquare:{row:piece.row, col:piece.col},
            validMovesMatrix:validMovesMatrix
        })

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
     
                </div> 
                          
            </div>
        )
    }
                
}

export default Board;
