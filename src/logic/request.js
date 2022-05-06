export class Request {
    constructor(floor, button) {
        this.floor = floor;
        this.button = button;
        this.time = Date.now();
    }
}

export class DropOff {
    constructor(floor) {
        this.floor = floor;
        this.time = Date.now();
    }
 }
