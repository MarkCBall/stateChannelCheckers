import { HANDLE_PIECE_CLICK } from "../constants/BoardRedux";
import { SET_BOARD_MATRIX } from "../constants/BoardRedux";
import ValidMoves from "../../Library/ValidMoves"
import BoardTranslations from "../../Library/BoardTranslations"
import { HANDLE_MOVE } from "../constants/BoardRedux";
// import { NEXT_TURN } from "../constants/BoardRedux";
import { CLEAR_SELECTION } from "../constants/BoardRedux";
import { PREV_MOVE_STATS } from "../constants/BoardRedux";



export default {
    handlePieceClick: (dispatch, boardMatrix, piece) => {
        return (dispatch,getState) =>{
            if (piece.red === getState().BoardRedux.p1Turn){
                dispatch({
                    type: HANDLE_PIECE_CLICK,
                        payload: {
                            activeSquare:{row:piece.row, col:piece.col},
                            validMovesMatrix:ValidMoves.getValidMoves(boardMatrix, piece)
                        }
                })
            }
        }
    },
    calcBoardMatrix:(dispatch, piecesBN) => {
        return (dispatch) =>{
                dispatch({
                    type: SET_BOARD_MATRIX,
                    payload: BoardTranslations.BNtoMatrix(piecesBN)
                })
        }
    },
    handleMove:(dispatch, board,validSpot,activeSquare) => {
        return (dispatch) =>{
            let p1Went = board[activeSquare.row][activeSquare.col].red
            dispatch({
                type: PREV_MOVE_STATS,
                payload: {
                    rowFrom:activeSquare.row,
                    rowTo:validSpot.row,
                    colFrom:activeSquare.col,
                    colTo:validSpot.col,
                    p1Went:p1Went
                }
            })
            dispatch({
                type: CLEAR_SELECTION,
                payload: {
                    validMovesMatrix: ValidMoves.createEmptyValidMovesMatrix(),
                    activeSquare: {},
                }
            })

            let boardMatrix = board;
            let dataToUpdate = {row:validSpot.row, col:validSpot.col}
            //if you get to the end of the board, make the piece a queen
            if (validSpot.row === 7 || validSpot.row === 0){
                dataToUpdate = {...dataToUpdate, queen:true}
            }
            //if you moved two squares, it was an attack - kill the jumped piece
            if (Math.abs(validSpot.row - activeSquare.row)>1){
                let killedRow = (validSpot.row + activeSquare.row)/2
                let killedCol = (validSpot.col + activeSquare.col)/2
                boardMatrix[killedRow][killedCol] = {active:0, row:killedRow, col:killedCol}
            }
            //copy the old piece into the new location
            boardMatrix[validSpot.row][validSpot.col] = {
                ...boardMatrix[activeSquare.row][activeSquare.col],
                ...dataToUpdate
            }
            //delete the old piece from the old location
            boardMatrix[activeSquare.row][activeSquare.col] = {active:0, row:activeSquare.row, col:activeSquare.col}
            dispatch({
                type: HANDLE_MOVE,
                payload: boardMatrix
            })
            // dispatch({type: NEXT_TURN})
        }
    }
}