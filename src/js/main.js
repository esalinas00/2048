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