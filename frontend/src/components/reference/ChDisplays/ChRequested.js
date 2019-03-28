import React, { Component } from "react";
import { connect } from "react-redux";
import Initial from "./SubChDisplays/Initial";
import API_StateChGaming from "../../redux/actions/API_StateChGaming";


class ChRequested extends Component {


    render() {
        return (
            <div>
               
               <Initial/>
               <button 
                    className="btn btn-danger"
                    onClick={this.props.countersignChannel}
                > If these terms are acceptable, countersign it and put on blockchain</button>
            
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        // address: state.LoginDetails.addressSignedIn,
        // addressIsValid: state.LoginDetails.addressIsValid,
        // pendingChannels: state.InteractDatabase.PendingChannels
    }
}

function mapDispatchToProps(dispatch) {
    return {
        countersignChannel: () => {
            dispatch(API_StateChGaming.countersignChannel(dispatch))
            
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ChRequested);



