import React, { Component } from "react";
import { connect } from "react-redux";
import LoginRedux from "../redux/actions/LoginRedux";
// import InteractDatabase from "../redux/actions/InteractDatabase";
// import InteractBlockchain from "../redux/actions/InteractBlockchain";
import {isValidAddress} from "ethereumjs-util";



class Login extends Component {
    render() {
        return (
            <div>
                Public ethereum address to interact on:
               
                    {isValidAddress(this.props.address) ?
                        <input 
                            className="form-control is-valid"
                            type="text" 
                            onChange={this.props.handleAddressChange}
                            value={this.props.address}
                        />
                    :
                        <input 
                            className="form-control is-invalid"
                            type="text" 
                            onChange={this.props.handleAddressChange}
                            value={this.props.address}
                        />
                    }
                    
                
                Private key:

                {this.props.pubPrivKeypairValid ? 
                    <input 
                        className="form-control is-valid"
                        type="text" 
                        onChange={this.props.handlePrivKeyChange}
                        value={this.props.privKey}
                    />
                : 
                    <input 
                        className="form-control is-invalid"
                        type="text" 
                        onChange={this.props.handlePrivKeyChange}
                        value={this.props.privKey}
                    />
                }
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
