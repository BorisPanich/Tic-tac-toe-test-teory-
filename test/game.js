import { expect } from 'chai';
import Game from '../src/Game';

const userName = 'user'
const userMoveSymbol = '×'
const computerName = 'computer'
const initialGameBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
]

let game
beforEach(() => { game = new Game() })

const fillCells = (game, config = {}) => {
    const { x = -1, y = -1 } = config
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (i !== x || j !== y) game.acceptUserMove(i, j)
        }
    }
}

const count = (arr, symbol) =>
    arr.reduce((result, row) => {
        return row.reduce((count, el) => {
            return el === symbol ? ++count : count
        }, result)
    }, 0)


describe('Game', () => {
    it('Should return emty game board', () => {
        const board = game.getState()

        expect(board).to.deep.equal(initialGameBoard)
    })

    it('Writes user\'s symbol in cell with given coordinates', () => {
        const x = 1, y = 1

        game.acceptUserMove(x, y)
        const board = game.getState()

        expect(board[x][y].to.equal(userMoveSymbol))
    })

    it('Throws an exception if user moves in taken cell', () => {
        const x = 2, y = 2

        game.acceptUserMove(x, y)
        const func = game.acceptUserMove.bind(game, x, y)

        expect(func).to.throw('cell is already taken')
    })

    // it('Computer moves in top left cell', () => {
    //     game.createComputerMove()
    //     const board = game.getState()

    //     expect(board[0][0]).to.equal('o')
    // })


    it('Game saves user\'s move in history', () => {
        const x = 1, y = 1

        game.acceptUserMove(x, y)
        const history = game.getMoveHistory()

        expect(history).to.deep.equal([{ turn: 'userName', x, y }])
    })

    it('Game saves computers\'s move in history', () => {
        const stub = sinon.stub(Math, 'random').returns(0.5)

        game.createComputerMove()
        const history = game.getMoveHistory()

        expect(history).to.deep.equal([{ turn: computerName, x: 1, y: 1 }])
        stub.restore()
    })

    it('Game saves 1 user\'s move and 1 computer\'s move in history', () => {
        const x = 1, y = 1

        game.acceptUserMove(x, y)
        game.createComputerMove()
        const history = game.getMoveHistory()

        expect(history.length).to.equal(2)
        expect(history[0].turn).to.equal(userName)
        expect(history[1].turn).to.equal(computerName)
    })

    it('Computer moves in randomly chosen cell', () => {
        const userMoveSymbol = '×'
        const computerMoveSymbol = 'o'

        // ...
        const stub = sinon.stub(Math, 'random').returns(0.5)

        game.createComputerMove()
        const board = game.getState()

        expect(board[1][1]).to.equal(computerMoveSymbol)
        stub.restore()
    })

    it('Computer moves in cell that is not taken', () => {
        // fill all the cells with user's symbol except last
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (i !== 2 || j !== 2) game.acceptUserMove(i, j)
            }
        }
        game.createComputerMove()
        const board = game.getState()

        const userCount = board.reduce((result, row) => {
            return row.reduce((count, el) => {
                return el === userMoveSymbol ? ++count : count
            }, result)
        }, 0)

        const computerCount = board.reduce((result, row) => {
            return row.reduce((count, el) => {
                return el === computerMoveSymbol ? ++count : count
            }, result)
        }, 0)

        expect(userCount).to.equal(8)
        expect(computerCount).to.equal(1)
        expect(board[2][2]).to.equal(computerMoveSymbol)
    })

    it('Computer moves in cell that is not taken', () => {
        fillCells(game, { x: 2, y: 2 })

        game.createComputerMove()
        const board = game.getState()

        expect(count(board, userMoveSymbol)).to.equal(8)
        expect(count(board, computerMoveSymbol)).to.equal(1)
        expect(board[2][2]).to.equal(computerMoveSymbol)
    })

    it('If there are no free cells computer throws an exception', () => {
        // fill all the cells
        for (let i = 0; i < 3; ++i) {
            for (let j = 0; j < 3; ++j) {
                game.acceptUserMove(i, j)
            }
        }

        fillCells(game)

        const func = game.createComputerMove.bind(game)
        expect(func).to.throw('no cells available')
    })

    it('Checks if user won by horizontal', () => {
        game.acceptUserMove(0, 0)
        game.acceptUserMove(0, 1)
        game.acceptUserMove(0, 2)
        const userWon = game.isWinner(userName)

        expect(userWon).to.equal(true)
    })

})
