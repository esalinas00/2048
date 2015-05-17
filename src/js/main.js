var Board = require('./board');
var Painter = require('./painter');

var MyPainter = new Painter();
var putato = new Board(4) 
console.log(putato);
//putato.randomCell();
//putato.randomCell();
MyPainter.paintCell(putato.randomCell());

MyPainter.paintCell(putato.randomCell());
