require('dotenv').config({path:'./.env'})
const pool = require("../../utils/database");
//const dateFormat = require('dateformat');
//const express = require("express");
//const bodyParser = require("body-parser");
//const cors = require("cors");
const fs = require('fs')
//const settings = require('./settings')

// function query table with sql and key
const query = async(sql,key) => {
  return new Promise((resolve, reject) => {
    pool.query(sql,key, function(err, result, fields) {
      if (err) throw new Error(err);
      resolve(result);
    });
  });
}

// logging
const insertView = async(userId, id) => {
  const data  = {
    'userId' : userId,
    'did': id
  }
  console.log('Add Views ',data)
  let sql = 'INSERT INTO rb_views SET ? '
  const key = [data]
  const result = await query(sql, key)

  return result
}

/// Main //////////=========================================
const handleAction = async (req, res) => {
  const {id , userId} = req.query
  console.log(id, userId, req.query)
  //const { id, userId} = req.params
  let sql = ` SELECT * FROM rb_users WHERE userId = ? `
  let key = [userId]
  let result = await query(sql,key)
  console.log(id, userId, result)
  if (result.length == 0) {
      res.status(200).json({ result:'notAuthorized' });
  }

  sql = ` SELECT path,filename FROM rb WHERE id = ? `
  key = [id]
  result = await query(sql,key)
  console.log(sql,id,result)
  if (result.length > 0) {
      insertView(userId, id)
      const {path, filename} = result[0]
      let filePath =  process.env.RB_DOCPATH + path + "/"+ filename;
      console.log('filePath:',filePath)
      if (fs.existsSync(filePath)) {
        fs.readFile(filePath , function (err,data){
          res.contentType("application/pdf");
          res.send(data);
        });
      }
      else {
        console.log(filePath,'file. not found')
        res.send("Not found document!!");
      }
  }
  else {
    res.status(200).json({ result: 'notFound' });
  }
}

module.exports = handleAction
