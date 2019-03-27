import React, { Component } from "react";
import GameData from "../redux/actions/GameData";
import { connect } from "react-redux";

import GameActive from "./GameActive";
import GameCreate from "./GameCreate";


class Game extends Component {

       render() {
        return (
            <div>
                <div className="form-group row">
                    <div className="col-sm-3">
                        <label className="float-right">Enter GameID:</label>
                    </div>
                    <div className="col-sm-2">
                        <input
                            type="text"
                            className="form-control float-left"
                            onChange={this.props.handleGameIDChange}
                            value={this.props.gameID}
                        />
                    </div>
                </div>
                
                {this.props.initiated ? <GameActive/> : <GameCreate/>}
            
            </div>
        )
    }            
}

function mapStateToProps(state) {
    return {
        address: state.LoginRedux.addressSignedIn,
        initiated: ((state.GameData.latestBCTimestamp+state.GameData.latestDBTimestamp)>0),
        gameID: state.GameData.gameID,
        addr1:state.GameData.addr1,
        addr2:state.GameData.addr2,
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

// youAreRed =() =>{
//     return (this.props.address === this.props.addr1)
// }