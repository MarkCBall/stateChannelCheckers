import React, { Component } from "react";
import { connect } from "react-redux";
import Square from "./Square";


import './Board.css';

class Board extends Component {

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
    }
}

export default connect(mapStateToProps)(Board);
