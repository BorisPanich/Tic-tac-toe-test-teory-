export default class Game {
    constructor() {
        this._userMoveSymbol = 'x'
        this._board = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ]
    }

    getState() {
        // возварт текущего состояния
        return this._board
    }
    acceptUserMove(x, y) {
        // изменение только левой верхней клетки
        this._updateBoard(x, y)
    }

    _updateBoard(x, y) {
        this._board[x][y] = this._userMoveSymbol
    }
}