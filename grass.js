let Main = require('./main')

module.exports = class Grass extends Main{
    constructor(x, y) {
        super(x, y)
        this.multiply = 0;
    }

    mul() {
        this.multiply++
        let emptyCells = super.chooseCell(0);
        let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];

        console.log(newCell)
        if (newCell && this.multiply >= 8) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 1;

            var newGrass = new Grass(newX, newY, 1);
            grassArr.push(newGrass);
            this.multiply = 0;
        }
        if (weath == "winter") {
            this.energy -= 2;
            this.multiply -= 2;
        }
        if (weath == "spring") {
            this.energy += 5;
            this.multiply += 5;
        }
        if (weath == "summer") {
            this.energy += 3;
            this.multiply += 3;
        }
        if (weath == "autumn") {
            this.energy--;
            this.multiply--;
    }
    } 
}
  /*   move() {
        this.getNewCoordinates()
        this.energy--
        let emptyCells = this.chooseCell(0);
        let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        if (newCell && this.energy >= 0) {
            matrix[newCell[1]][newCell[0]] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;
            var newGrass = new Grass(newCell[0], newCell[1]);
            grassArr.push(newGrass);
            this.x = newCell[0];
            this.y = newCell[1];
        }
        else {
            if (this.energy < 0) {
              this.die();

            }
        }
    } */
