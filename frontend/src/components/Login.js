import React, { Component } from "react";
import { connect } from "react-redux";
import LoginRedux from "../redux/actions/LoginRedux";
// import API_Database from "../redux/actions/API_Database";
// import API_StateChGaming from "../redux/actions/API_StateChGaming";
import {isValidAddress} from "ethereumjs-util";
import LabelAndInput from "./LabelAndInput";


class Login extends Component {
    render() {
        return (
            <div>

                <div className="form-group row">
                    <LabelAndInput
                        label="Public ethereum address to interact on:"
                        value={this.props.address}
                        onChange={this.props.handleAddressChange}
                        labelWidthClass={"col-md-5"}
                        textWidthClass={"col-md-7"}
                        isGreen={isValidAddress(this.props.address)}
                    />
                </div>

                <div className="form-group row">
                    <LabelAndInput
                        label="Private key:"
                        value={this.props.privKey}
                        onChange={this.props.handlePrivKeyChange}
                        labelWidthClass={"col-sm-2"}
                        textWidthClass={"col-md-10"}
                        isGreen={this.props.pubPrivKeypairValid}
                    />
                    p1: 0x5ee6962f33f137e7847c8a2852ed18e5a67159f23b0931baf16a95a009ad3901<br/>
                    p2: 0x5ea9296aaa2bd9fa6089aa96f3b98b29b631180000f829f5979b9c472e286020
                </div>
            
                <hr/>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        privKey : state.LoginDetails.privKey,
        pubPrivKeypairValid : state.LoginDetails.pubPrivKeypairValid,
        address: state.LoginDetails.addressSignedIn,
        addressIsValid: state.LoginDetails.addressIsValid,
        //pendingChannels: state.API_Database.PendingChannels
    }
}

function mapDispatchToProps(dispatch) {
    return {
        // updateChButtons: (addressSignedIn) => {
        //     dispatch(LoginRedux.renderChButtons(dispatch, addressSignedIn))
        // },
        handleAddressChange: (Event) => {
            dispatch(LoginRedux.handleAddressChange(dispatch, Event.target.value))  
        },
        handlePrivKeyChange: (Event) => {
            dispatch(LoginRedux.handlePrivKeyChange(dispatch, Event.target.value))
        }

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);




//export default Login;
