import React, { Component } from "react";
// import BoardRedux from "../redux/actions/BoardRedux";
// import API_Database from "../redux/actions/API_Database";
import { connect } from "react-redux";

import { SET_MOVETYPE_DB } from "../redux/constants/ActionTypes";
import { SET_MOVETYPE_BCINIT } from "../redux/constants/ActionTypes";
import { SET_MOVETYPE_BCENFORCED } from "../redux/constants/ActionTypes";
import { SET_MOVETYPE_BCUNENFORCED } from "../redux/constants/ActionTypes";


class GameStats extends Component {

    renderBtn = (btnStr, btnFunc, highlight) => {
        let className = "btn-default"
        if (highlight)
            className = "btn-primary"
        return <button
                className={className}
                onClick={btnFunc}
            >
            {btnStr}
            </button>
    }
  

     render() {
        return (
            <div>
                <strong>Your next move should be:</strong>
                {this.renderBtn(
                    "signed to database for speed/efficiency", 
                    this.props.setMoveTypeDB,
                    (this.props.moveType === SET_MOVETYPE_DB)
                )}
                <br/>

                <br/>
                {this.renderBtn(
                    "respond on blockchain and continue on blockchain", 
                    this.props.setMoveTypeBCEnforced,
                    (this.props.moveType === SET_MOVETYPE_BCENFORCED)
                )}
                <br/>
                {this.renderBtn(
                    "respond on blockchain but continue offchain", 
                    this.props.setMoveTypeDBUnenforced,
                    (this.props.moveType === SET_MOVETYPE_BCUNENFORCED)
                )}
                <br/>
                <br/>
                <br/>
                {this.renderBtn(
                    "click a move to post this game on chain, so you can then make a real move on chain", 
                    this.props.setMoveTypeBCInit,
                    (this.props.moveType === SET_MOVETYPE_BCINIT)
                )}

                    
               
                <br/>Toggle enforced/unenforced to be added
                <br/>

            </div>
        )
    }            
}

function mapStateToProps(state) {
    return {
        moveType: state.TempUserInputs.moveType
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setMoveTypeDB: () =>{
            dispatch({type: SET_MOVETYPE_DB})
        },
        setMoveTypeBCInit: () =>{
            dispatch({type: SET_MOVETYPE_BCINIT})
        },
        setMoveTypeBCEnforced: () =>{
            dispatch({type: SET_MOVETYPE_BCENFORCED})
        },
        setMoveTypeDBUnenforced: () =>{
            dispatch({type: SET_MOVETYPE_BCUNENFORCED})
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(GameStats);

