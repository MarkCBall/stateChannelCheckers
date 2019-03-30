import React, { Component } from "react";
import { connect } from "react-redux";
import Highlight from "./Highlight";


import BoardRedux from "../../redux/actions/BoardRedux";

class Square extends Component {
    className = () => {
        if ((this.props.rowIndex + this.props.colIndex) % 2)
            return "color1"
        return "color0"
    }


    // hasPiece = (piece) => {
    //     return (piece.active)
    // }
    // isValidMove = (piece) => {
    //     return ((this.props.validMovesMatrix[piece.row]!==undefined) && this.props.validMovesMatrix[piece.row][piece.col])
    // }

    // isPreviousLocation = (piece) => {
    //     return (piece.row === this.props.prevMove.rowFrom && piece.col === this.props.prevMove.colFrom)
    // }
    // isSelected = (piece) => {
    //     return (piece.row === this.props.activeSquare.row && piece.col === this.props.activeSquare.col)
    // }

    // highlightBeforePutPiece = (piece) => {
    //     if (this.isPreviousLocation()){
    //         return <div className="last-moved-highlight"><div className="blank">{this.putPiece(piece)}</div></div>
    //     }
    //     if (this.isSelected())
    //         return <div className="selected"> {this.putPiece(piece)} </div>
    //     return this.putPiece(piece)
    // }
    // putPieceorValidMove = (piece) => {
    //     if (this.isValidMove())
    //         return <div className="valid"></div>
    //     return <Piece piece={piece}/>

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

    

    render() {
        return (
            <div
                className={this.className()}
                onClick={() => this.props.handleSquareClick(this.props.piece, this.props.boardMatrix)}
            >
                {/* {this.highlightSquareOrRenderPiece(this.props.piece)} */}
                <Highlight piece={this.props.piece}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        boardMatrix: state.GameData.boardMatrix,
        // validMovesMatrix: state.BoardRedux.validMovesMatrix,
        // activeSquare: state.BoardRedux.activeSquare,
        // prevMove: state.GameData.prevMove,
        // turnNum: state.GameData.turnNum
    }
}

function mapDispatchToProps(dispatch) {
    return {
        handleSquareClick: (piece, boardMatrix) => {
            dispatch(BoardRedux.handleSquareClick(dispatch, piece, boardMatrix))
        },
        // handlePieceClick: (boardMatrix, piece) => {
        //     dispatch(BoardRedux.handlePieceClick(dispatch, boardMatrix, piece))
        // },
        // handleMove: (board, validSpot, activeSquare) => {
        //     dispatch(BoardRedux.handleMove(dispatch, board, validSpot, activeSquare))
        // }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Square);

