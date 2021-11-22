import { expect } from 'chai';
import Game from '../src/Game';

const userMoveSymbol = '×'
const initialGameBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
]

let game
beforEach(() => { game = new Game() })

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
})

it('Throws an exception if user moves in taken cell', () => {
    const x = 2, y = 2

    game.acceptUserMove(x, y)
    const func = game.acceptUserMove.bind(game, x, y)

    expect(func).to.throw('cell is already taken')
})

it('Computer moves in top left cell', () => {
    game.createComputerMove()
    const board = game.getState()

    expect(board[0][0]).to.equal('o')
})
