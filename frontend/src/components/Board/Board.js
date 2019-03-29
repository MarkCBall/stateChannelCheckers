import React, { Component } from "react";
import { connect } from "react-redux";
import Piece from "../Piece";

// import BoardRedux from "../redux/actions/BoardRedux";
// import { BigNumber } from "ethers/utils";

import './Board.css';

class Board extends Component {

    // componentDidMount() {
    //     let boardBN = new BigNumber("0x000000000000000080828486898b8d8f90929496a9abadafb0b2b4b6b9bbbdbf"); //64 digits long,
    //     this.props.calcBoardMatrix(boardBN)
    // }

    renderSquare = (rowIndex, colIndex, piece) => {
        let className
        if ((rowIndex + colIndex) % 2)
            className = "color1"
        else
            className = "color0"
        return  <div 
                    key={colIndex} 
                    className={className}
                    onClick={1}
                >
                    <Piece piece={piece}/>
                </div>
    }


    render() {
        return (


            <div className="container">
                {this.props.boardMatrix.map((row, rowIndex) =>
                    <div key={rowIndex} className="row">
                        {row.map((piece, colIndex) =>
                            this.renderSquare(rowIndex, colIndex, piece)
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
        prevMove: state.GameData.prevMove,
        turnNum: state.GameData.turnNum
    }
}

export default connect(mapStateToProps)(Board);
