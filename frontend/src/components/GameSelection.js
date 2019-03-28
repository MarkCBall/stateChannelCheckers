import React, { Component } from "react";
import GameData from "../redux/actions/GameData";
import { connect } from "react-redux";

// import Board from "./Board";
import GamePlayArea from "./GamePlayArea";
import InitGameSequence from "./GameDetails/InitGameSequence";
import GameCreate from "./GameCreate";
import GameSpecs from "./GameDetails/GameSpecs";
import LabelAndInput from "./LabelAndInput";

class GameSelection extends Component {

    renderCreateInitializeOrPlay = () => {
        if (this.props.hasBCData) 
            return <GamePlayArea />
        if (this.props.hasDBData)
            return <InitGameSequence/>  //rename to GameProposed
        return <GameCreate/>
    }

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
                            ((!this.props.hasData) || this.props.iAmP1Red || this.props.iAmP2Black)}
                    />
                    {this.props.hasData &&
                        <div className="col-sm-7">
                            <GameSpecs/>
                        </div>
                    }
                </div>
                <hr/>


                
                {this.renderCreateInitializeOrPlay()}
            
            </div>
        )
    }            
}

function mapStateToProps(state) {
    return {
        address: state.LoginDetails.addressSignedIn,
        hasData:((state.GameData.latestDBTimestamp+state.GameData.latestBCTimestamp)>0),
        hasDBData: (state.GameData.latestDBTimestamp>0),
        hasBCData:(state.GameData.latestBCTimestamp>0),
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