var express = require('express')
var app = express()

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/get-tree-data', function (req, res) {
  res.json({
    0: [
      {id: 1, title: '100', value: {symbolId: null, dimension: null}},
      {id: 2, title: '200', value: {symbolId: '200', dimension: 'A'}}
    ],
    1: [
      {id: 3, title: '110', value: {symbolId: '110', dimension: 'B'}},
      {id: 4, title: '120', value: {symbolId: null, dimension: null}},
      {id: 6, title: '130', value: {symbolId: '  ', dimension: null}}
    ],
    4: [{id: 5, title: '121', value: {symbolId: '121', dimension: 'C'}}],
    6: [{id: 7, title: '122', value: {symbolId: '122', dimension: 'D'}}]
  });
})

app.listen(9090, function () {
  console.log('Example app listening on port 9090!')
})
