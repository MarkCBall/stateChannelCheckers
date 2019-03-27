import React, { Component } from "react";
import { connect } from "react-redux";


//rejig these?
import Board from "./Board";
import GameStats from "./GameStats";



// import PlayersStake from "./GameDetails/PlayersStake";
// import GameSpecs from "./GameDetails/GameSpecs";
import ColorIndicator from "./GameDetails/ColorIndicator";
import TurnExpiry from "./GameDetails/TurnExpiry";
import InitGameSequence from "./GameDetails/InitGameSequence";



class GameInfo extends Component {




   

    isOnChain = () =>{
        return (this.props.latestBCTimestamp > 0)
    }

     render() {
        return (
            <div>
                <div className="container">
                    
                    <div className="row">
                        {this.isOnChain() ?
                            <>
                                <div className="col-sm-2"><ColorIndicator/></div>
                                <div className="col-sm-4"><TurnExpiry/></div>
                            </>
                        :
                            <div className="col-sm-6"><InitGameSequence/></div>
                        }

                            
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
        latestBCTimestamp:state.GameData.latestBCTimestamp,
    }
}
export default connect(mapStateToProps)(GameInfo);
