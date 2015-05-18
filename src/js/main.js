var Board = require('./board');
var Painter = require('./painter');

var MyPainter = new Painter();
document.addEventListener('newCell',function(e){
  console.log('New Cell event triggered');
  MyPainter.paintCell(e.detail);
},false);
var putato = new Board(4);
//console.log(putato);
//MyPainter.paintCell(putato.randomCell());
//MyPainter.paintCell(putato.randomCell());


//event handler
function keyHandler(e){
  switch(e.which){
    case 38:
    case 87:
      //console.log("Up action");
      //code here
      break;
    case 39:
    case 68:
      //console.log("Right action");
      //code here
      break;
    case 40:
    case 83:
      //console.log("Down action");
      //code here
      break;
    case 37:
    case 65:
      //console.log("Left action");
      //code here
      break;
    default:
      break;   
  }
}
document.addEventListener('keydown',keyHandler,false);

