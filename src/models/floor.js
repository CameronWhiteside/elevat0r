import Button from './button.js'

export default class Floor {
    constructor(level) {
        this.level = level
        this.upButton = new Button(1)
        this.downButton = new Button(-1)
    }

    getButton(direction) {
        if (direction === 1) {
            return this.upButton
        } else {
            return this.downButton
        }
    }
}
