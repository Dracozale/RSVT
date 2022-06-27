process.env.NODE_ENV = 'Configuration';
const _ = require('lodash');
const config = require('./config/config.js');
const express = require('express');
const io = require('socket.io-client');
const router = express.Router();
module.exports = router;

var app = express();
router.get('/:servicename/:ipaddress/:userID/:message', (req, res,next) => {
    const servicename = req.params.servicename;
    const ipaddress = req.params.ipaddress;
    const userID =  req.params.userID;
    const message = req.params.message;
      try{
        //console.log(global.gConfig.SocketServer + global.gConfig.SocketServerport);
        const sockets = io.connect(global.gConfig.SocketServer + global.gConfig.SocketServerport);
        sockets.on('connect', async function () { 
        console.log("socketid from api:" + sockets.id)
         var info = {
            "restart": {
                "socketid": sockets.id,
                "servicename": servicename,
                "ipaddress": ipaddress,
                "userID": userID,
                "message": message
            }
          };
        await sockets.emit('message', info);
        });
      }catch (e){
        console.log(e);
      }		
  
});
