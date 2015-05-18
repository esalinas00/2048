function Painter(){
  var canvas = document.getElementById('game'); 
  var ctx;
  var blockSize = 40;
  var separation = 2;
  var colorMappings = {
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
      ctx.fillText(opts.cellValue.toString(), (40+separation)*j + 20, (40+separation)*i + 20);
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