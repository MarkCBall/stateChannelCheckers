import React, { Component } from "react";
import { connect } from "react-redux";


class ColorIndicator extends Component {

    renderPlayerColor =  () => {
        if (this.props.iAmP1Red){
            return <><div className="red"></div>Player 1</>
        }
        if (this.props.iAmP2Black){
            return <><div className="black"></div>Player 2</>
        }
        return <><div className="valid"></div>Observer</>
    }
    render() {
        return (
            <div>
                {this.renderPlayerColor()}                 
            </div>
        )
    }            
}

function mapStateToProps(state) {
    return {
        iAmP1Red:state.GameData.iAmP1Red,
        iAmP2Black:state.GameData.iAmP2Black,
    }
}


export default connect(mapStateToProps)(ColorIndicator);
