import React, { Component } from "react";
import { connect } from "react-redux";


class GameSpecs extends Component {

    render() {
        return (
            <div>
                P1Address:{this.props.p1Addr}<br/>
                P2Address:{this.props.p2Addr}<br/>  
                VCAddr:{this.props.VCAddr}<br/>
                ERC20Addr:{this.props.ERC20Addr}<br/>
                #token buy-in:{this.props.ERC20Amount}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                turn length:{this.props.turnLength} blocks       
            </div>
        )
    }            
}

function mapStateToProps(state) {
    return {
        VCAddr:state.GameData.VCAddr,
        ERC20Amount:state.GameData.ERC20Amount,
        ERC20Addr:state.GameData.ERC20Addr,
        turnLength:state.GameData.turnLength,
        p1Addr:state.GameData.p1Addr,
        p2Addr:state.GameData.p2Addr,
    }
}


export default connect(mapStateToProps)(GameSpecs);
