import React, { Component } from "react";
// import {ethers} from "ethers";
import { BigNumber } from "ethers/utils";
// import { connect } from "react-redux";
// import InteractReduxState from "../redux/actions/InteractReduxState";
// import InteractDatabase from "../redux/actions/InteractDatabase";
// import InteractBlockchain from "../redux/actions/InteractBlockchain";
// import {isValidAddress} from "ethereumjs-util";


//mport { Button } from 'react-bootstrap';

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            piecesBN: new BigNumber("0x808182838485868788898a8b8c8d8e8fb0b1b2b3b4b5b6b7b8b9babbbcbdbebf"), //64 digits long
         // piecesBN: new BigNumber("0x808182838485868788898a8b8c8e8f0000000000000000000000000000000000"), //64 digits long
            // piecesArr: {1,2,3}
        }



    }

    piecesBNtopiecesArr = () => {
        
        //let piecesArr = []
        let boardArr = []
        for (let row =0;row<8;row++){
            boardArr.push([{},{},{},{},{},{},{},{}])
        }

        //boardArr[1][1] = "s"

        //console.log(boardArr)
        let str = this.state.piecesBN.toHexString()
        for (let i=1;i<33;i++){
            let pieceHex = str.substr(i*2,2)
            let pieceBinary =  (parseInt(pieceHex, 16)).toString(2).padStart(8,"0")
            
            let col = parseInt(pieceBinary.substr(5,3),2)
            let row = parseInt(pieceBinary.substr(2,3),2)
            // let pieceObj = {
            //     id: i-1,
            //     red: (i<17),
            //     active: (pieceBinary.charAt(0) === "1"),
            //     queen: (pieceBinary.charAt(1) === "1"),
            //     row: row,
            //     col: col
            // }
            if (pieceBinary.charAt(0) === "1"){
                boardArr[row][col] = {
                    id: i-1,
                    red: (i<17),
                    active: (pieceBinary.charAt(0) === "1"),
                    queen: (pieceBinary.charAt(1) === "1"),
                }
            }
            

            //piecesArr.push(pieceObj)
        }
        console.log(boardArr[0])
        //console.log(piecesArr)

        return (boardArr)
                   
        //this.renderRow(boardArr[0])

    }

    renderRow = (arr) =>{

        // return <>XXXXXXXXXXXXXXXXXXXXXXXXX</>
        console.log(arr[0])
        arr[0].forEach(element => {
            console.log(element)
            // if (element.active){
            //     if (element.red){
            //         return <>red</>
            //     }
            //     else{
            //         return <>black</>
            //     }
            // }
            return <>xxxxxx</>
            //console.log(element)
        });
    }

    // componentDidMount(){
    //     this.props.updateChButtons(this.props.address);
    // }

    renderPiece = (ele) => {
        if (ele.active)
            if (ele.red){
                if (ele.queen){
                    return <>R</>
                }
                else{
                    return <>r</>
                }
            }else{
                if (ele.queen){
                    return <>B</>
                }
                else{
                    return <>b</>
                }
            }
        return <>{"-"}</>
    }


    render() {
        return (
            <div>
                
                <button onClick={this.piecesBNtopiecesArr}>consolelogboard</button>
                <br/>
            
                {this.piecesBNtopiecesArr().map((row,rowIndex) =>
                    <div key={rowIndex}>
                   
                        {row.map((piece,colIndex) =>
                            <span key={colIndex}>
                                {this.renderPiece(piece)}
                            </span>
                        )}
                    </div>
                )}
     

                

                
            </div>
        )
    }
                
}


// function mapStateToProps(state) {
//     return {
//         privKey : state.InteractReduxState.privKey,
//         pubPrivKeypairValid : state.InteractReduxState.pubPrivKeypairValid,
//         address: state.InteractReduxState.addressSignedIn,
//         addressIsValid: state.InteractReduxState.addressIsValid,
//         //pendingChannels: state.InteractDatabase.PendingChannels
//     }
// }

// function mapDispatchToProps(dispatch) {
//     return {
//         // updateChButtons: (addressSignedIn) => {
//         //     dispatch(InteractReduxState.renderChButtons(dispatch, addressSignedIn))
//         // },
//         handleAddressChange: (Event) => {
//             dispatch(InteractReduxState.handleAddressChange(dispatch, Event.target.value))  
//         },
//         handlePrivKeyChange: (Event) => {
//             dispatch(InteractReduxState.handlePrivKeyChange(dispatch, Event.target.value))
//         }

//     }
// }
// export default connect(mapStateToProps, mapDispatchToProps)(Login);




export default Board;
