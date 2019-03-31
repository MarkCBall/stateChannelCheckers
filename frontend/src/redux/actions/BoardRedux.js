import { HANDLE_PIECE_CLICK } from "../constants/ActionTypes";
// import { SET_BOARD_MATRIX } from "../constants/ActionTypes";
import ValidMoves from "../../Library/ValidMoves"
import BoardTranslations from "../../Library/BoardTranslations"
import CalcBoardChanges from "../../Library/CalcBoardChanges"
import API_Database from "./API_Database"
import API_StateChGaming from "./API_StateChGaming"
import BoardRedux from "./BoardRedux"
import GameData from "./GameData"
// import { HANDLE_MOVE } from "../constants/ActionTypes";
// import { NEXT_TURN } from "../constants/ActionTypes";
import { CLEAR_SELECTION } from "../constants/ActionTypes";
// import { PREV_MOVE_STATS } from "../constants/ActionTypes";
import { SET_MOVETYPE_DB } from "../constants/ActionTypes";
import { SET_MOVETYPE_BCENFORCED } from "../constants/ActionTypes";
import { SET_MOVETYPE_BCUNENFORCED } from "../constants/ActionTypes";


export default {

    handleSquareClick: (dispatch, piece, boardMatrix) => {
        return (dispatch, getState) => {
            let validMovesMatrix = getState().BoardRedux.validMovesMatrix
            if (
                piece.red === (getState().LoginDetails.addressSignedIn === getState().GameData.p1Addr) //clean this line up
                ||
                (validMovesMatrix.length  && validMovesMatrix[piece.row][piece.col]) //duplicate line
             ){
                let activeSquare = getState().BoardRedux.activeSquare
                let validSpot = {row: piece.row, col: piece.col}
                // console.log("got here")
                // console.log(piece)
                // console.log(getState())

                
                //if you click on a green circle to make a move
                if (validMovesMatrix.length  && validMovesMatrix[piece.row][piece.col]){
                    // console.log("handling move with",boardMatrix, validSpot, activeSquare)
                    dispatch(BoardRedux.handleMove(dispatch, boardMatrix, validSpot, activeSquare))
                    
                    
                } else if (piece.red === ((parseInt(getState().GameData.turnNum,16) % 2) === 0)) {
                    dispatch(BoardRedux.setActiveAndValid(dispatch, piece, boardMatrix))
                }
            }
        }
    },
    setActiveAndValid: (dispatch, piece, boardMatrix) => {
        return (dispatch, getState) => {
            // console.log("handlepiececlick activated")
            dispatch({
                type: HANDLE_PIECE_CLICK,
                payload: {
                    activeSquare: {row: piece.row, col: piece.col},
                    validMovesMatrix: ValidMoves.getValidMoves(boardMatrix, piece)
                }
            })
        }
    },

 
    handleMove: (dispatch, board, validSpot, activeSquare) => {
        return (dispatch, getState) => {
            // console.log("board",board)
            // console.log("activeSquare",activeSquare)
            let prevMove = {
                rowFrom: activeSquare.row,
                rowTo: validSpot.row,
                colFrom: activeSquare.col,
                colTo: validSpot.col,
                pieceNumMoved: board[activeSquare.row][activeSquare.col].id,
                pieceNumJumped: CalcBoardChanges.calcPieceNumJumped(board, validSpot, activeSquare)
            }
            // console.log("prevmove is", prevMove)
            let turnNum = parseInt(getState().GameData.turnNum, 16) + 1
            let newBoardMatrix = CalcBoardChanges.calcNewBoardMatrix(board, validSpot, activeSquare)
            let newBNStr = BoardTranslations.MatrixAndMoveToBNStr(newBoardMatrix, prevMove, turnNum)
            console.log(newBNStr)


            let moveType = getState().TempUserInputs.moveType
                // let test = getState().GameData.state
                if (moveType === SET_MOVETYPE_DB){
                    dispatch(API_Database.signAndPostMove(dispatch, newBNStr))
                //if init_BC_Move
                // if (moveType === SET_MOVETYPE_BCENFORCED)
                //         dispatch(API_StateChGaming)
                if (moveType === SET_MOVETYPE_BCUNENFORCED)
                    dispatch(API_StateChGaming.unenforcedBCMove(dispatch, newBNStr))
                }

                dispatch(GameData.updateGameData(dispatch, getState().GameData.gameID,Date.now()))



            
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