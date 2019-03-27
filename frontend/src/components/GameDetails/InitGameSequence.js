import React, { Component } from "react";
import { connect } from "react-redux";
import InteractBlockchain from "../../redux/actions/InteractBlockchain";


class InitGameSequence extends Component {
    constructor(props) {
        super(props);
        this.WindowInterval = 0;
    }
    
    componentDidMount = () =>{
        this.props.updateApprovals()
        this.WindowInterval = window.setInterval(this.props.updateApprovals, 10000);  
    }
    componentWillUnmount = () =>{
        window.clearInterval(this.WindowInterval)
    }


    tokensAllowed = (given, required) => {
        if (given>required){
            return <> has allowed {given} tokens which is {given-required} in excess </>
        }
        if (required>given){
            return <>has allowed {given} tokens and <strong> needs to allow {required-given} more</strong></>
        }
        return <>has allowed {given} tokens as required</>
    }


    startingSequence = () =>{
        if (this.props.iAmP1Red){
            return <><br/>Awaiting counterparty to initiate game</>
        }else if (this.props.iAmP2Black){
            return <><br/><button onClick={this.props.initGame}>Init Game on BC</button></>
        }else{
            return <><br/>Game not started for you to watch</>
        }
    }
    contributeERC20 = () => {
        if ( 
            (this.props.iAmP1Red && (this.props.p1ApprovedAmnt < this.props.ERC20Amount))
             ||
            (this.props.iAmP2Black && (this.props.p2ApprovedAmnt < this.props.ERC20Amount))
        ){
            return <button onClick="">Increase allowance byWith amount selector ect</button>
        }
        return <>Awaiting more funding before the game can start</>
    }


    render() {
        return (
            <div>
                P1{this.tokensAllowed(this.props.p1ApprovedAmnt,this.props.ERC20Amount)}<br/>
                P2{this.tokensAllowed(this.props.p2ApprovedAmnt,this.props.ERC20Amount)}<br/>
                {this.props.enoughAllowances ? 
                    this.startingSequence()
                :
                    this.contributeERC20()
                }

                 
            </div>
        )
    }            
}

function mapStateToProps(state) {
    return {
        iAmP1Red:state.GameData.iAmP1Red,
        iAmP2Black:state.GameData.iAmP2Black,
        enoughAllowances:state.InteractBlockchain.enoughAllowances,
        p1ApprovedAmnt:state.InteractBlockchain.p1ApprovedAmnt,
        p2ApprovedAmnt:state.InteractBlockchain.p2ApprovedAmnt,
        ERC20Amount:state.GameData.ERC20Amount
    }
}
function mapDispatchToProps(dispatch) {
    return {
        initGame: () => {
            dispatch(InteractBlockchain.initGame())
        },
        updateApprovals: () => {
            dispatch(InteractBlockchain.updateApprovals())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(InitGameSequence);
