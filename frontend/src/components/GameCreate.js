import React, { Component } from "react";
// import GameData from "../redux/actions/GameData";
import { connect } from "react-redux";
import LabelAndInput from "./LabelAndInput";
import InteractDatabase from "../redux/actions/InteractDatabase";

class GameCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            p2Addr: "0x074349cbaa42a33749589695b0c2ed6d933d2323",
            ERC20Addr: "0x0000000000000000000000000000000000000002",
            ERC20Amount: 10000,
            VCAddr: "0x0000000000000000000000000000000000000003",
            turnLength: 100,
        }
    }
    looksLikeAddr = (str) => {
        return /^0[xX][0-9a-fA-F]*$/.test(str)
    }
    looksLikeInt = (str) => {
        return ((str) === "" || parseInt(str, 10) === Number(str))
    }
    isAddr = (str) => {
        return (/^0[xX][0-9a-fA-F]*$/.test(str) && str.length === 42)
    }
    isInt = (str) => {
        return (parseInt(str, 10) === Number(str))
    }

    handlep2AddrChange = (event) => {
        let p2Addr = event.target.value
        if (this.looksLikeAddr(p2Addr)) {
            this.setState({
                ...this.state,
                p2Addr: p2Addr
            })
        }
    }
    handleERC20AddrChange = (event) => {
        let ERC20Addr = event.target.value
        if (this.looksLikeAddr(ERC20Addr)) {
            this.setState({
                ...this.state,
                ERC20Addr: ERC20Addr
            })
        }
    }
    handleERC20AmountChange = (event) => {
        let ERC20Amount = event.target.value
        if (this.looksLikeInt(ERC20Amount)) {
            this.setState({
                ...this.state,
                ERC20Amount: ERC20Amount
            })
        }
    }
    handleVCAddrChange = (event) => {
        let VCAddr = event.target.value
        if (this.looksLikeAddr(VCAddr)) {
            this.setState({
                ...this.state,
                VCAddr: VCAddr
            })
        }
    }
    handleturnLengthChange = (event) => {
        let turnLength = event.target.value
        if (this.looksLikeInt(turnLength)) {
            this.setState({
                ...this.state,
                turnLength: turnLength
            })
        }
    }

    allInputsValid = () => {
        if (
            this.isAddr(this.state.p2Addr) &&
            this.isInt(this.state.turnLength) &&
            this.isAddr(this.state.VCAddr) &&
            this.isAddr(this.state.ERC20Addr) &&
            this.isInt(this.state.ERC20Amount) &&
            this.isInt(this.props.gameID) &&
            this.props.pubPrivKeypairValid
        )
            return true
    }

    handleSignAndSubmitClick = () => {
        this.props.signAndSubmitGame(
            this.state.ERC20Amount,
            this.state.ERC20Addr,
            this.props.gameID,
            this.props.addressSignedIn,
            this.state.p2Addr,
            this.state.VCAddr,
            this.state.turnLength
        )
    }

    render() {
        return (
            <div>
                <strong>SUGGEST NEW GAME</strong><br />

                <div className="form-group row">
                    <LabelAndInput
                        label="Opponent Address:"
                        value={this.state.p2Addr}
                        onChange={this.handlep2AddrChange}
                        labelWidthClass={"col-sm-3"}
                        textWidthClass={"col-sm-5"}
                        isGreen={this.isAddr(this.state.p2Addr)}
                    />
                    <LabelAndInput
                        label="Turn length in blocks:"
                        value={this.state.turnLength}
                        onChange={this.handleturnLengthChange}
                        labelWidthClass={"col-sm-2"}
                        textWidthClass={"col-sm-2"}
                        isGreen={this.isInt(this.state.turnLength)}
                    />
                </div>
                <div className="form-group row">
                    <LabelAndInput
                        label="Dispute Logic Contract Address:"
                        value={this.state.VCAddr}
                        onChange={this.handleVCAddrChange}
                        labelWidthClass={"col-sm-3"}
                        textWidthClass={"col-sm-9"}
                        isGreen={this.isAddr(this.state.VCAddr)}
                    />
                </div>

                <div className="form-group row">
                    <LabelAndInput
                        label="Address of ERC20 token at stake:"
                        value={this.state.ERC20Addr}
                        onChange={this.handleERC20AddrChange}
                        labelWidthClass={"col-sm-3"}
                        textWidthClass={"col-sm-5"}
                        isGreen={this.isAddr(this.state.ERC20Addr)}
                    />
                    <LabelAndInput
                        label="Num tokens to bet:"
                        value={this.state.ERC20Amount}
                        onChange={this.handleERC20AmountChange}
                        labelWidthClass={"col-sm-2"}
                        textWidthClass={"col-sm-2"}
                        isGreen={this.isInt(this.state.ERC20Amount)}
                    />
                </div>

                {this.allInputsValid() ?
                    <button
                        onClick={this.handleSignAndSubmitClick}
                    >Sign and Submit</button>
                    :
                    <font size="+2">Ensure inputs are valid to propose a new game</font>
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        pubPrivKeypairValid: state.LoginRedux.pubPrivKeypairValid,
        gameID: state.GameData.gameID,
        addressSignedIn: state.LoginRedux.addressSignedIn,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        //    signAndSubmitGame: (dispatch, ERC20Amount, ERC20Addr,gameID,p1Addr,p2Addr,VCAddr,turnLength) => {
        // make new sign and submit in InteractBlockchain
        signAndSubmitGame: (ERC20Amount,ERC20Addr,gameID,addressSignedIn,p2Addr,VCAddr,turnLength) => {
            dispatch(InteractDatabase.signAndSubmitGame(dispatch,ERC20Amount,ERC20Addr,gameID,addressSignedIn,p2Addr,VCAddr,turnLength))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(GameCreate);
