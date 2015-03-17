var express = require('express')
var serveStatic = require('serve-static')
 
var app = express()
 
app.set('port', (5000));
app.use(serveStatic('./', {'index': ['index.html']}));
app.listen(app.get('port'));