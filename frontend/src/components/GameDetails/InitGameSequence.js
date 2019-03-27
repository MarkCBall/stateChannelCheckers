import React, { Component } from "react";
import { connect } from "react-redux";
import InteractBlockchain from "../../redux/actions/InteractBlockchain";


class InitGameSequence extends Component {
    constructor(props) {
        super(props);
        this.WindowInterval = 0;
    }
    
    //does state have an on-update trigger?
    //better to link this to BCtimestamp directly?
    componentDidMount = () =>{
        this.WindowInterval = window.setInterval(this.periodiclyDo, 10000);  
    }
    componentWillUnmount = () =>{
        window.clearInterval(this.WindowInterval)
    }
    periodiclyDo = () => {
        this.props.updateApprovals()
        // console.log("check ERC20 balances")
    } 

    startingSequence = () =>{
        if (this.props.iAmP1Red){
            return <><br/>Awaiting counterparty to initiate game</>
        }else if (this.props.iAmP2Black){
            return <><br/><button onClick={this.props.initGame}>Init Game on BC</button></>
        }else{
            return <><br/>Game not started</>
        }
    }
    render() {
        return (
            <div>
                {this.startingSequence()}    
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
