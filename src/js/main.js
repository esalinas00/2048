var Board = require('./board');
var Painter = require('./painter');
var Handler = require('./handler');

var MyPainter = new Painter();
document.addEventListener('newCell',function(e){
  console.log('New Cell event triggered');
  MyPainter.paintCell(e.detail);
},false);
var putato = new Board(4);
document.addEventListener('redraw',function(e){
  console.log('Redraw event triggered');
  MyPainter.redraw(e.detail.board);
},false);
document.addEventListener('win',function(e){
  console.log('win event triggered');
  alert(e.detail);
},false);
document.addEventListener('gameover',function(e){
  console.log('gameover event triggered');
  alert(e.detail);
},false);
var MyHandler = new Handler(putato.slide.bind(putato));