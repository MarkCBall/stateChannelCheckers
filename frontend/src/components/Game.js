import React, { Component } from "react";
import GameData from "../redux/actions/GameData";
import { connect } from "react-redux";

// import BoardTranslations from "../Library/BoardTranslations"
// import { BigNumber } from "ethers/utils";

class Game extends Component {

    renderGameDefaults = () => {
        if (this.props.initiated)
            return <>
                player1:{this.props.addr1}<br/>
                player2:{this.props.addr2}<br/>
                payout:{this.props.payout}<br/>
                turnNum: {this.props.turnNum}<br/>
                blockNum:{this.props.blockNum}<br/>
                VCAddr:{this.props.VCAddr}<br/>
                ERC20Addr:{this.props.ERC20Addr}<br/>
                blocksPerTurn:{this.props.blocksPerTurn}<hr/>
            </>
        return <button>Toggle create New Game</button>
    }

    youArePlaying = () =>{
        return ((this.props.address === this.props.addr1) || (this.props.address === this.props.addr2))
    }
    renderGameSelector = () =>{
        let className = this.youArePlaying() ? "form-control is-valid" : "form-control is-invalid"
        return <input
                    className={className}
                    type="text" 
                    onChange={this.props.handleGameIDChange}
                    value={this.props.gameID}
                />
    }
     render() {
        return (
            <div>
                <strong>Enter game#:</strong>
                {this.renderGameSelector()}
                {this.renderGameDefaults()}
 
            </div>
        )
    }            
}

function mapStateToProps(state) {
    return {
        address: state.LoginRedux.addressSignedIn,
        initiated: state.GameData.initiated,
        gameID: state.GameData.gameID,
        addr1:state.GameData.addr1,
        addr2:state.GameData.addr2,
        payout:state.GameData.payout,
        // state:state.GameData.
        turnNum: state.GameData.turnNum,
        blockNum:state.GameData.blockNum,
        VCAddr:state.GameData.VCAddr,
        ERC20Addr:state.GameData.ERC20Addr,
        blocksPerTurn:state.GameData.blocksPerTurn,
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