const express = require('express')
const fs = require('fs');
const csv = require('csv');
const iconv = require('iconv-lite');
const path = require('path')
const PORT = process.env.PORT || 5000

fs.createReadStream(__dirname + '/38EHIME.CSV').pipe(iconv.decodeStream('SJIS'))
.pipe(iconv.encodeStream('UTF-8')).pipe(csv.parse(function(err, data) {
    address = data;
}));

express()
  .use(express.static(path.join(__dirname, 'public')))
  .get("/", function(req, res){
    code = req.query.code;
  
    if(code == null){
        code = 7900064;
    }
  
    address.forEach(function( value ) {
        if (code == Number(value[2])) {
            res.jsonp(value[6] + value[7] + value[8]);
        }
    });
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
