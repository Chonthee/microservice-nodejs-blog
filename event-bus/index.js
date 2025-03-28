const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const events = [];

app.post('/events',(req,res)=>{
    const event = req.body;

    events.push(event);

    axios.post('http://localhost:4000/events',event).catch((err) => {
        console.log('Post :' + err.message);
      }); //Post
    axios.post('http://localhost:4001/events',event).catch((err) => {
        console.log('Comment : ' +err.message);
      }); //Comment
    axios.post('http://localhost:3002/events',event).catch((err) => {
        console.log('Query : ' + err.message );
      }); //Query
    axios.post('http://localhost:4003/events',event).catch((err) => {
        console.log('Moderation : ' + err.message );
      }); //Moderation

    res.send({status:'OK'});
})

app.get('/events',(req,res)=>{
  res.send(events);
})

app.listen(4005,()=>{
    console.log(`Event bus listening on 4005`)
})