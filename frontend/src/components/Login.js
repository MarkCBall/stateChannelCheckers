import React, { Component } from "react";
import { connect } from "react-redux";
import LoginRedux from "../redux/actions/LoginRedux";
// import InteractDatabase from "../redux/actions/InteractDatabase";
// import InteractBlockchain from "../redux/actions/InteractBlockchain";
import {isValidAddress} from "ethereumjs-util";


//mport { Button } from 'react-bootstrap';

class Login extends Component {
  
    // componentDidMount(){
    //     this.props.updateChButtons(this.props.address);
    // }

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
                } &nbsp;
                
                
            

                {/* <br/><br/><br/>
                <button className="btn btn-info btn-sm">Toggle Display</button>
                <button className="btn btn-danger btn-sm">Interact with blockchain</button>
                <button className="btn btn-success btn-sm">Interact with statechannel</button> */}
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
