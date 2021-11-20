import { expect } from "chai";

describe('Game', () => {
    it('Should return emty game board', () => {
        const game = new Game()
        const board = game.getState()

        expect(board).to.deep.equal([
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ])
    })
})


class Game {
    getState() {
        return null
    }
}