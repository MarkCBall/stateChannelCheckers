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
            piecesBN: new BigNumber("0x80828486898b8d8f909294960000000000000000a9abadafb0b2b4b6b9bbbdbf"), //64 digits long
        }



    }

    piecesBNtopiecesArr = () => {
        
        //setup an empty board
        let boardArr = []
        for (let row =0;row<8;row++){
            boardArr.push([])
            for (let col=0;col<8;col++){
                boardArr[row][col] = {row:row, col:col, active:0}
            }
        }
        //parse the bignumber into game data
        let str = this.state.piecesBN.toHexString()
        for (let i=1;i<33;i++){
            let pieceHex = str.substr(i*2,2)
            let pieceBinary =  (parseInt(pieceHex, 16)).toString(2).padStart(8,"0")
            let col = parseInt(pieceBinary.substr(5,3),2)
            let row = parseInt(pieceBinary.substr(2,3),2)

            //fill pieces into the board
            if (pieceBinary.charAt(0) === "1"){
                boardArr[row][col] = {
                    id: i-1,
                    red: (i<17),
                    active: (pieceBinary.charAt(0) === "1"),
                    queen: (pieceBinary.charAt(1) === "1"),
                    row:row,
                    col:col
                }
            }
        }
        console.log(boardArr[0])
        return (boardArr)
    }

    renderPiece = (ele) => {
        console.log(ele)
        if (ele.active)
            if (ele.red){
                if (ele.queen){
                    return <>R</>
                }
                else{
                    return <div className="red"></div>
                }
            }else{
                if (ele.queen){
                    return <>B</>
                }
                else{
                    return <div className="black"></div>
                }
            }
      
    }


    render() {
        return (
            <div>
                
                <div className="container center">
            
                    {this.piecesBNtopiecesArr().map((row,rowIndex) =>
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
