var express = require('express');
var router = express.Router();


// (async ()=>{
//     db.close(db)
// })()
//level.repair('./db')


var level = require('level')

var db = level('./db', {valueEncoding: 'json'})



router.post('/New', async function(req, res, next) {
    //EXAMPLE 
    // header = {gameID:3}
    // req.body={ 
    //     ERC20Amount: 10000,
    //     ERC20Addr: '0x9e64aa3c10d0e6f14c384b0e5d72fa1a77ca3f79',
    //     p1Addr: '0x04d05a4923af4569792cffa8024061a0340a3923',
    //     p2Addr: '0x074349cbaa42a33749589695b0c2ed6d933d2323',
    //     VCAddr: '0x6d3346c4832fa3c6c4e52d1fcd4f91c5ff773fb8',
    //     turnLength: 100,
    //     r: '0x4c9ae3d397469ec1503415c58c1ea6feb726c0b43723d010faca574fe25385bb',
    //     s: '0x4c01e5b4c8850b70fd3ac2118fe4140afc2697591d8a6aecb2dd33f1a57f5621',
    //     recoveryParam: 1,
    //     v: 28 }
    
    //require addr1!= addr2
    //require the entry doesn't exist on the BC
    //require the sig is valid
    db.put(req.headers.gameid,req.body)
    //error handling?

    // console.log("post got")
    // console.log(req.headers.gameid)
    // console.log(req.body)

    res.send();
})

router.post('/Move', async function(req, res, next) {
    //EXAMPLE 
    // header = {gameID:3}
    // req.body={ 
    //     boardBN: "0x0c0000000000000180828486898b8d8f9092949fa9abadafb0b2b4b6b9bbbdbf",
    //     moveSig{v:, r:, s:}
    // }   
    //require sig is good
    //require db.get nonce <

    addDataFunc = () => {

    }

    console.log("xx")
    let oldData
    db.get(req.headers.gameid)
    .then(oldData => {
        console.log("old stuff is ", oldData)
        let newData = {
            ...oldData,
            boardBN:req.body.boardBN,
            moveSig:req.body.moveSig
        }
        console.log("turning into ", newData)
        db.put(req.headers.gameid,newData)

    })
    .catch(() => {
        console.log("creating move on uninitiated game")
        db.put(req.headers.gameid,req.body)
    })
    
    
    // 


    res.send();
})



router.get('/', async function(req, res, next) {
    //EXAMPLE 
    // header = {gameID:3}
    db.get(req.headers.gameid)
    .then((dbres) => {
        console.log("sending ",dbres)
        res.send(dbres)
    })
    .catch((err) => {
        res.send({});
        // console.log(err)
    })
    //good error handling?
})




// router.get('/', async function(req, res, next) {
//     //EXAMPLE req.body 
//     //{cid:1}
//     var CID = req.headers.cid
//     db.get(CID)
//     .then((dbres) => res.send(dbres))
//     .catch((err) => {
//         res.send({});
//         console.log(err)




    // var CID = req.body.CID

    // delete req.body.CID//alternatively put CID in the header - better solution..

    // var address1 = req.body.u1Address;
    // var address2 = req.body.u2Address;


    // //both existingPendingsChannels and existingRequestedChannels can be run in parrallel for better efficiency
    // var existingPendingsChannels;
    // await db.get("pending"+address1)
    // .then((res)=> {existingPendingsChannels = res;})
    // .catch(() => {existingPendingsChannels = {};})
    
    // var existingRequestedChannels;
    // await db.get("requested"+address2)
    // .then((res)=> {existingRequestedChannels = res;})
    // .catch((err) => {existingRequestedChannels = {};})

    // console.log("existingPendingsChannels is, ", existingPendingsChannels)
    // console.log("existingRequestedChannels is, ", existingRequestedChannels)

    // //INCLUDE A GET so 
    // db.put("pending"+address1,{...existingPendingsChannels,[CID]:CID})
    // //.then(console.log("\n\npending success"))
    // .catch((err) => console.log("\n\npending failed",err))
    // db.put("requested"+address2,{...existingRequestedChannels,[CID]:CID})
    // //.then(console.log("\n\nrequested success"))
    // .catch((err) => console.log("\n\nrequested failed",err))
    //     
    // //verify CID doesn't exist yet
    // //verify that sig1 correlates to all given channel info

    // //create a new entry at CID
    // db.put(CID,req.body)
    // //.then(console.log("\n\n CIDput success"))
    // .catch((err) => console.log("\n\n CIDput failed",err))


// });





// router.get('/', async function(req, res, next) {
//     //EXAMPLE req.body 
//     //{cid:1}
//     var CID = req.headers.cid
//     db.get(CID)
//     .then((dbres) => res.send(dbres))
//     .catch((err) => {
//         res.send({});
//         console.log(err)
//     })
// });

// //router.delete('/', function(req, res, next) {
// //complete this later









// router.get('/pending', async function(req, res, next) {
//     db.get("pending"+req.headers.address)
//     .then((CIDs) => { res.send(JSON.stringify(CIDs))}   )
//     .catch((error) => res.send(JSON.stringify({}))  )
// });

// router.get('/requested', async function(req, res, next) {
//     db.get("requested"+req.headers.address)
//     .then((CIDs) => { res.send(JSON.stringify(CIDs))}   )
//     .catch((error) => res.send(JSON.stringify({}))  )
// });


module.exports = router;






