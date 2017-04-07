var express = require('express')
var app = express();
var bodyParser = require('body-parser');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/get-tree-data', function (req, res) {
  res.json({
    0: [
      {id: 1, title: 'Ship members', value: {symbolId: null, dimension: null}},
      {id: 2, title: 'Holly', value: {symbolId: '000', dimension: 'A'}}
    ],
    1: [
      {id: 3, title: 'Rimmer', value: {symbolId: '111', dimension: 'B'}},
      {id: 4, title: 'Lister', value: {symbolId: '112', dimension: 'B'}},
      {id: 5, title: 'Mechanoids', value: {symbolId: null, dimension: null}},
      {id: 6, title: 'Humanoids', value: {symbolId: '  ', dimension: null}}
    ],
    5: [{id: 7, title: 'Kryten', value: {symbolId: '120', dimension: 'C'}}],
    6: [{id: 8, title: 'The Cat', value: {symbolId: '130', dimension: 'D'}}]
  });
})

app.post('/preview', function (req, res) {
  const sidc = req.body.sidc;

  if(sidc.indexOf('00') > -1) { color = '555555' }
  else if(sidc.indexOf('11') > -1) { color = 'ffff00' }
  else if(sidc.indexOf('12') > -1) { color = '0000ff' }
  else if(sidc.indexOf('13') > -1) { color =  'ff0000' }

  res.json([
    '/usr/share/fonts/truetype/milstan.ttf',
    '2',
    color,
    (90 + Math.round(Math.random() * 10)).toString(),
    (60 + Math.round(Math.random() * 20)).toString(),
    'Font family:MILSTD2525AIR',
    'Font alias:Milair'
  ]);
});

app.post('/get-symbol-defence-priority', function (req, res) {

});

app.listen(9090, function () {
  console.log('Example app listening on port 9090!')
})
