export interface LimitedQueue<T> {
    push(elem: T): T | null;
    pop(): T | null;
    forEach(callback: (elem: T) => void): void;
    readonly length: number;
}

class LimitedQueueImpl<T> implements LimitedQueue<T> {
    private array: T[] = [];
    constructor(private maxElem: number) { }

    public get length() {
        return this.array.length;
    }

    push(elem: T) {
        this.array.push(elem);
        if(this.array.length > this.maxElem) {
            return this.array.shift() ?? null;
        }
        return null;
    }

    pop() {
        if(this.array.length > 0) {
            return this.array.shift() ?? null;
        }
        return null;
    }

    forEach(callback: (elem: T) => void): void {
        for(let i = 0; i < this.array.length; i++) {
            callback(this.array[i])
        }
    }
}

export function createLimitedQueue<T>(maxElem: number) {
    return new LimitedQueueImpl<T>(maxElem);
}