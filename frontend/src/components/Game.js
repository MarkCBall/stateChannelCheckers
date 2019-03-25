import React, { Component } from "react";
import GameData from "../redux/actions/GameData";
import { connect } from "react-redux";

// import BoardTranslations from "../Library/BoardTranslations"
// import { BigNumber } from "ethers/utils";

class Game extends Component {

     render() {
        return (
            <div>
                <p>
                    <strong>Enter game#:</strong>
                    <input
                        type="text" 
                        onChange={this.props.handleGameIDChange}
                        value={this.props.gameID}
                        /><br/>

                    opponent: addr=0xf6d5c6d500cac10ee7e6efb5c1b479cfb789950a<br/>   privkey =0x88f37cfbaed8c0c515c62a17a3a1ce2f397d08bbf20dcc788b69f11b5a5c9791
                    <br/>gameID__________CreateNew/AcceptGame<br/>
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
        gameID: state.GameData.gameID,
        // p1Turn: state.BoardRedux.p1Turn,
        // prevMove:state.BoardRedux.prevMove
    }
}

function mapDispatchToProps(dispatch) {
    return {
        handleGameIDChange: (Event) =>{
            dispatch(GameData.handleGameIDChange(dispatch, Event.target.value))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Game);

