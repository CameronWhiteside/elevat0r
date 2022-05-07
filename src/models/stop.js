export class Stop {
    constructor(type, level, direction) {
        this.type = type
        this.level = level
        this.direction = direction
        this.previous = null
        this.next = null
    }
}

export class StopList {
    constructor() {
        this.head = null
        this.length = 0;
        this.tail = this.head;
    }

    // Insert node at end of the list
    append(type, level, direction) {
        let newNode = new Stop(type, level, direction);
        if (!this.length) {
            this.head = newNode
            this.length = 1
            this.tail = this.head
        } else {
            this.tail.next = newNode;
            newNode.previous = this.tail;
            this.tail = newNode;
            this.length++;
        }
    }

    // Insert node at the start of the list
    prepend(type, level, direction) {
        let newNode = new Stop(type, level, direction);
        if (!this.length) {
            this.head = newNode
            this.length = 1
            this.tail = this.head
        } else {
            newNode.next = this.head;
            if (this.head) {
                this.head.previous = newNode;
            }
            this.head = newNode;
            this.length++;
        }
    }

    // Insert node at a given index
    insert(index, type, level, direction) {
        console.log('calling insert at index ', index)
        if (!Number.isInteger(index) || index < 0 || index > this.length + 1) {
            console.log(`Invalid index.`);
            return this;
        }

        // If index is 0, prepend
        if (index === 0) {
            this.prepend(type, level, direction);
            return this;
        }

        // If index is equal to this.length, append
        if (index === this.length) {
            this.append(type, level, direction);
            return this;
        }

        // Reach the node at that index
        let newNode = new Stop(type, level, direction);
        let previousNode = this.head;

        for (let i = 0; i < index - 1; i++) {
            previousNode = previousNode.next;
        }

        let nextNode = previousNode.next;

        newNode.next = nextNode;
        previousNode.next = newNode;
        newNode.previous = previousNode;
        if (!nextNode) nextNode = {}
        nextNode.previous = newNode;

        this.length++;
    }

    // Remove a node
    remove (index) {
        if (!Number.isInteger(index) || index < 0 || index > this.length) {
            console.log(`Invalid index.`);
            return this;
        }

        if (this.length === 1) {
            this.tail = null
            this.head = null
            this.length--
            return this
        }

        // Remove head
        if (index === 0) {
            this.length--;
            if (this.length <= 0) {
                this.tail = null
                this.head = null
                this.length = 0
            } else {
                console.log(this)
                this.head = this.head.next;
                this.head.previous = null;
            }
            return this;
        }

        // Remove tail
        if (index === this.length - 1) {
            this.tail = this.tail.previous;
            this.tail.next = null;
            this.length--;
            if (!this.length) {
                this.tail = null
                this.head = null
            }
            return this;
        }

        // Remove node at an index
        let previousNode = this.head;

        for (let i = 0; i < index - 1; i++) {
            previousNode = previousNode.next;
        }
        let deleteNode = previousNode.next;
        let nextNode = deleteNode.next;

        previousNode.next = nextNode;
        nextNode.previous = previousNode;

        this.length--;

        if (!this.length) {
            this.tail = null
            this.head = null
        }
        return this;
    }

    // resetPickups() {
    //     let previousNode = this.head;

    //     for (let i = 0; i < this.length - 1; i++) {
    //         previousNode = previousNode.next;
    //     }
    // }


}
