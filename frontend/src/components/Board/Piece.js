import React, { Component } from "react";
import { connect } from "react-redux";


class Piece extends Component {

    getPieceClassName = (piece) => {
        if (piece.active){
            let className = ""

            if (piece.red){
                className += (this.props.iAmP1Red) ? "Red" : "red"
            }else{
                className += (this.props.iAmP2Black) ? "Black" : "black"
            }
            className += (piece.queen) ? " queen" : ""
            return className
        }
    }
    render() {
        return (
            <div className={this.getPieceClassName(this.props.piece)}>
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
export default connect(mapStateToProps)(Piece);
