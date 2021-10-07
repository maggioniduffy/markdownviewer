import express from 'express';
import path from 'path';
import sharejs from 'share';
import redis from 'redis';

const __dirname = path.resolve();
const app = express();

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.render('pad');
  });

app.get('/(:id)', function(req, res) {
    res.render('pad');
  });

  let redisClient;
  console.log(process.env.REDISTOGO_URL);
  if (process.env.REDISTOGO_URL) {
    var rtg   = require("url").parse(process.env.REDISTOGO_URL);
    redisClient = redis.createClient(rtg.port, rtg.hostname);
    redisClient.auth(rtg.auth.split(":")[1]);
  } else {
    console.log('else')
    redisClient = redis.createClient();
    console.log(redisClient)
  }


const options = {
    db: {type: 'redis'},
  };

sharejs.server.attach(app, options);

const PORT = process.env.PORT || 8000;
app.listen(PORT);