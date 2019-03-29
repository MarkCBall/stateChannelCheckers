import React, { Component } from "react";
// import BoardRedux from "../../redux/actions/BoardRedux";
import { connect } from "react-redux";
import Piece from "./Piece";

class Square extends Component {
    className = () => {
        if ((this.props.rowIndex + this.props.colIndex) % 2)
            return "color1"
        return "color0"
    }
    renderIfExists = (piece) => {
        if (piece.active)
            return <Piece piece={piece} />
    }

    render() {
        return (
            <div
                className={this.className()}
                onClick={() => console.log("you clicked DO ALL LOGIC HERE", this.props.piece)}
            >
                {this.renderIfExists(this.props.piece)}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        // boardMatrix: state.GameData.boardMatrix,
        // validMovesMatrix: state.BoardRedux.validMovesMatrix,
        // activeSquare: state.BoardRedux.activeSquare,
        // prevMove: state.GameData.prevMove,
        // turnNum: state.GameData.turnNum
    }
}

// function mapDispatchToProps(dispatch) {
//     return {
//         handlePieceClick: (boardMatrix, piece) => {
//             dispatch(BoardRedux.handlePieceClick(dispatch, boardMatrix, piece))
//         },
//         handleMove: (board, validSpot, activeSquare) => {
//             dispatch(BoardRedux.handleMove(dispatch, board, validSpot, activeSquare))
//         }
//     }
// }
export default connect(mapStateToProps)(Square);

