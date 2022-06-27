//create by afiq naqiuudin
process.env.NODE_ENV = 'Configuration';
const _ = require('lodash');
const config = require('./config/config.js');
var express = require('express');
var app = express();
const mssql = require('mssql')

const Mtrack_pool = new mssql.ConnectionPool(global.gConfig.sqlConfig);


const MtrackpoolConnect = Mtrack_pool.connect();


async function main(){
    (async function () {
    await MtrackpoolConnect;
      try{
          //console.log('****** '+obj.courier_id)
          var sqlC="SELECT * FROM [dbo].[Tbl_UserRequest]";
          const queryresult = await Mtrack_pool.query(sqlC)
          console.log("******Database Connected!! Query Result****")
          console.log(queryresult)
          console.log("**************************")

      }catch (e){
        console.log(e);
      }		
    })()

    mssql.on('error', err => {
    console.log(err);
    })
}

main();

 
        
