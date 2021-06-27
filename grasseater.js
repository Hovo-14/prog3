let Main = require('./main')
module.exports = class GrassEater extends Main{
    constructor(x, y ) {
      super(x, y)
        this.energy = 6;
    }




    mul() {
        let emptyCells = super.chooseCell(0);
        let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        if (this.energy >= 12 && newCell) {
            var newGrass = new GrassEater(newCell[0], newCell[1]);
            grassEaterArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 2;
            this.energy = 6;
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
            var newGrassEater = new GrassEater(newCell[0], newCell[1]);
            grassEaterArr.push(newGrassEater);
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
        let emptyCells = this.chooseCell(1);
        let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        if (newCell) {
            this.energy++
            matrix[newCell[1]][newCell[0]] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;
            this.x = newCell[0];
            this.y = newCell[1];
            for (var i in grassArr) {
                if (newCell[0] == grassArr[i].x && newCell[1] == grassArr[i].y) {
                    grassArr.splice(i, 1)
                    break
                }
            }
        } else {
            this.move()
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (var i in grassEaterArr) {
            if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                grassArr.splice(i, 2)
                break
            }
        }
    }
}
