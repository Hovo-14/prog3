let Main = require('./main')
module.exports = class PredatorEaterEater extends Main{
    constructor(x, y) {
        super(x, y)
        this.energy = 6;
    }
    chooseCell(character) {
        super.getNewCoordinates()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }


    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }




    mul() {


        let emptyCells = super.chooseCell(0);
        let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        if (this.energy >= 12 && newCell) {
            var newPredatorEaterEater = new PredatorEaterEater(newCell[0], newCell[1]);
            predatorEaterEaterArr.push(newPredatorEaterEater);
            matrix[newCell[1]][newCell[0]] = 3;
            this.energy = 6;
        }


    }

    move() {
       super.getNewCoordinates()
        this.energy++
        let emptyCells = super.chooseCell(0);
        let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        if (newCell && this.energy >= 0) {
            matrix[newCell[1]][newCell[0]] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;
            var newpredatorEaterEater = new PredatorEaterEater(newCell[0], newCell[1]);
            predatorEaterEaterArr.push(newpredatorEaterEater);
            this.x = newCell[0];
            this.y = newCell[1];

        }
        else {
            if (this.energy < 0) {
                this.die()

            }
        }
    }
    eat() {
        super.getNewCoordinates()
        let emptyCells = super.chooseCell(1);
        let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        if (newCell) {
            this.energy++
            matrix[newCell[1]][newCell[0]] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;
            this.x = newCell[0];
            this.y = newCell[1];
            for (var i in predatorArr) {
                if (newCell[0] == predatorArr[i].x && newCell[1] == predatorArr[i].y) {
                    predatorArr.splice(i, 1)
                    break
                }


            } for (var i in grassEaterArr) {
                if (newCell[0] == grassEaterArr[i].x && newCell[1] == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1)
                    break
                }


            } for (var i in grassArr) {
                if (newCell[0] == grassArr[i].x && newCell[1] == grassArr[i].y) {
                    grassArr.splice(i, 1)
                    break
                }


            }
            for (var i in predatorEaterArr) {
                if (newCell[0] == predatorEaterArr[i].x && newCell[1] == predatorEaterArr[i].y) {
                    predatorEaterArr.splice(i, 1)
                    break
                }

            }

        } else {
            this.move()
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in predatorEaterEaterArr) {
            if (this.x == predatorEaterEaterArr[i].x && this.y == predatorEaterEaterArr[i].y) {
                predatorEaterEaterArr.splice(i, 5)
                break
            }
        }
    }

}