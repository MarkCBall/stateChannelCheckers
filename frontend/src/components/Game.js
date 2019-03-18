import React, { Component } from "react";
// import BoardRedux from "../redux/actions/BoardRedux";
import { connect } from "react-redux";

// import BoardTranslations from "../Library/BoardTranslations"
// import { BigNumber } from "ethers/utils";

class Game extends Component {




 

    

     render() {
        return (
            <div>
                <p>
                    gameID__________CreateNew/AcceptGame<br/>
                    Your color RED/BLACK  ----
                    You are wagering XXX tokenName on this game<br/>
                    <br/>
                    Game is currently -NOT- timed on the blockchain
                    <br/> (if enforced)-You need to make a move by block# XXX-   current block# is ####


                </p>
            </div>
        )
    }            
}

function mapStateToProps(state) {
    return {
        // boardMatrix: state.BoardRedux.boardMatrix,
        // p1Turn: state.BoardRedux.p1Turn,
        // prevMove:state.BoardRedux.prevMove
    }
}

function mapDispatchToProps(dispatch) {
    return {
        // calcBoardMatrix: (piecesBN) =>{
        //     dispatch(BoardRedux.calcBoardMatrix(dispatch, piecesBN))
        // },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Game);

