import { expect } from "chai";
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