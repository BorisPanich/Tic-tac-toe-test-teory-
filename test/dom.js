import { expect } from 'chai'
import jsdom from 'jsdom'
import Game from '../src/Game'

const createInstance = () => new DomController('#root')

const { JSDOM } = jsdom
const dom = new JSDOM('<html><body id="root"></body></html>')

global.window = dom.window
global.document = dom.window.document

afterEach(() => {
    document.body.innerHTML = ''
})

describe('DOM controller', () => {
    it('Creates empty table', () => {
        const domController = createInstance()

        domController.createTable()

        expect(document.querySelectorAll('table').length).to.equal(1)
    })

    it('Creates table with 3 rows and 3 columns', () => {
        const domController = createInstance()

        domController.createTable(3, 3)

        expect(document.querySelectorAll('table').length).to.equal(1)
        expect(document.querySelectorAll('tr').length).to.equal(3)
        expect(document.querySelectorAll('td').length).to.equal(9)
    })

})


class DomController {
    constructor(root) {
        this.rootNode = document.querySelector(root)
    }

    createTable() {
        const child = document.createElement('table')
        this.rootNode.appendChild(child)
    }
}