let Main = require('./main')


module.exports = class Predator extends Main{
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
            var newPredator = new Predator(newCell[0], newCell[1]);
            predatorArr.push(newPredator);
            matrix[newCell[1]][newCell[0]] = 3;
            
        }


    }

    move() {
        super.getNewCoordinates()
        this.energy--
        let emptyCells = super.chooseCell(0);
        let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        if (newCell && this.energy >= 0) {
            matrix[newCell[1]][newCell[0]] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;
            var newpredator = new Predator(newCell[0], newCell[1]);
            predatorArr.push(newpredator);
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
            for (var i in grassEaterArr) {
                if (newCell[0] == grassEaterArr[i].x && newCell[1] == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1)
                    break
                }


            }
        } else {
            this.move()
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in predatorArr) {
            if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                predatorArr.splice(i, 3)
                break
            }
        }
    }

}