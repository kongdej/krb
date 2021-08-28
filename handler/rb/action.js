const pool = require("../../utils/database");
//const dateFormat = require('dateformat');
//const express = require("express");
//const bodyParser = require("body-parser");
//const cors = require("cors");
//const jwt = require("jsonwebtoken");
//const EWS = require("node-ews");

// function query table with sql and key
const query = async(sql,key) => {
  return new Promise((resolve, reject) => {
    pool.query(sql,key, function(err, result, fields) {
      if (err) throw new Error(err);
      resolve(result);
    });
  });
}

const insertUsers = async(empn,userId) => {
  let sql = 'REPLACE INTO rb_users SET ? '
  const key = [{ empn, userId}]
  const result = await query(sql,key)
  return result
}

const findDoc = async(keysearch) => {
  let sql  = " select id, path,filename from rb where "
    sql += " filename like '%"+keysearch+"%' "
    sql += " or content like '%"+keysearch+"%' "
    sql += " or keyword like '%"+keysearch+"%' "
    sql += " order by id desc"

  return await query(sql,[])
}

const findDocDetail = async(id) => {
  let sql  = " select * from rb where id = ?"

  return await query(sql,[id])
}

const updateDoc = async(data) => {
  let sql  = " update rb set keyword = ? where id = ?"

  return await query(sql,[data.keyword, data.id])
}

/// Main //////////=========================================
const handleAction = async (req, res) => {
  const body = req.body;
  console.log(body)

  if (body.action  == 'register') {
      //console.log(req.body);
      // autorized EGAT account
      const ewsConfig = {
        username: req.body.username,
        password: req.body.password,
        host: "https://mail.egat.co.th"
      };
      const ewsArgs = {
        Mailbox: {
          Address: req.body.username + "@egat.co.th"
        }
      };
      const ewsFunction = "GetUserOofSettings";
      const ews = new EWS(ewsConfig);
      ews
        .run(ewsFunction, ewsArgs)
        .then(result => {
          console.log(JSON.stringify(result));
          console.log("--> correct account");
          insertUsers(req.body.username,req.body.userId)
          res.status(200).json({ result:true });
        })
        .catch(err => {
          console.log("--> incorrect account"); // err.stack
          res.status(200).json({ result:false });
        });
  }
  else if (body.action == 'search') {
    console.log('seach: ', body.keysearch)
    const results = await findDoc(body.keysearch)
    console.log(results)
    res.status(200).json({ results });
  }
  else if (body.action == 'search_detail') {
    console.log('seach: ', body.id)
    const results = await findDocDetail(body.id)
    console.log(results)
    res.status(200).json({ results });
  }
  else if (body.action == 'update_keyword') {
    console.log('update keyword: ', body.id)
    const results = await updateDoc(body)
    console.log(results)
    res.status(200).json({ results });
  }
}

module.exports = handleAction
