import React, { Component } from "react";
import { connect } from "react-redux";


class TurnExpiry extends Component {


    renderTurnInfo = () =>{
        //need to force update?
        if (this.props.blockNum<100000000000000000000000000000){
            return <> You must submit a move before block# {this.props.blockNum+this.props.turnLength}<br/>
            You have {this.props.blockNum+this.props.turnLength-this.props.getCurrentBlockNum} blocks to make a move
            </>
        }
    }

    render() {
        return (
            <div>
                Turn#: {this.props.turnNum+1}<br/>
                {this.renderTurnInfo()}             
            </div>
        )
    }            
}

function mapStateToProps(state) {
    return {
        getCurrentBlockNum:500,//THIS IS A PLACEHOLDER ONLY
        turnNum: state.GameData.turnNum,
        blockNum:state.GameData.blockNum,
        turnLength:state.GameData.turnLength,
    }
}


export default connect(mapStateToProps)(TurnExpiry);
