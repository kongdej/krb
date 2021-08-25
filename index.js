const express = require("express");
require('dotenv').config({path:'./.env'});

app = express()

app.get('/', (req, res) => {
  res.send("ผู้รับผิดชอบข้อมูล: นายจงดี ตันจะโร (jongdee.t@egat.co.th)");
})

//=== app started ==
if (process.env.HTTPS == "True") {
  server.listen( 443, function () {
    console.log( 'Hello IREALLYHOST listening on port ' + server.address().port );
  });
}
else {
  console.log('Webhook started at port ' + process.env.PORT)
  app.listen(process.env.PORT || 4000);
}
