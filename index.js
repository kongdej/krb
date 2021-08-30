const express = require("express");
require('dotenv').config({path:'./.env'})
const path = require('path')
const serveStatic = require('serve-static')
const line = require('@line/bot-sdk')
const bodyParser = require("body-parser");
const cors = require('cors')
const app = express()


var allowedOrigins = ['http://localhost:8080',
                      'https://lineapi.egat.co.th',
                      'https://a6d1-124-122-94-197.ngrok.io'
                    ]
app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

app.set('view engine','ejs')

// Static Server
app.use('/',serveStatic(__dirname + '/public'))
app.use('/liff_rb_admin',serveStatic(__dirname + '/handler/rb/liff/admin/dist/spa'))

app.get('/', (req, res) => {
  res.send(process.env.CONTACT);
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
const rb_getpdf  = require('./handler/rb/getpdf');
app.get('/rb_getpdf', rb_getpdf);

const rb_action  = require('./handler/rb/action');
app.post('/rb_action', rb_action);

// EJS template
app.get('/rb_readpdf' , (req,res) => {
  const data = {
    webhook : process.env.RB_HOST,
    liffId : process.env.RB_LIFF_READPDF,
    id: req.query.id
  }
  res.render('rb/read', { data })
})

app.get('/rb_register' , (req,res) => {
  console.log('rb-regiser')
  const data = {
    webhook : process.env.RB_HOST,
    liffId : process.env.RB_LIFF_REGISTER,
  }
  res.render('rb/register', { data })  // /views/rb/register.ejs
})
//-------------------------------------------------

//=== app started ===============
// production server or local
if (process.env.NODE_ENV == "prod") {
  const fs = require('fs')
  const https = require('https');
  const https_options = {
    key: fs.readFileSync(path.join(__dirname,process.env.SSL_KEY)),
    cert: fs.readFileSync(path.join(__dirname,process.env.SSL_CRT)),
    ca: fs.readFileSync(path.join(__dirname,process.env.SSL_ROOT))
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
