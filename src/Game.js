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
        if (this._board[x][y]) {
            throw new Error('cell is already taken')
            return
        }
        if (!this._isCellFree(x, y)) {
            return this._throwException('cell is already taken')
        }
        // изменение только левой верхней клетки
        this._updateBoard(x, y)
    }

    _updateBoard(x, y) {
        this._board[x][y] = this._userMoveSymbol
    }

    _isCellFree(x, y) {
        return !this._board[x][y]
    }

    _throwException(msg) {
        throw new Error(msg)
    }
}