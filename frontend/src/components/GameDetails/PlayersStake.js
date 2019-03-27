import React, { Component } from "react";
import { connect } from "react-redux";
import InteractBlockchain from "../../redux/actions/InteractBlockchain";


class PlayerStake extends Component {

    componentDidMount = () =>{
        //is also periodically called from InitGameSequence component
        //can we track BCtimestamp for change and updateapprovals according to BCtimestamp?
        this.props.updateApprovals()
    }

    render() {
        return (
            <div>
                player1:{this.props.p1Addr}<br/>
                player2:{this.props.p2Addr}<br/>
                ApprovedStake=> p1:{this.props.p1ApprovedAmnt} &nbsp;&nbsp; p2:{this.props.p2ApprovedAmnt}
                           
            </div>
        )
    }            
}

function mapStateToProps(state) {
    return {
        p1Addr:state.GameData.p1Addr,
        p2Addr:state.GameData.p2Addr,
        p1ApprovedAmnt:state.InteractBlockchain.p1ApprovedAmnt,
        p2ApprovedAmnt:state.InteractBlockchain.p2ApprovedAmnt,
        p1ApprovedEnough:state.InteractBlockchain.p1ApprovedEnough,
        p2ApprovedEnough:state.InteractBlockchain.p2ApprovedEnough,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateApprovals: () => {
            dispatch(InteractBlockchain.updateApprovals())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PlayerStake);
