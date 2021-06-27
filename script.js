var socket = io();

var side = 70;

var weath = 'summer'


setInterval(() => {
    socket.on('weather', (data) => {
    weath = data    
})
}, 1000);


function setup() {
    frameRate(6);
    createCanvas(10 * side, 10 * side);
    background('#acacac');
}


function nkarel(matrix) {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            var obj = matrix[y][x];
            if (obj == 1){
                
                fill("green");
           
        }else if (obj == 2) {
                fill("yellow");
            }
        else if (obj == 3) {
            fill("orange");
        }
        else if (obj == 4) {
            fill("blue");
        }
        else if (obj == 5) {
            fill("red");
        }
            else if (obj == 0){
                fill("grey")
            }
            rect(x * side, y * side, side, side);
        }
    }
}

        socket.on('send matrix', nkarel)
 


function spring() {
    socket.emit("spring")
}
function summer() {
    socket.emit("summer")
}
function winter() {
    socket.emit("winter")
}
function autumn() {
    socket.emit("autumn")
}
