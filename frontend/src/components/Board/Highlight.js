import React, { Component } from "react";
import { connect } from "react-redux";
import Piece from "./Piece";


class Square extends Component {
    isPreviousLocation = (piece) => {
        return (
            piece.row === this.props.prevMove.rowFrom && 
            piece.col === this.props.prevMove.colFrom &&
            this.props.turnNum !== 0
            )
    }
    isMoved = (piece) => {
        return (
            piece.row === this.props.prevMove.rowTo &&
            piece.col === this.props.prevMove.colTo &&
            this.props.turnNum !== 0
            )
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
        turnNum: state.GameData.turnNum
    }
}

export default connect(mapStateToProps)(Square);


