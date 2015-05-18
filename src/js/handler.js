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