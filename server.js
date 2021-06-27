var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);

matrix = [
[1 ,3, 0, 2, 0, 2, 0, 1, 0, 5],
[2, 2, 0, 5, 5, 1, 5, 4, 3, 2],
[0, 4, 0, 3, 5, 3, 0, 3, 5, 5],
[3, 1, 4, 1, 0, 3, 5, 4, 3, 1],
[1 ,0 ,5 ,5, 4, 2, 2, 1, 2, 5],
[0, 0, 2, 1, 4, 3, 2, 0, 4, 0],
[4, 4, 5, 5, 0, 4, 3, 5, 0, 0,],
[0, 3, 1, 5, 3, 5, 1, 2, 1, 2],
[5, 2, 4, 5, 4, 0, 5, 0, 4, 4],
[1, 5, 0, 3, 5, 5, 0, 1, 5, 5]
];

io.sockets.emit('send matrix', matrix)


predatorEaterEaterArr = [];
predatorEaterArr = [];
predatorArr = [];
grassArr = [];
grassEaterArr = [];

weath = "winter";
Grass = require("./grass")
GrassEater = require("./grasseater")
Predator = require("./predator")
PredatorEater = require("./predatoreater")
PredatorEaterEater = require("./predatoreatereater")
console.log(weath);

function createObject() {
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
            } else if (matrix[y][x] == 5) {
                var gr = new PredatorEaterEater(x, y, 1);
                predatorEaterEaterArr.push(gr);
            }
        }
    }

    io.sockets.emit('send matrix', matrix)
}


function game() {
    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var i in grassEaterArr) {
        grassEaterArr[i].eat();
        grassEaterArr[i].mul();
    }
    for (var i in predatorArr) {
        predatorArr[i].mul();
        predatorArr[i].eat();
    }
    for (var i in predatorEaterArr) {
        predatorEaterArr[i].mul();
        predatorEaterArr[i].eat();
    }
    for (var i in predatorEaterEaterArr) {
        predatorEaterEaterArr[i].mul();
        predatorEaterEaterArr[i].eat();
    }
    io.sockets.emit("send matrix", matrix);
}


setInterval(game, 1000)

function winter() {
    weath = 'winter'
    io.sockets.emit('weather', weath)
}

function spring() {
    weath = 'spring'
    io.sockets.emit('weather', weath)
}

function summer() {
    weath = 'summer'
    io.sockets.emit('weather', weath)
}

function autumn() {
    weath = 'autumn'
    io.sockets.emit('weather', weath)
}

io.on('connection', function (socket) {
    createObject()
    socket.on('spring', spring)
    socket.on('summer', summer)
    socket.on('autumn', autumn)
    socket.on('winter', winter)

})





io.on('connection', function (socket) {
    createObject();
    socket.on("winter", winter);
    socket.on("autumn", autumn);
    socket.on("summer", summer);
    socket.on("spring", spring);

});


var statistics = {};

setInterval(function() {
    statistics.Grass = grassArr.length;
    statistics.GrassEater = grassEaterArr.length;
    statistics.Predator = predatorArr.length;
    statistics.PredatorEater = predatorEaterArr.length;
    statistics.PredatorEaterEater = predatorEaterEaterArr.length;
  
    fs.writeFile("statistics.json", JSON.stringify(statistics), function(){
        console.log("send")
    })
},1000)