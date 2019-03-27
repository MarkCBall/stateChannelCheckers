import React, { Component } from "react";
import { connect } from "react-redux";
import Board from "./Board";
import GameStats from "./GameStats";
import InteractBlockchain from "../redux/actions/InteractBlockchain";


class GameInfo extends Component {

    renderTurnInfo = () =>{
        //need to force update?
        if (this.props.blockNum<100000000000000000000000000000){
            return <> You must submit a move before block# {this.props.blockNum+this.props.blocksPerTurn}<br/>
            You have {this.props.blockNum+this.props.blocksPerTurn-this.props.getCurrentBlockNum} blocks to make a move
            </>
        }
    }
    renderPlayerColor =  () => {
        if (this.props.iAmP1Red){
            return <><div className="red"></div>Player 1</>
        }
        if (this.props.iAmP2Black){
            return <><div className="black"></div>Player 2</>
        }
        return <><div className="valid"></div>Observer</>
    }

    startingSequence = () =>{
        if (!this.isOnChain()){
            // return <>ahhhhhhhhhh</>
            if (this.props.iAmP1Red){
                return <>Awaiting counterparty to initiate game</>
            }else if (this.props.iAmP2Black){
                return <button onClick={this.props.initGame}>Init Game on BC</button>
            }else{
                return <>Game not started</>
            }
        }
    }

    isOnChain = () =>{
        return (this.props.latestBCTimestamp > 0)
    }

     render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                        {/* PlayersStake */}
                            player1:{this.props.p1Addr}<br/>
                            player2:{this.props.p2Addr}<br/>
                                p1 and p2 staked coin amnt here
                            
                            
                        </div>
                        <div className="col-md-6">
                            {/* GameSpecs */}

                            VCAddr:{this.props.VCAddr}<br/>
                            ERC20Addr:{this.props.ERC20Addr}<br/>
                            #token buy-in:{this.props.ERC20Amount}
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            turn length:{this.props.turnLength} blocks
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-2">
                            {/* WhatColorAmI */}
                            {this.renderPlayerColor()}
                        </div>
                        <div className="col-sm-4">
                            {/* TurnExpiry */}
                            Turn#: {parseInt(this.props.turnNum)+1}<br/>
                            {this.renderTurnInfo()}
                        </div>
                        <div className="col-sm-4">
                            {/* InitGameSequence */}
                            {this.startingSequence()}
                        </div>
                    </div>
                </div>
               
                <hr/>
                {this.isOnChain() &&
                    <div className="container">
                        <div className="row">
                        <Board />
                        <GameStats />
                        </div>
                    </div>
                }
                    
             
                
                
            </div>
        )
    }            
}
function mapStateToProps(state) {
    return {
        iAmP1Red:state.GameData.iAmP1Red,
        iAmP2Black:state.GameData.iAmP2Black,
        latestBCTimestamp:state.GameData.latestBCTimestamp,
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
function mapDispatchToProps(dispatch) {
    return {
        initGame: () => {
            dispatch(InteractBlockchain.initGame())
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(GameInfo);
