import React, { Component } from "react";
import { connect } from "react-redux";


class ColorIndicator extends Component {

    renderPlayerColor =  () => {
        if ((this.props.turnNum % 2) === 0){
            return <div className="Red"></div>
                        
        }
        return <div className="Black"></div>

    }
    render() {
        return (
            <div className="row">
                {this.renderPlayerColor()}                 
                's Turn
            </div>
        )
    }            
}

function mapStateToProps(state) {
    return {
        turnNum:state.GameData.turnNum,
        // iAmP2Black:state.GameData.iAmP2Black,
    }
}


export default connect(mapStateToProps)(ColorIndicator);
