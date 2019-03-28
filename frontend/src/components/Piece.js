import React, { Component } from "react";
import BoardRedux from "../redux/actions/BoardRedux";
import { connect } from "react-redux";


class Piece extends Component {

    getPieceClassName = (piece,turnNum) => {
        if (piece.active){
            let className = ""
            if (turnNum%2) //if black
                className += (piece.red) ? "red" : "Black"
            else
                className += (piece.red) ? "Red" : "black"
            className += (piece.queen) ? " queen" : ""
            return className
        }
    }

    renderPiece = (piece) => {
        let pieceDiv = <div 
                        className={this.getPieceClassName(piece,this.props.turnNum)} 
                        onClick={()=>
                            this.props.handlePieceClick(this.props.boardMatrix,piece)
                        }>
                    </div>
        if (piece.row === this.props.prevMove.rowTo && piece.col === this.props.prevMove.colTo)
            return <div className="last-moved-highlight">{pieceDiv}</div>
        return pieceDiv
    }


    fillSquare = (piece) => {
        let squareDiv
        //if its a valid location to move to, hightlight it
        if ((this.props.validMovesMatrix[piece.row]!==undefined) && this.props.validMovesMatrix[piece.row][piece.col])
            squareDiv = <div 
                        className="valid" 
                        onClick={()=>
                            this.props.handleMove(this.props.boardMatrix,piece,this.props.activeSquare)
                        }>
                    </div>
        //if its selected, hightling and render it
        else if (piece.row === this.props.activeSquare.row && piece.col === this.props.activeSquare.col)
            squareDiv = <div 
                        className="selected">
                            {this.renderPiece(piece)}
                        </div>
        //render it
        else 
            squareDiv = this.renderPiece(piece)
            
        //if the square is where the last piece moved from, highlight it
        if (piece.row === this.props.prevMove.rowFrom && piece.col === this.props.prevMove.colFrom)
            return <div className="last-moved-highlight"><div className="blank">{squareDiv}</div></div>
        return squareDiv
    }

    render() {
        return (
            <div>
                {this.fillSquare(this.props.piece)}              
            </div>
        )
    }            
}

function mapStateToProps(state) {
    return {
        boardMatrix: state.GameData.boardMatrix,
        validMovesMatrix: state.BoardRedux.validMovesMatrix,
        activeSquare: state.BoardRedux.activeSquare,
        prevMove: state.GameData.prevMove,
        turnNum: state.GameData.turnNum
    }
}

function mapDispatchToProps(dispatch) {
    return {
        handlePieceClick: (boardMatrix, piece) =>{
            dispatch(BoardRedux.handlePieceClick(dispatch, boardMatrix, piece))
        },
        handleMove: (board,validSpot,activeSquare) =>{
            dispatch(BoardRedux.handleMove(dispatch, board,validSpot,activeSquare))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Piece);

