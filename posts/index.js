const express = require('express');
const bodyParser = require('body-parser');
const {randomBytes} = require('crypto'); // To generate a new ID that we're going to assign to the post
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.json()); // use to read req from client
app.use(cors());
//

const posts = {};

app.get('/posts', (req,res) =>{
    res.send(posts);
});

app.post('/posts', async (req,res)=>{
    const id =randomBytes(4).toString('hex');
    const {title} = req.body;
    // console.log(title)
    // console.log(id)
    posts[id] = {
        id,title
    };

    await axios.post('http://localhost:4005/events',{
        type:'PostCreated',
        data:{
            id,title
        }
    }).catch((err) => {
        console.log(err.message);
    });

    res.status(201).send(posts[id]);
})

app.post('/events',(req,res)=>{
    console.log('Event Received : ',req.body.type);

    res.send({});
})

app.listen(4000,()=>{
    console.log('Posts service listenning on 4000')
})