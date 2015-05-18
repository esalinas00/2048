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
	var freeCell, x, y, randomValue;
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
	x = Math.floor(freeCell/this.boardWitdh);
	y = freeCell % this.boardWitdh;

	var randomValue = valueMappings[Math.floor((Math.random() * valueMappings.length))];
	this.leBoard[x][y] = randomValue;
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
}
module.exports = Board;