import React, { Component } from "react";
import { connect } from "react-redux";
import LoginRedux from "../redux/actions/LoginRedux";
// import InteractDatabase from "../redux/actions/InteractDatabase";
// import InteractBlockchain from "../redux/actions/InteractBlockchain";
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
                </div>
            
                <hr/>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        privKey : state.LoginRedux.privKey,
        pubPrivKeypairValid : state.LoginRedux.pubPrivKeypairValid,
        address: state.LoginRedux.addressSignedIn,
        addressIsValid: state.LoginRedux.addressIsValid,
        //pendingChannels: state.InteractDatabase.PendingChannels
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
