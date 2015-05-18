var Board = require('./board');
var Painter = require('./painter');
var Handler = require('./handler');

var MyPainter = new Painter();
document.addEventListener('newCell',function(e){
  console.log('New Cell event triggered');
  MyPainter.paintCell(e.detail);
},false);
var putato = new Board(4);

var MyHandler = new Handler(putato.slide.bind(putato));