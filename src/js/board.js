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
	var recentlyMerged = [];
	for (var im = 0; i < this.leBoard.length; im++) {
		recentlyMerged.push([]);
		for (var jm = 0; i < this.leBoard.length; jm++) {
			recentlyMerged[im][jm] = false;
		};
	};
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
					for(var k = y - 1 ; k >= 0; k-=1){
						if(this.leBoard[k][x] === 0){
							lastPos = k;
						}else if(this.leBoard[k][x] === this.leBoard[y][x]){
							lastPos = k;
							break;
						} else {
							break;
						}

					}
				} else {
					//empy cells in other ys
					emptyCells += 1;
				}

				if(lastPos !== 99){
					this.leBoard[lastPos][x] += this.leBoard[y][x];
					this.leBoard[y][x] = 0;
					changed = true;
				}
			}
		}	
	}else if(direction === "down"){
		//console.log("DOWN, we entered the for");
		y = this.leBoard.length -1 ;
		for(;y >= 0; y-=1){
			x=0;
			console.log("y-cycle: ",y,this.leBoard[y]);
			for(;x<this.leBoard.length;x+=1){
				//console.log("x-cycle: ",x);
				lastPos = 99;
				if(y == 3 ) {
					//do nothing
					if(this.leBoard[y][x] === 0) {
						emptyCells += 1;
					}
				} else if(this.leBoard[y][x] !== 0){
					//console.log("we are in a filled cell ","y: ",y,"x: ",x);
					for(var k = y + 1 ; k < this.leBoard.length; k+=1){
						if(this.leBoard[k][x] === 0){
							lastPos = k;
						}else if(this.leBoard[k][x] === this.leBoard[y][x]){
							lastPos = k;
							break;
						} else {
							break;
						}

					}
				} else {
					//empy cells in other ys
					emptyCells += 1;
				}
				
				if(lastPos !== 99){
					this.leBoard[lastPos][x] += this.leBoard[y][x];
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