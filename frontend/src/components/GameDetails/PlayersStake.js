import React, { Component } from "react";
import { connect } from "react-redux";


class PlayerStake extends Component {

    render() {
        return (
            <div>
                player1:{this.props.p1Addr}<br/>
                player2:{this.props.p2Addr}<br/>
                p1 and p2 staked coin amnt here
                           
            </div>
        )
    }            
}

function mapStateToProps(state) {
    return {
        p1Addr:state.GameData.p1Addr,
        p2Addr:state.GameData.p2Addr,
    }
}


export default connect(mapStateToProps)(PlayerStake);
