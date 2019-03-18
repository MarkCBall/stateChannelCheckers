import React, { Component } from "react";
import { connect } from "react-redux";
import Piece from "./Piece";

import './Board.css';

class Board extends Component {

    render() {
        return (
            <div>
                <div className="container">
                    {this.props.boardMatrix.map((row,rowIndex) =>
                        <div key={rowIndex} className="row">
                            {row.map((piece,colIndex) =>
                                <div key={colIndex} className={"color"+((rowIndex+colIndex)%2)}>
                                    <Piece piece={piece}/>
                                </div>
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
        p1Turn: state.BoardRedux.p1Turn
    }
}
export default connect(mapStateToProps)(Board);
