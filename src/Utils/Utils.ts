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

export function colorAverage(color1: string, color2: string, weight1: number = 1, weight2: number = 1) {
    const c1 = colorFromString(color1);
    const c2 = colorFromString(color2);
    if(c1 == null || c2 == null) {
        return null;
    }
    const w1Norm = weight1/(weight1+weight2);
    const w2Norm = weight2/(weight1+weight2);
    const red = Math.round(Math.sqrt((w1Norm*c1.r**2+w2Norm*c2.r**2)))
    const green = Math.round(Math.sqrt((w1Norm*c1.g**2+w2Norm*c2.g**2)))
    const blue  = Math.round(Math.sqrt((w1Norm*c1.b**2+w2Norm*c2.b**2)))
    return "#" + red.toString(16) + green.toString(16) + blue.toString(16);
}

function colorFromString(color: string): {r: number, g: number, b: number} | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
}

export function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}