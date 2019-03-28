import { HANDLE_PIECE_CLICK } from "../constants/ActionTypes";
import { SET_BOARD_MATRIX } from "../constants/ActionTypes";
import ValidMoves from "../../Library/ValidMoves"
import BoardTranslations from "../../Library/BoardTranslations"
import CalcBoardChanges from "../../Library/CalcBoardChanges"
import InteractDatabase from "./InteractDatabase"

import { HANDLE_MOVE } from "../constants/ActionTypes";
// import { NEXT_TURN } from "../constants/ActionTypes";
import { CLEAR_SELECTION } from "../constants/ActionTypes";
import { PREV_MOVE_STATS } from "../constants/ActionTypes";



export default {
    handlePieceClick: (dispatch, boardMatrix, piece) => {
        return (dispatch, getState) => {
            if (piece.red === getState().BoardRedux.p1Turn) {
                dispatch({
                    type: HANDLE_PIECE_CLICK,
                    payload: {
                        activeSquare: { row: piece.row, col: piece.col },
                        validMovesMatrix: ValidMoves.getValidMoves(boardMatrix, piece)
                    }
                })
            }
        }
    },
    calcBoardMatrix: (dispatch, piecesBN) => {
        return (dispatch) => {
            dispatch({
                type: SET_BOARD_MATRIX,
                payload: BoardTranslations.BNtoMatrix(piecesBN)
            })
        }
    },
    handleMove: (dispatch, board, validSpot, activeSquare) => {
        return (dispatch, getState) => {
            // if (window.confirm("Sign this move?")){//put back in after debugging
                dispatch({
                    type: PREV_MOVE_STATS,
                    payload: {
                        rowFrom: activeSquare.row,
                        rowTo: validSpot.row,
                        colFrom: activeSquare.col,
                        colTo: validSpot.col,
                        pieceNumMoved: board[activeSquare.row][activeSquare.col].id,
                        pieceNumJumped: CalcBoardChanges.calcPieceNumJumped(board,validSpot, activeSquare)
                    }
                })
                dispatch({
                    type: CLEAR_SELECTION,
                    payload: {
                        validMovesMatrix: ValidMoves.createEmptyValidMovesMatrix(),
                        activeSquare: {},
                    }
                })
                let boardMatrix = CalcBoardChanges.calcNewBoardMatrix(board,validSpot,activeSquare)
                dispatch({
                    type: HANDLE_MOVE,
                    payload: boardMatrix
                })
                let BoardState = getState().BoardRedux
                let boardStr = BoardTranslations.MatrixAndMoveToBNStr(boardMatrix,BoardState.prevMove,BoardState.turnNum)

                dispatch(InteractDatabase.signAndPostMove(dispatch,boardStr))
    

            // }
        }
    }
}