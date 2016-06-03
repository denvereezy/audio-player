const express = require('express'),
      exphbs   = require('express-handlebars'),
      bodyParser = require('body-parser'),
      multer =  require('multer'),
      mysql = require('mysql'),
      myConnection = require('express-myconnection'),
      app = express();

const music = require('./routes/index');
// const extention = .mp3;
const dbOptions = {
  host: 'localhost',
  port: 3306,
  user: 'admin',
  password: 'password',
  database: 'music'
};

app.use(myConnection(mysql, dbOptions, 'single'));
app.use(express.static('public'));
app.engine('handlebars', exphbs({defaultLayout: "main"}));
app.set('view engine', 'handlebars');

app.get('/', music.show);
app.get('/add', function(req, res){
  res.render('add');
});
app.post('/music/upload',multer({ dest: './public/uploads/'}).single('audio') , music.add);
const port = process.env.PORT || 2016;
const server = app.listen(port, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log('App running on http://%s:%s', host, port);
});
