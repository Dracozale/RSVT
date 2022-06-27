process.env.NODE_ENV = 'Configuration';
const _ = require('lodash');
const config = require('./config/config.js');
const express = require('express');
const io = require('socket.io-client');
const mssql = require('mssql')
const asyncHandler = require('express-async-handler')
const router = express.Router();
module.exports = router;

  const db_pool = new mssql.ConnectionPool(global.gConfig.sqlConfig);
  const db_con = db_pool.connect();

router.get('/:userID', asyncHandler(async(req, res,next) => {
    var info = {
        "restart": {
            "servicename": req.params.servicename,
            "ipaddress": req.params.ipaddress,
            "userID": req.params.userID,
        }
    };
      try{
          //console.log('****** '+obj.courier_id)
          await db_con;
          var auth = 0;
          var sqlC="Select * from [dbo].[Tbl_UserRequest] Where [UserID] = '" + info.restart.userID + "' and [Availability] = '1'";
          const db_req = db_pool.request();
          const queryresult = await db_req.query(sqlC);
          console.log("******query result********")
          console.log(sqlC)
          console.log(queryresult)
          console.log("**************************")
            if (queryresult.recordsets[0].length > 0)
            { var auth = 1;}
            res.status(200).json({
                message: auth
            });
            }catch (e){
                    console.log(e);
                }
                
        })
        
);


// if (queryresult){
//     res.status(200).json({
//         message: queryresult
//     });
//     const sockets = io.connect('http://localhost:5000');
//     sockets.on('connect', function () { 
//     //sockets.emit('message', info);
// });
// } else {
//     res.status(500).json({
//         message: "user dont have access to Restart service"
//     });
// }

// router.get('/:servicename/:ipaddress/:userID', (req, res,next) => {
//     var info = {
//         "restart": {
//             "servicename": req.params.servicename,
//             "ipaddress": req.params.ipaddress,
//             "userID": req.params.userID,
//         }
//     };
//     (async function (){
//         try{
//             await DBpoolConnect;
//             //console.log('****** '+obj.courier_id)
//             var sqlC="Select * from [dbo].[Tbl_UserRequest] Where [UserID] = '" + info.restart.userID + "' and [Availability] = '1'";
//             const queryresult = await DB_pool.query(sqlC)
//             console.log("******query result********")
//             console.log(sqlC)
//             console.log(queryresult)
//             console.log("**************************")
//             if (queryresult){
//               res.status(200).json({
//                   message: queryresult
//               });
//               const sockets = io.connect('http://localhost:5000');
//               sockets.on('connect', function () { 
//               //sockets.emit('message', info);
//             });
//           } else {
//               res.status(500).json({
//                   message: "user dont have access to Restart service"
//               });
//           }
//             }catch (e){
//               console.log(e);
//             }
//     })
// });