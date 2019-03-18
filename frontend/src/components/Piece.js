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
        return  <div 
                    className={this.getPieceClassName(piece,this.props.turnNum)} 
                    onClick={()=>
                        this.props.handlePieceClick(this.props.boardMatrix,piece)
                    }>
                    {/* {this.addMoveText(piece)} */}
                </div>

    }


    fillSquare = (piece) => {
        //if its a valid location to move to, hightlight it
        if ((this.props.validMovesMatrix[piece.row]!==undefined) && this.props.validMovesMatrix[piece.row][piece.col])
            return  <div 
                        className="valid" 
                        onClick={()=>
                            this.props.handleMove(this.props.boardMatrix,piece,this.props.activeSquare)
                        }>
                    </div>
        //if its selected, hightling and render it
        else if (piece.row === this.props.activeSquare.row && piece.col === this.props.activeSquare.col)
            return  <div 
                        className="selected">
                            {this.renderPiece(piece)}
                        </div>
        //render it
        else 
            return this.renderPiece(piece)
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
        boardMatrix: state.BoardRedux.boardMatrix,
        validMovesMatrix: state.BoardRedux.validMovesMatrix,
        activeSquare: state.BoardRedux.activeSquare,
        prevMove: state.BoardRedux.prevMove,
        turnNum: state.BoardRedux.turnNum
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

