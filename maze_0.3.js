// Recursive backtracking maze generator
// 15/11/17
// Robin White
//
// Todo:
//  - remove globals
//
// Bugs:
//  -occasionally fails on start
//  -never fills every square (always some small gaps)
//    ^might be because of moving two squares at once, so can't just move one space

var size = 500;//parseInt(window.innerWidth/2);
var asdf = 50;
var width = size/asdf;
var array = [];
var stack = [];
var a = 0;

var node = document.createElement("CANVAS");
document.getElementById('maze').appendChild(node);
node.setAttribute("width", size-width);
node.setAttribute("height", size-width);
node.setAttribute("style", "border:1px solid #000;");

function square(y,x,colour) {
  this.i = y;
  this.j = x;
  this.visited = false;
  this.isWall = false;
  this.write = function() {
    var ctx = document.querySelector('canvas').getContext("2d");
    var i = this.i*width;
    var j = this.j*width;
    ctx.moveTo(i, j);
    if (this.visited||this.isWall) {
      ctx.fillStyle = "white";
    }else{
      ctx.fillStyle = "black";
    }
    if (colour) {
      ctx.fillStyle = colour;
    }
    ctx.fillRect(i,j,width,width);
  }

}

//shows the value of neighbouring cells
function neighbour(y,x){
  var i = array[y][x].i;
  var j = array[y][x].j;
  var neighbours = [];
  if(array[i-2]!==undefined){
    neighbours.push(array[i-2][j]);
  }else{
    neighbours.push(undefined);
  }
  if(array[j-1]!==undefined){
    neighbours.push(array[i][j-2]);
  }else{
    neighbours.push(undefined);
  }
  if(array[i+2]!==undefined){
    neighbours.push(array[i+2][j]);
  }else{
    neighbours.push(undefined);
  }
  if(array[j+1]!==undefined){
    neighbours.push(array[i][j+2]);
  }else{
    neighbours.push(undefined);
  }
  return neighbours;
}

function draw(){
  //+1 to size as there is a 1 pixel border
  for(i=0;i<(asdf);i++){
    var temp = [];
    for(j=0;j<(asdf);j++){
      var squares = new square(i,j);
      temp.push(squares);
      squares.write();
    }
    array.push(temp);
  }
}

function run(y,x){
  a=a+1;
  var current = array[y][x];
  //while(current!==undefined){
    var rand = Math.floor(Math.random()*4);
    var next = neighbour(y,x);
    current.visited = true;
    current.write();
    stack.push(current);
    if (stack[stack.length-1]===stack[stack.length-5]){
      for(i=0;i<5;i++){
        stack.pop();
      }
      current = stack[stack.length-1];
      if(current!==undefined){
        run(current.i,current.j);
        return 0;
      }else{
        location.reload();
        clearTimeout(loop);
        if (typeof loop !== 'undefined') {
          clearTimeout(loop);
          return 0;
        }
        return 0;
      }
    }
    if(next[rand]!==undefined && !next[rand].visited){
      var i = next[rand].i;//horizontal
      var j = next[rand].j;//vertical
      if(current.i<next[rand].i){//moved right
        array[y+1][x].isWall = true;
        array[y+1][x].write();
      }
      if(current.i>next[rand].i){//moved left
        array[y-1][x].isWall = true;
        array[y-1][x].write();
      }
      if(current.j<next[rand].j){//moved down
        array[y][x+1].isWall = true;
        array[y][x+1].write();

      }
      if(current.j>next[rand].j){//moved up
        array[y][x-1].isWall = true;
        array[y][x-1].write();
      }
      //run(i,j);//function only works on small maze due to "too much recursion", so setTimeout function also used to finish the maze
      loop = setTimeout(function(){run(i,j,current)},1);
    }else{
      //run(y,x);
      loop = setTimeout(function(){run(y,x,current)},1);
    }
    //console.log(current);
  //}
}
//repeats
function startEnd(){
  //return 0;
}

draw();
run(0,0);
var end = new square(array.length-2,array.length-2,"green");
var start = new square(0,0,"red");
