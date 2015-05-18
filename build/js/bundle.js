(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
var MyHandler = new Handler(putato.slide.bind(putato));
},{"./board":2,"./handler":3,"./painter":4}],2:[function(require,module,exports){
function Board(size){
	this.leBoard = [];
	this.boardWitdh = size;
	this.maxCells  = size * size;

	//Initialize the board
	function initBoard () {
		var i = 0, j = 0;
		for(; i < this.boardWitdh; i+=1 ){
			this.leBoard.push([]);
			for(j = 0; j < this.boardWitdh; j+=1 ){
				this.leBoard[i][j] = 0;
			}
		}
		this.randomCell();
		this.randomCell();
	}	
	initBoard.call(this);
}

Board.prototype.randomCell = function(){
	var event;
	var randomNumber;
	var i = 0, j = 0;
	var freeCell, pi, pj, randomValue;
	var valueMappings = [2,2,2,2,4];
	var flatBoard = [];
	
	//Traverse Array
	for(; i < this.boardWitdh; i+=1 ){
		for(j = 0; j < this.boardWitdh; j+=1 ){
			if(this.leBoard[i][j] == 0){
				flatBoard.push(i*this.boardWitdh+j);
			}
		}
	}
	if(!flatBoard.length){
		console.log("Gameover");
		event = new CustomEvent('newCell', { 'detail': {gameover: true} });
		document.dispatchEvent(event);
		return {gameover:true};
	}
	console.log(flatBoard);	
	randomNumber = Math.floor((Math.random() * flatBoard.length));
	//convert randomNumber to coordinates
	freeCell = flatBoard[randomNumber];
	pi = Math.floor(freeCell/this.boardWitdh);
	pj = freeCell % this.boardWitdh;

	var randomValue = valueMappings[Math.floor((Math.random() * valueMappings.length))];
	this.leBoard[pi][pj] = randomValue;
	this.logBoard();
	event = new CustomEvent('newCell', { 'detail': { cellNumber: freeCell, cellValue: randomValue, gameover: false} });
	document.dispatchEvent(event);
	return { cellNumber: freeCell, cellValue: randomValue, gameover: false};
};

Board.prototype.logBoard = function(){
	var toLog = "";
	this.leBoard.forEach(function(row, indexX, owner){
		row.forEach(function(item,indexY,owner){
			toLog += item+" ";	
		});
		toLog +="\n";
	});
	console.log(toLog);
};

//i stands for y-axis
//j stands for x-axis
Board.prototype.slide = function(direction){
	console.log("Direction: "+direction);
	var y = 0, x = 0;
	var lastPos = 99;
	var event;
	var changed = false;
	//lets start with slide up;
	var emptyCells = 0;
	if(direction === "up"){
		//console.log("we entered the for");
		for(;y<this.leBoard.length;y+=1){
			x=0;
			//console.log("y-cycle: ",y,this.leBoard[y]);
			for(;x<this.leBoard.length;x+=1){
				//console.log("x-cycle: ",x);
				lastPos = 99;
				if(y == 0 ) {
					//do nothing
					if(this.leBoard[y][x] === 0) {
						emptyCells += 1;
					}
				} else if(this.leBoard[y][x] !== 0){
					//console.log("we are in a filled cell ","y: ",y,"x: ",x);
					for(var k = y; k >= 0; k-=1){
						if(this.leBoard[k][x] === 0){
							lastPos = k;
						}
					}
				} else {
					//empy cells in other ys
					emptyCells += 1;
				}

				if(lastPos !== 99){
					this.leBoard[lastPos][x] = this.leBoard[y][x];
					this.leBoard[y][x] = 0;
					changed = true;
				}
			}
		}	
	}

	//this.logBoard();
	if(changed){
		event = new CustomEvent('redraw', { 'detail': {board: this.leBoard} });
		document.dispatchEvent(event);
		this.randomCell(); 
	}
	//console.log("EMPTY CELLS: ",emptyCells);
	
};
module.exports = Board;
},{}],3:[function(require,module,exports){
//event handler
function EventHanlder(cb){

  function keyHandler(e){
    switch(e.which){
      case 38:
      case 87:
        //console.log("Up action");
        //code here
        cb("up");
        break;
      case 39:
      case 68:
        //console.log("Right action");
        //code here
        cb("right");
        break;
      case 40:
      case 83:
        //console.log("Down action");
        //code here
        cb("down");
        break;
      case 37:
      case 65:
        //console.log("Left action");
        //code here
        cb("left");
        break;
      default:
        break;   
    }
  }
  document.addEventListener('keydown',keyHandler,false);
}
module.exports = EventHanlder;
},{}],4:[function(require,module,exports){
function Painter(){
  var canvas = document.getElementById('game'); 
  var ctx;
  var blockSize = 40;
  var separation = 2;
  var colorMappings = {
    '0' : "#C0C0C0",
    '2': 'rgb(238, 228, 218)',
    '4':'rgb(237, 224, 200)',
    '8':'rgb(242, 177, 121)',
    '16':'rgb(245, 149, 99)',
    '32':'rgb(246, 124, 95)',
    '64':'rgb(246, 94, 59)',
    '128':'rgb(237, 207, 114)',
    '256':'rgb(237, 204, 97)',
    '512':'rgb(237, 200, 80)',
    '1024':'rgb(237, 197, 63)',
    '2048':'rgb(237, 194, 46)'
  };

  if(canvas.getContext){
  	ctx = canvas.getContext('2d');

  	for (var i=0;i<4;i++){
    	for (var j=0;j<4;j++){
        ctx.beginPath();
        ctx.fillStyle = "#C0C0C0";
        //ctx.fillRect((40+separation)*i,(40+separation)*j,blockSize,blockSize);
        roundedRect(ctx,(40+separation)*i,(40+separation)*j,blockSize,blockSize,4);
    	}
  	}
  }

  //opts.cellNumber , opts.cellValue, opts.gameover
  this.paintCell = function(opts){
    if (!opts.gameover){
      var i = Math.floor(opts.cellNumber/4);
      var j = opts.cellNumber%4;

      ctx.beginPath(); 
      ctx.fillStyle = colorMappings[opts.cellValue.toString()];
      roundedRect(ctx,(40+separation)*j,(40+separation)*i,blockSize,blockSize,4);

      if(opts.cellValue <= 4) {
        ctx.fillStyle = "rgb(119, 110, 101)";
      } else {
        ctx.fillStyle = "rgb(249, 246, 242)";  
      }

      if(Math.floor(opts.cellValue/1000)){
         ctx.font = "18px serif";
      } else if(Math.floor(opts.cellValue/100)){
        ctx.font = "22px serif";
      } else if(Math.floor(opts.cellValue/10)){
        ctx.font = "28px serif";
      } else {
        ctx.font = "34px serif";
      }
      
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      //ctx.fillText(opts.cellValue.toString() == 0 ? "":opts.cellValue.toString(), (40+separation)*j + 20, (40+separation)*i + 20);
      ctx.fillText(opts.cellValue || "" , (40+separation)*j + 20, (40+separation)*i + 20);
    }
  }

  this.redraw = function(board){
    var i = 0,j;
    for(;i < board.length; i+=1){
      j = 0;
      for(;j < board.length; j+=1){
        var cellNumber = i*board.length + j;
        this.paintCell({cellNumber:cellNumber,cellValue:board[i][j]});
      } 
    }
  }
}

module.exports = Painter;

function roundedRect(ctx,x,y,width,height,radius){
  ctx.beginPath();
  ctx.moveTo(x,y+radius);
  ctx.lineTo(x,y+height-radius);
  ctx.quadraticCurveTo(x,y+height,x+radius,y+height);
  ctx.lineTo(x+width-radius,y+height);
  ctx.quadraticCurveTo(x+width,y+height,x+width,y+height-radius);
  ctx.lineTo(x+width,y+radius);
  ctx.quadraticCurveTo(x+width,y,x+width-radius,y);
  ctx.lineTo(x+radius,y);
  ctx.quadraticCurveTo(x,y,x,y+radius);
  ctx.fill();
}
},{}]},{},[1])


//# sourceMappingURL=bundle.js.map