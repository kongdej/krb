require('dotenv').config({path:'./.env'})
//const fs = require('fs')
//const axios = require('axios')
const line = require('@line/bot-sdk');
const pool = require("../../utils/database");
const linemsg = require('./linemsg')

const client = new line.Client({
  channelAccessToken: process.env.RB_TOKEN,
  channelSecret: process.env.RB_SECRERT
});

//const settings = require('./settings')
const hostPDF= process.env.RB_HOST
// == END configuration ==

// function query table with sql and key
const query = async(sql,key) => {
  return new Promise((resolve, reject) => {
    pool.query(sql,key, function(err, result, fields) {
      if (err) throw new Error(err);
      resolve(result);
    });
  });
}

// send Line message
const sendMessages = async(event,results, nbHits, key) => {

  if (results.length > 0) {
    let total = '- พบเอกสารทั้งหมด ' +nbHits + ' ฉบับ -'
    if (nbHits > 50) {
        total += "\n ** แสดงข้อมูลครั้งละ 50 เอกสาร"
        total += "\n ** กรุณาเพิ่มคำค้น '"+key+"' ให้ละเอียดมากกว่านี้"
    }

    results.push({
      "type": "text",
      "text": total,
      "size": "md",
      "flex": 1,
      "wrap": true,
      "gravity": "top",
      "margin": "lg",

      "contents": []
    })

    const messages =  {
      "type": "flex",
      "altText": "คุณระเบียบ - พบ "+ nbHits,
      "contents": {
        "type": "bubble",
        "size": "giga",
        "body": {
          "type": "box",
          "layout": "horizontal",
          "spacing": "md",
          "contents": [
            {
              "type": "box",
              "layout": "vertical",
              "flex": 2,
              "contents": results
            }
          ]
        }
      }
    }
    console.log(event.replyToken, messages)
    return client.replyMessage(event.replyToken, messages);
  }
  else {
    let notfound = {
      "type": "bubble",
      "size": "giga",
      "header": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "text",
            "text": "ค้นหา '" + key + "' ไม่พบ",
            "size": "lg",
            "align": "center",
            "color": "#E5E5E5",
            "margin": "none",
            "weight": "bold",
            "wrap": true
          }
        ],
        "backgroundColor": "#EE3432"
      },
      "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "text",
            "text": "ติดต่อขอข้อมูลเพิ่มได้ที่ อกป.",
            "size": "md",
            "align": "center"
          },
          {
            "type": "box",
            "layout": "horizontal",
            "contents": [
              {
                "type": "button",
                "action": {
                  "type": "uri",
                  "label": "ฝ่ายกำกับการปฏิบัติตามกฎระเบียบ",
                  "uri": "http://lpc.egat.co.th"
                },
                "style": "primary"
              }
            ],
            "margin": "lg"
          }
        ],
        "margin": "none"
      }
    }
    return client.replyMessage(event.replyToken,{
        "type": "flex",
        "altText": "คุณระเบียบ - ไม่พบ",
        "contents": notfound
      }
    );
  }
}

// logging
const insertLog = async(event, keysearch, filters, nResult) => {
  const data  = {
    'userId' : event.source.userId,
    'keysearch': keysearch,
    'category' : filters,
    'result' : nResult
  }
  console.log('Add Logging',data)
  let sql = 'INSERT INTO rb_logs SET ? '
  const key = [data]
  const result = await query(sql, key)

  return result
}

// Main Search
const find = async(event, keysearch, filters) => {
  let results = [];
  //
  let sql  = " select id, path,filename from rb where "
    sql += " filename like '%"+keysearch+"%' "
    sql += " or content like '%"+keysearch+"%' "
    sql += " or keyword like '%"+keysearch+"%' "
    sql += " order by id desc"
  const key = []
  const result = await query(sql,key)

  result.map(row => {
    console.log(row.filename)
    let title = row.filename.replace('.pdf','').replace('.PDF','')
    results.push({
      "type": "text",
      "text": '📋' + title,
      "size": "md",
      "flex": 1,
      "wrap": true,
      "gravity": "top",
      "margin": "lg",
      "action": {
        "type": "uri",
        "uri": "https://liff.line.me/"+process.env.RB_LIFF_READPDF+"?id="+row.id+"&userId="+event.source.userId
        //"uri": "https://liff.line.me/1655904590-kagJeo2g?id="+row.id+"&userId="+event.source.userId
        //"uri": "https://d440d25e8ad4.ngrok.io/rb3_getpdf?id="+row.id+"&userId="+event.source.userId
      },

      "contents": []
    })
  })

  console.log(results.length)
  //insertLog(event, key, filters, results.length)
  let show = results.slice(0,50)
  sendMessages(event, show, results.length , keysearch)
}

// event handler
const handleEvent = async (event) => {
  if (event.type == 'postback' ) {
    console.log('postback',event.postback)
    let cat = event.postback.data.split('&')[0].split('=')[1]
    let search = event.postback.data.split('&')[1].split('=')[1]
    console.log(cat, search)
    find (event, search, cat)
  }

  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  if (event.message.text.includes("ลงทะเบียน")) {
    return Promise.resolve(null);
  }
  if (event.message.text.includes("รอสักครู่..")) {
    return Promise.resolve(null);
  }

  let sql = ` SELECT * FROM rb_users WHERE userId = ? `
  const key = [event.source.userId]
  const result = await query(sql,key)

  if (result.length > 0) {
    console.log('message: ', event.message.text)
    find (event, event.message.text, '')
  }
  else {
    console.log('not found user: ', event.source.userId)
    return client.replyMessage(event.replyToken, {
      "type": "flex",
      "altText": "คุณระเบียบ - ลงทะเบียน",
      "contents": linemsg.register
    })

  }
}

const webhook = (req, res) => {
  return Promise
    .all(req.body.events.map(handleEvent))
    .catch((e) => {
      console.log(e);
    });
};

module.exports = webhook;

/*
find user Logging
SELECT u.empn,v.modified,v.did
FROM rb_views v
LEFT JOIN rb_users u
ON v.userId = u.userId COLLATE utf8mb4_unicode_ci
*/
