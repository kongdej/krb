const express = require("express");
require('dotenv').config({path:'./.env'})
const path = require('path')
const serveStatic = require('serve-static')
const line = require('@line/bot-sdk')
const bodyParser = require("body-parser");

app = express()
app.set('view engine','ejs')

// Line liff vue+quasar
app.use('/liff/rb',serveStatic(__dirname + '/handler/rb/liff/admin/dist/spa'))

app.get('/', (req, res) => {
  res.send("ผู้รับผิดชอบข้อมูล: นายจงดี ตันจะโร (jongdee.t@egat.co.th)");
})

// Line BOT: คุณระเบียบ
const rb_handler = require('./handler/rb');
app.post('/rb', line.middleware({
  channelAccessToken: process.env.RB_TOKEN,
  channelSecret: process.env.RB_SECRERT
}), rb_handler);

// ***************************************************
app.use(bodyParser.json())//<-- after line.middleware
// ***************************************************

//--RB --------------------------------------------
/*
app.get('/rb3_readpdf' , (req,res) => {
  const data = {
    webhook : process.env.WEBHOOK,
    liffId : process.env.LIFF_RB_READPDF,
    id: req.query.id
  }
  res.render('rb3/read', { data })
})

const rb3_getpdf  = require('./handler/rb3/getpdf');
app.get('/rb3_getpdf', rb3_getpdf);
*/
const rb_action  = require('./handler/rb/action');
app.post('/rb_action', rb_action);

app.get('/rb_register' , (req,res) => {
  console.log('rb-regiser')
  const data = {
    webhook : process.env.RB_HOST,
    liffId : process.env.RB_LIFF_REGISTER,
  }
  res.render('rb/register', { data })
})


//=== app started ===============
// production server or local
if (process.env.NODE_ENV == "prod") {
  const fs = require('fs')
  const https = require('https');
  const https_options = {
    key: fs.readFileSync(path.join(__dirname,'egat_wildcard2018_PKCS8.key')),
    cert: fs.readFileSync(path.join(__dirname,'egat_wildcard2018.crt')),
    ca: fs.readFileSync(path.join(__dirname,'root-intermediate.crt'))
  };
  const server = https.createServer( https_options , app );

  server.listen( 443, function () {
    console.log( 'Hello IREALLYHOST listening on port ' + server.address().port );
  });
}
else {
  console.log('Webhook started at port ' + process.env.PORT)
  app.listen(process.env.PORT || 4000);
}
