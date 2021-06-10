class Grass {

    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.index = index;
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
    chooseCell(character) {
        var found = [];
        for (var i in this.directions) {
            var x = Math.floor(Math.random() * matrix.length);
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    mul() {
        this.multiply++
        let emptyCells = this.chooseCell(0);
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
    } move() {
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
    }
}


class GrassEater {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 6;
        this.index = index;
    }
    chooseCell(character) {
        this.getNewCoordinates()
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


        let emptyCells = this.chooseCell(0);
        let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        if (this.energy >= 12 && newCell) {
            var newGrass = new GrassEater(newCell[0], newCell[1], this.index);
            grassEaterArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 2;
            this.energy = 6;
        }


    }

    move() {
        this.getNewCoordinates()
        this.energy--
        let emptyCells = this.chooseCell(0);
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
        this.getNewCoordinates()
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

class Predator {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 6;
        this.index = index;
    }
    chooseCell(character) {
        this.getNewCoordinates()
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


        let emptyCells = this.chooseCell(0);
        let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        if (this.energy >= 12 && newCell) {
            var newPredator = new Predator(newCell[0], newCell[1], this.index);
            predatorArr.push(newPredator);
            matrix[newCell[1]][newCell[0]] = 3;
            
        }


    }

    move() {
        this.getNewCoordinates()
        this.energy--
        let emptyCells = this.chooseCell(0);
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
        this.getNewCoordinates()
        let emptyCells = this.chooseCell(1);
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
class PredatorEater{
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 6;
        this.index = index;
    }
    chooseCell(character) {
        this.getNewCoordinates()
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


        let emptyCells = this.chooseCell(0);
        let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        if (this.energy >= 12 && newCell) {
            var newPredatorEater = new PredatorEater(newCell[0], newCell[1], this.index);
            PredatorEaterArr.push(newPredatorEater);
            matrix[newCell[1]][newCell[0]] = 3;
            this.energy = 6;
        }


    }

    move() {
        this.getNewCoordinates()
        this.energy--
        let emptyCells = this.chooseCell(0);
        let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        if (newCell && this.energy >= 0) {
            matrix[newCell[1]][newCell[0]] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;
            var newpredatorEater = new PredatorEater(newCell[0], newCell[1]);
            predatorEaterArr.push(newpredatorEater);
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
        this.getNewCoordinates()
        let emptyCells = this.chooseCell(1);
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


            }
        } else {
            this.move()
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in predatorEaterArr) {
            if (this.x == predatorEaterArr[i].x && this.y == predatorEaterArr[i].y) {
                predatorEaterArr.splice(i, 4)
                break
            }
        }
    }
   
}
class PredatorEaterEater{
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 6;
        this.index = index;
    }
    chooseCell(character) {
        this.getNewCoordinates()
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


        let emptyCells = this.chooseCell(0);
        let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        if (this.energy >= 12 && newCell) {
            var newPredatorEaterEater = new PredatorEaterEater(newCell[0], newCell[1], this.index);
            predatorEaterEaterArr.push(newPredatorEaterEater);
            matrix[newCell[1]][newCell[0]] = 3;
            this.energy = 6;
        }


    }

    move() {
        this.getNewCoordinates()
        this.energy++
        let emptyCells = this.chooseCell(0);
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
        this.getNewCoordinates()
        let emptyCells = this.chooseCell(1);
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

    }else {
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