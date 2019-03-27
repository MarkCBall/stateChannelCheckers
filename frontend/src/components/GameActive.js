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
                            player1:{this.props.p1Addr}<br/>
                            player2:{this.props.p2Addr}<br/>
                            turn length:{this.props.turnLength} blocks
                            
                        </div>
                        <div className="column">
                            VCAddr:{this.props.VCAddr}<br/>
                            ERC20Addr:{this.props.ERC20Addr}<br/>
                            Winner's ERC20Amount:{this.props.ERC20Amount}
                        </div>
                    </div>
                    
                    
                    Turn#: {parseInt(this.props.turnNum)+1}<br/>
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
        iAmP1Red:state.GameData.iAmP1Red,
        iAmP2Black:state.GameData.iAmP2Black,
        getCurrentBlockNum:500,//THIS IS A PLACEHOLDER ONLY
        p1Addr:state.GameData.p1Addr,
        p2Addr:state.GameData.p2Addr,
        ERC20Amount:state.GameData.ERC20Amount,
        turnNum: state.GameData.turnNum,
        blockNum:state.GameData.blockNum,
        VCAddr:state.GameData.VCAddr,
        ERC20Addr:state.GameData.ERC20Addr,
        turnLength:state.GameData.turnLength,
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
