export default class Game {
    constructor() {
        this._userMoveSymbol = 'x'
        this._computerMoveSymbol = 'o'
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

    createComputerMove() {
        // this._board[0][0] = 'o'     // нолик в верхнюю левую клетку
        this._updateBoard(0, 0, {
            symbol: this._computerMoveSymbol
        })
    }

    _updateBoard(x, y, config = {}) {
        const { symbol = this._userMoveSymbol } = config
        this._board[x][y] = symbol
    }

    _isCellFree(x, y) {
        return !this._board[x][y]
    }

    _throwException(msg) {
        throw new Error(msg)
    }
}