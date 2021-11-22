export default class Game {

    constructor() {
        this._userMoveSymbol = 'x'
        this._computerMoveSymbol = 'o'
        this._fieldSize = 3
        this._userName = 'user'
        this._computerName = 'computer'
        this._history = []
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

        this._updateHistory(this._userName, x, y)

        // изменение только левой верхней клетки
        this._updateBoard(x, y)
    }

    createComputerMove() {
        // this._board[0][0] = 'o'     // нолик в верхнюю левую клетку
        const freeCells = this._board.reduce((total, row) =>
            row.reduce((count, el) =>
                el === '' ? ++count : count, total), 0)

        if (this._getFreeCellsCount() === 0) {
            return this._throwException('no cells available')
        }

        if (!freeCells) return

        let x = this._getRandomCoordinate()
        let y = this._getRandomCoordinate()

        while (!!this._board[x][y]) {
            x = this._getRandomCoordinate()
            y = this._getRandomCoordinate()
        }

        this._updateHistory(this._computerName, x, y)
        this._updateBoard(x, y, {
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

    getMoveHistory() {
        return this._history
    }

    _updateHistory(turn, x, y) {
        this._history.push({ turn, x, y })
    }

    _getRandomCoordinate() {
        return Math.floor(Math.random() * (this._fieldSize - 0))
    }

    _getFreeRandomCoordinates() {
        let x = this._getRandomCoordinate()
        let y = this._getRandomCoordinate()

        while (!!this._board[x][y]) {
            x = this._getRandomCoordinate()
            y = this._getRandomCoordinate()
        }

        return [x, y]
    }

    _getFreeCellsCount() {
        return this._board.reduce((total, row) =>
            row.reduce((count, el) =>
                el === '' ? ++count : count, total), 0)
    }

}