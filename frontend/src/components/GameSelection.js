import React, { Component } from "react";
import GameData from "../redux/actions/GameData";
import { connect } from "react-redux";

import GameActive from "./GameActive";
import GameCreate from "./GameCreate";
import GameSpecs from "./GameDetails/GameSpecs";
import LabelAndInput from "./LabelAndInput";

class GameSelection extends Component {

       render() {
        return (
            <div>
                <div className="form-group row">

                    <LabelAndInput
                        label="Enter GameID:"
                        value={this.props.gameID}
                        onChange={this.props.handleGameIDChange}
                        labelWidthClass={"col-sm-3"}
                        textWidthClass={"col-md-2"}
                        isGreen={
                            (this.props.gameID !== "") 
                                &&
                            ((!this.props.initiated) || this.props.iAmP1Red || this.props.iAmP2Black)}
                    />

    
                    {this.props.initiated &&
                        <div className="col-sm-7">
                            <GameSpecs/>
                        </div>
                    }
                </div>
                <hr/>
                
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
        iAmP1Red:state.GameData.iAmP1Red,
        iAmP2Black:state.GameData.iAmP2Black,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        handleGameIDChange: (Event) =>{
            dispatch(GameData.handleGameIDChange(dispatch, Event.target.value))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(GameSelection);