import { Request } from "./request.js";
export default class Button {
    constructor(direction) {
        this.direction = direction;
        this.active = false;
        this.lastActivated = Date.now()
    }

    activate() {
        if (!this.active) {
            this.lastActivated = Date.now()
        }

        this.active = true
    }

    deactivate() {
        this.active = false
    }
}
