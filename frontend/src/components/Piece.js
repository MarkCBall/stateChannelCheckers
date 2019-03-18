import React, { Component } from "react";
import BoardRedux from "../redux/actions/BoardRedux";
import { connect } from "react-redux";


class Piece extends Component {
 
    renderPiece = (piece) => {
        //console.log(piece) make into component
        let temp = () =>{
            if (piece.active)
                if (piece.red){
                    if (piece.queen){
                        return <div className="red queen" onClick={()=>this.props.handlePieceClick(this.props.boardMatrix,piece)}></div>
                    }
                    else{
                        return <div className="red" onClick={()=>this.props.handlePieceClick(this.props.boardMatrix,piece)}></div>
                    }
                }else{
                    if (piece.queen){
                        return <div className="black queen" onClick={()=>this.props.handlePieceClick(this.props.boardMatrix,piece)}></div>
                    }
                    else{
                        return <div className="black" onClick={()=>this.props.handlePieceClick(this.props.boardMatrix,piece)}></div>
                    }
                }
            }

        if ((this.props.validMovesMatrix[piece.row]!==undefined) && this.props.validMovesMatrix[piece.row][piece.col])
            //console.log(piece.row, piece.col)
            return <div className="valid" onClick={()=>this.props.handleMove(this.props.boardMatrix,piece,this.props.activeSquare)}>{temp()}</div>
        if (piece.row === this.props.activeSquare.row && piece.col === this.props.activeSquare.col)
            return <div className="selected" >{temp()}</div>
        else 
            return temp()
    }



    render() {
        return (
            <div>
                {this.renderPiece(this.props.piece)}              
            </div>
        )
    }
                
}

function mapStateToProps(state) {
    return {
        boardMatrix: state.BoardRedux.boardMatrix,
        validMovesMatrix: state.BoardRedux.validMovesMatrix,
        activeSquare: state.BoardRedux.activeSquare,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        handlePieceClick: (boardMatrix, piece) =>{
            dispatch(BoardRedux.handlePieceClick(dispatch, boardMatrix, piece))
        },
        // calcBoardMatrix: (piecesBN) =>{
        //     dispatch(BoardRedux.calcBoardMatrix(dispatch, piecesBN))
        // },
        handleMove: (board,validSpot,activeSquare) =>{
            dispatch(BoardRedux.handleMove(dispatch, board,validSpot,activeSquare))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Piece);

