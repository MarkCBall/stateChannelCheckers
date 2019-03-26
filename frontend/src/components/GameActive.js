import React, { Component } from "react";
import { connect } from "react-redux";
import Board from "./Board";
import GameStats from "./GameStats";


class GameInfo extends Component {

    renderTurnInfo = () =>{
        //need to force update?
        if (this.props.blockNum<100000000000000000000000000000){
            return <> You must submit a move before block# {this.props.blockNum+this.props.blocksPerTurn}<br/>
            You have {this.props.blockNum+this.props.blocksPerTurn-this.props.getCurrentBlockNum} blocks to make a move
            </>
        }
    }

     render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="column">
                            player1:{this.props.addr1}<br/>
                            player2:{this.props.addr2}<br/>
                            turn length:{this.props.blocksPerTurn} blocks
                            
                        </div>
                        <div className="column">
                            VCAddr:{this.props.VCAddr}<br/>
                            ERC20Addr:{this.props.ERC20Addr}<br/>
                            Winner's Payout:{this.props.payout}
                        </div>
                    </div>
                    
                    
                    Turn#: {this.props.turnNum}<br/>
                    {this.renderTurnInfo()}
                
                </div>
               
                <hr/>

                <div className="container">
                        <div className="row">
                            <Board />
                            <GameStats />
                        </div>
                </div>
                
            </div>
        )
    }            
}
function mapStateToProps(state) {
    return {
        getCurrentBlockNum:500,//THIS IS A PLACEHOLDER ONLY
        addr1:state.GameData.addr1,
        addr2:state.GameData.addr2,
        payout:state.GameData.payout,
        turnNum: state.GameData.turnNum,
        blockNum:state.GameData.blockNum,
        VCAddr:state.GameData.VCAddr,
        ERC20Addr:state.GameData.ERC20Addr,
        blocksPerTurn:state.GameData.blocksPerTurn,
    }
}
// function mapDispatchToProps(dispatch) {
//     return {
//         signAndSubmitGame: () => {
//             dispatch(InteractBlockchain.signAndSubmitGame())
//         },
//     }
// }
export default connect(mapStateToProps)(GameInfo);
