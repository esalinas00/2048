(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Board = require('./board');
var Painter = require('./painter');

var MyPainter = new Painter();
var putato = new Board(4) 
console.log(putato);
putato.randomCell();
putato.randomCell();


},{"./board":2,"./painter":3}],2:[function(require,module,exports){
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
	}
	initBoard.call(this);
}

Board.prototype.randomCell = function(){
	var randomNumber;
	var i = 0, j = 0;

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
		return "Gameover";
	}
	console.log(flatBoard);	
	randomNumber = Math.floor((Math.random() * flatBoard.length));
	//convert randomNumber to coordinates
	var freeCell = flatBoard[randomNumber];
	var x = Math.floor(freeCell/this.boardWitdh);
	var y = freeCell % this.boardWitdh;

	this.leBoard[x][y] = 1;
	this.logBoard();
	return freeCell;
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
}
module.exports = Board;
},{}],3:[function(require,module,exports){
function Painter(){
  var canvas = document.getElementById('game'); 
  var ctx;
  var blockSize = 40;
  var separation = 2;

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