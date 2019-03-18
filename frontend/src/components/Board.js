import React, { Component } from "react";
import { connect } from "react-redux";
import Piece from "./Piece";

import './Board.css';

class Board extends Component {

    renderSquare = (rowIndex, colIndex, piece) =>{
        // let fromSquare = (rowIndex === this.props.prevMove.rowFrom && colIndex === this.props.prevMove.colFrom)
        return <div key={colIndex} className={"color"+((rowIndex+colIndex)%2)}>
                    {/* {fromSquare? <div  className="from"></div>:null} */}
                    <Piece piece={piece}/>
                </div>
    }
    
    render() {
        return (
            <div>
                <p>{this.props.p1Turn ? "P1 RED TURN" : "P2 BLACK TURN"}</p>
                <div className="container">
                    {this.props.boardMatrix.map((row,rowIndex) =>
                        <div key={rowIndex} className="row">
                            {row.map((piece,colIndex) =>
                                this.renderSquare(rowIndex, colIndex, piece)
                            )}
                        </div>
                    )}
                </div>        
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
export default connect(mapStateToProps)(Board);
