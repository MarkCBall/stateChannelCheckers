import React, { Component } from "react";
import { connect } from "react-redux";
import Piece from "./Piece";


class Square extends Component {
    isPreviousLocation = (piece) => {
        return (piece.row === this.props.prevMove.rowFrom && piece.col === this.props.prevMove.colFrom)
    }
    isMoved = (piece) => {
        return (piece.row === this.props.prevMove.rowTo && piece.col === this.props.prevMove.colTo)
    }
    isSelected = (piece) => {
        return (piece.row === this.props.activeSquare.row && piece.col === this.props.activeSquare.col)
    }

    className = (piece) => {
        if (this.isPreviousLocation(piece) || this.isMoved(piece))
            return "last-moved-highlight"
        if (this.isSelected(piece))
            return "selected"
        return ""
    }

    hasPiece = (piece) => {
        return (piece.active)
    }
    isValidMove = (piece) => {
        return ((this.props.validMovesMatrix[piece.row]!==undefined) && this.props.validMovesMatrix[piece.row][piece.col])
    }

  
    

    // highlightBeforePutPiece = (piece) => {
    //     if (this.isPreviousLocation()){
    //         return <div className="last-moved-highlight"><div className="blank">{this.putPiece(piece)}</div></div>
    //     }
    //     if (this.isSelected())
    //         return <div className="selected"> {this.putPiece(piece)} </div>
    //     return this.putPiece(piece)
    // }



    // highlightSquareOrRenderPiece = (piece) => {
    //     if (piece.active)
    //         return this.renderPiece(piece)
    //     if (this.isValidMove(piece))
    //         return <div className="valid"></div>
    //     if (this.isPreviousLocation(piece))
    //         return <div className="last-moved-highlight"><div className="blank">{squareDiv}</div></div>
    // }
    // renderPiece = (piece) => {
    //     return <Piece piece={piece} />
    // }
    renderNext = (piece) => {
        if (this.hasPiece(piece))
            return <Piece piece={this.props.piece}/>
        if (this.isValidMove(piece))
            return <div className="valid"></div>
        return <div className="blank"></div>
    }

    

    render() {
        return (
            <div className={this.className(this.props.piece)}>
                {this.renderNext(this.props.piece)}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        // boardMatrix: state.GameData.boardMatrix,
        validMovesMatrix: state.BoardRedux.validMovesMatrix,
        activeSquare: state.BoardRedux.activeSquare,
        prevMove: state.GameData.prevMove,
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


