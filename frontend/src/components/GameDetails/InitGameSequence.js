import React, { Component } from "react";
import { connect } from "react-redux";
import InteractBlockchain from "../../redux/actions/InteractBlockchain";


class InitGameSequence extends Component {
    constructor(props) {
        super(props);
        this.state =
        {
            WindowInterval: 0,
            allowanceAmnt: 0
        }
        
    }
    
    componentDidMount = () =>{
        this.props.updateApprovals()
        this.state.WindowInterval = window.setInterval(this.props.updateApprovals, 10000);  
    }
    componentWillUnmount = () =>{
        window.clearInterval(this.state.WindowInterval)
    }


    tokensAllowed = (given, required, owned) => {
        if (given>required){
            return <> has allowed {given} tokens which is {given-required} in excess. They own {owned} tokens. </>
        }
        if (required>given){
            return <>has allowed {given} tokens and <strong> needs to allow {required-given} more</strong> They own {owned} tokens.</>
        }
        return <>has allowed {given} tokens as required. They own {owned} tokens.</>
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
            return this.increaseAllowanceBtn()
        }
        return <>Awaiting more funding before the game can start</>
    }

    handleAllowanceAmntChange = (event) =>{
        let allowanceAmnt = event.target.value
        if ((allowanceAmnt) === "" || parseInt(allowanceAmnt, 10) === Number(allowanceAmnt)) {
            this.setState({
                ...this.state,
                allowanceAmnt: allowanceAmnt
            })
        }
    }



    
    increaseAllowanceBtn = () => {
        return <>
            <button 
                onClick={()=>this.props.ERC20Approve(this.state.allowanceAmnt)}
            >
                Modify your allowance
            </button>
            <input
                type="text"
                onChange={this.handleAllowanceAmntChange}
                value={this.state.allowanceAmnt}
            />
            </>
    }



    render() {
        return (
            <div>
                P1{this.tokensAllowed(this.props.p1ApprovedAmnt,this.props.ERC20Amount,this.props.p1Bal)}<br/>
                P2{this.tokensAllowed(this.props.p2ApprovedAmnt,this.props.ERC20Amount,this.props.p2Bal)}<br/>
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
        p1Bal:state.InteractBlockchain.p1Bal,
        p2Bal:state.InteractBlockchain.p2Bal,
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
        },
        ERC20Approve: (allowanceAmnt) => {
            dispatch(InteractBlockchain.ERC20Approve(allowanceAmnt))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(InitGameSequence);
