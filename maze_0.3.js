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

var width = 5;//pixel size of each square
var array = [];
var stack = [];

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
  for(i=0;i<(100+1);i++){
    var temp = [];
    for(j=0;j<(100+1);j++){
      var squares = new square(i,j);
      temp.push(squares);
      squares.write();
    }
    array.push(temp);
  }
}

function run(y,x){
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
        startEnd();
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
      //run(i,j);//only works on small maze due to "too much recursion"
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
  window.reload();
  //var start = new square(50,50,"red");
  //var end = new square(array.length-2,array.length-2,"green");
  //start.write();
  //end.write(); 
}

draw();
run(50,50);
