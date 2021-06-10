//hakarak tpel


// var c = [45,60,12,98,78,154,65];
// var b = reverseArray(c);
// console.log(b); 

// var t = ["php","javascript","html","css","mysql"];
// var m = reverseArray(t);
// console.log(m); 

// function reverseArray(a){
//     var k=[]

//      for(var i = a.length-1; i >=0; i--){
//       k.push (a[i])
//      }
//      return k;
// }





//?

// function Lname(A1,A2){
//     var c =A1 + A2
//     return c
// }

// console.log(Lname(4,6))
// console.log(Lname(7,3))
// console.log(Lname(8,2))
// console.log(Lname(9,1))


//p.5 draw(1)

// function setup() {
//     createCanvas(500, 500);
//     background('#acacac');
//     noStroke();
//     frameRate(5);
// }
// function draw() {

//     fill('black');

//     ellipse(random(1,500),random(1,500), 20, 20);




// }



//p.5 draw(2)

// function setup() {
//     createCanvas(500, 500);
//     background('#acacac');
//     noStroke();
//     frameRate(5);
// }
// function draw() {

//     fill('black');
//     background('#acacac');
//     ellipse(random(1,500),random(1,500), 20, 20);




// }


var matrix = [
    [0, 0, 1, 0, 5,0, 0, 3, 1, 5],
    [1, 2, 1, 2, 4,0, 0, 2, 0, 5],
    [0, 1, 3, 0, 3,1, 1, 0, 1, 5],
    [4, 5, 1, 0, 1,0, 4, 1, 0, 5],
    [1, 1, 0, 1, 2,0, 0, 1, 0, 5]
];
var side = 70;

var predatorEaterEaterArr = [];
var predatorEaterArr = [];
var predatorArr =[];
var grassArr = [];
var grassEaterArr = [];

function setup() {
    frameRate(3.5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');


    for (var y = 0; y < matrix.length; ++y) {
        for (var x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y, 1);
                grassArr.push(gr);
            }
            else if (matrix[y][x] == 2) {
                var gr = new GrassEater(x, y, 1);
                grassEaterArr.push(gr);
            }
            else if (matrix[y][x] == 3) {
                var gr = new Predator(x, y, 1);
                predatorArr.push(gr);
            }
            else if (matrix[y][x] == 4) {
                var gr = new PredatorEater(x, y, 1);
                predatorEaterArr.push(gr);
            }else if (matrix[y][x] == 5) {
                var gr = new PredatorEaterEater(x, y, 1);
                predatorEaterEaterArr.push(gr);
            }
        }
    }





}







function draw() {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            } else if (matrix[y][x] == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);
            } else if (matrix[y][x] == 3) {
                fill("orange");
                rect(x * side, y * side, side, side);
            } else if (matrix[y][x] == 4) {
                fill("blue");
                rect(x * side, y * side, side, side);
            }  else if (matrix[y][x] == 5) {
                fill("red");
                rect(x * side, y * side, side, side);
            }
        }
    }

    for (var i in grassArr) {
        grassArr[i].mul();
        
    }
    for (var i in grassEaterArr) {
        grassEaterArr[i].eat();
        grassEaterArr[i].mul();
    }
    for (var i in predatorArr){
        predatorArr[i].mul();
        predatorArr[i].eat();
    }
    for (var i in predatorEaterArr){
        predatorEaterArr[i].mul();
        predatorEaterArr[i].eat();
    }
    for (var i in predatorEaterEaterArr){
        predatorEaterEaterArr[i].mul();
        predatorEaterEaterArr[i].eat();
    }
}







