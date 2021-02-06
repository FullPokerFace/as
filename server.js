var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser')

//Data Storage
let data      = require('./data/data');
var app = express();

// CORS & Post Request Encoding
app.use(cors({origin: '*'}));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded



//Post Request to PUT messages
app.post('/:channelId',  (req, res,next) => {
   data.filter(channel => req.params.channelId == channel.id)[0].messages = req.body.messages;
   res.send('New Message Added');

})

//Get Request to get all channels
app.get('/channels', function (req, res) {
    const channels = data.map(channel => ({
        id : channel.id,
        title : channel.title
    }))
   res.send(channels);
})

//Get request to get messages of a channel
app.get('/messages/:id', function (req, res) {
    const channel = data.filter(channel => channel.id == req.params.id)
   res.send(channel);
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("AlphaSense app listening at http://%s:%s", host, port)
})