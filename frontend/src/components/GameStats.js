import React, { Component } from "react";
// import BoardRedux from "../redux/actions/BoardRedux";
// import InteractDatabase from "../redux/actions/InteractDatabase";
import { connect } from "react-redux";

// import BoardTranslations from "../Library/BoardTranslations"
// import { BigNumber } from "ethers/utils";

class GameStats extends Component {


  

     render() {
        return (
            <div>
                <button onClick={()=>1}>
                    Sign move and send to Database
                </button>
                <br/><button onClick={()=>1}>
                    Enforce move on blockchain
                </button>
                <button onClick={()=>1}>
                    Post to blockchain
                <br/></button>
                <br/>Toggle enforced/unenforced to be added

                <br/><br/><button onClick={()=>{this.props.getLatestMove()}}>Refresh - Get Data</button>

            </div>
        )
    }            
}

function mapStateToProps(state) {
    return {
        // readyToPost:
        // lastMoveIsTimed:blocknum < 1000..


    }
}

function mapDispatchToProps(dispatch) {
    return {
        // calcBoardMatrix: (boardBN) =>{
        //     dispatch(BoardRedux.calcBoardMatrix(dispatch, boardBN))
        // },
        

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(GameStats);

