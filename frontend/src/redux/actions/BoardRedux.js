import { HANDLE_PIECE_CLICK } from "../constants/ActionTypes";
// import { SET_BOARD_MATRIX } from "../constants/ActionTypes";
import ValidMoves from "../../Library/ValidMoves"
import BoardTranslations from "../../Library/BoardTranslations"
import CalcBoardChanges from "../../Library/CalcBoardChanges"
// import API_Database from "./API_Database"
import API_StateChGaming from "./API_StateChGaming"
import BoardRedux from "./BoardRedux"
// import { HANDLE_MOVE } from "../constants/ActionTypes";
// import { NEXT_TURN } from "../constants/ActionTypes";
import { CLEAR_SELECTION } from "../constants/ActionTypes";
// import { PREV_MOVE_STATS } from "../constants/ActionTypes";



export default {

    handleSquareClick: (dispatch, piece, boardMatrix) => {
        return (dispatch, getState) => {
            // console.log(piece)
            // console.log(getState())

            let validMovesMatrix = getState().BoardRedux.validMovesMatrix
            //if you click on a green circle to make a move
            if (validMovesMatrix[piece.row][piece.col]){
                // let moveType = getState().TempUserInputs.moveType
                // if moveType === "SET_MOVETYPE_DB" 
                    // if (window.confirm("Sign this move?")){
                        //dispatch DB post
                    // }
                // if movetypestate === "enforcedBC" 
                    // if (window.confirm("call enformedBCMove?")){
                        //dispatch BCenforced
                    // }
                // if movetypestate === "unenforcedBC" 
                    // if (window.confirm("call unenformedBCMove?")){
                        //dispatch BCunenforced
                    // }
                
            } else if (piece.red === ((getState().GameData.turnNum % 2) === 0)) {
                dispatch(BoardRedux.setActiveAndValid(dispatch, piece, boardMatrix))
            }
        }
    },
    setActiveAndValid: (dispatch, piece, boardMatrix) => {
        return (dispatch, getState) => {
            console.log("handlepiececlick activated")
            dispatch({
                type: HANDLE_PIECE_CLICK,
                payload: {
                    activeSquare: { row: piece.row, col: piece.col },
                    validMovesMatrix: ValidMoves.getValidMoves(boardMatrix, piece)
                }
            })
        }
    },

    // setMoveTypeDB: (dispatch) => {

    // },
    // setMoveTypeBCEnforced: (dispatch) => {

    // },
    // setMoveTypeDBUnenforced: (dispatch) => {

    // },



 
    handleMove: (dispatch, board, validSpot, activeSquare) => {
        return (dispatch, getState) => {
            // if (window.confirm("Sign this move?")){//put back in after debugging
            // console.log(activeSquare)
            let prevMove = {
                rowFrom: activeSquare.row,
                rowTo: validSpot.row,
                colFrom: activeSquare.col,
                colTo: validSpot.col,
                pieceNumMoved: board[activeSquare.row][activeSquare.col].id,
                pieceNumJumped: CalcBoardChanges.calcPieceNumJumped(board, validSpot, activeSquare)
            }
            let turnNum = getState().GameData.turnNum + 1
            let newBoardMatrix = CalcBoardChanges.calcNewBoardMatrix(board, validSpot, activeSquare)
            let newBNStr = BoardTranslations.MatrixAndMoveToBNStr(newBoardMatrix, prevMove, turnNum)


            dispatch(API_StateChGaming.unenforcedBCMove(dispatch, newBNStr))
            dispatch({
                type: CLEAR_SELECTION,
                payload: {
                    validMovesMatrix: ValidMoves.createEmptyValidMovesMatrix(),
                    activeSquare: {},
                }
            })



            // dispatch({
            //     type: PREV_MOVE_STATS,
            //     payload: {
            //         rowFrom: activeSquare.row,
            //         rowTo: validSpot.row,
            //         colFrom: activeSquare.col,
            //         colTo: validSpot.col,
            //         pieceNumMoved: board[activeSquare.row][activeSquare.col].id,
            //         pieceNumJumped: CalcBoardChanges.calcPieceNumJumped(board,validSpot, activeSquare)
            //     }
            // })

            // let boardMatrix = CalcBoardChanges.calcNewBoardMatrix(board,validSpot,activeSquare)
            // dispatch({
            //     type: HANDLE_MOVE,
            //     payload: boardMatrix
            // })
            // let BoardState = getState().BoardRedux
            // let boardStr = BoardTranslations.MatrixAndMoveToBNStr(boardMatrix,BoardState.prevMove,BoardState.turnNum)

            // dispatch(API_Database.signAndPostMove(dispatch,boardStr))


            // }
        }
    }
}