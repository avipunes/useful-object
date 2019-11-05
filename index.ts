import { get } from "lodash";
import { Observable, of } from "rxjs";

declare global {
    interface Object {
        /**
         * @category Object
         * @param path The path of the property to get.
         * @param defaultValue optional, the value returned if the resolved value is undefined.
         * @return Returns the resolved value.
         */
        get(path: string, defaultValue?: any): any;

        /**
         * @category Object
         * @param fn function that return the required property path.
         * @param defaultValue optional, the value returned if the resolved value is undefined.
         * @return Returns the resolved value.
         */
        getSafe<T, R>(fn: (obj: T) => R, defaultValue?: R): any;

        /**
         * @category Object
         * @returns an Observable of the object.
         */
        toObservable(): Observable<any>;

        /**
         * @category Object
         * @returns a Promise of the object.
         */
        toPromise(): Promise<any>;
    }
    interface Promise<T> {
        /**
         * @category Promise
         * delays an expected promise
         * @return the original promise.
         */
        delay(milliseconds: number): Promise<T>;
    }

    interface Array<T> {
        /**
         * @category Array
         * @param subsetPattern - `StartIndex..EndIndex`
         * @returns A subset of a given array with provided pattern `StartIndex..EndIndex`.
         * Both start and end indexes are specified as "*".
         * Start index as "*" means the beginning of the array.
         * End index as "*" means the end of the array.
         *
         * @example
         *
         * const array = [1, 50, 3, 10];
         * array.subset("0..1") // [1, 50]
         * array.subset("*..1") // [1, 50]
         * array.subset("1..2") // [50, 3]
         * array.subset("2..*") // [3, 10]
         * array.subset("*..*") // [1, 50, 3, 10]
         */
        subset(subsetPattern: string): Array<T>;
    }
}

Object.prototype.get = function(path: string, defaultValue?: any) {
    return get(this, path, defaultValue);
};

Object.prototype.getSafe = function take<T, R>(
    fn: (obj: T) => R,
    defaultValue?: R
): any {
    let returnValue = defaultValue;
    try {
        returnValue = fn(this as T);
    } catch (error) {}

    return returnValue;
};

Object.prototype.toObservable = function() {
    return of(this);
};

Object.prototype.toPromise = function() {
    return new Promise(resolve => resolve(this));
};

Promise.prototype.delay = function(milliseconds: number) {
    return new Promise(resolve =>
        setTimeout(() => resolve(this), milliseconds)
    );
};

Array.prototype.subset = function subset(subsetPattern: string): Array<T> {
    try {
        const expression = /([\d|\.|\*]+)(\.{2})([\d|\.|\*]+)/;
        const regexRes = subsetPattern.match(expression);

        if (!regexRes || !regexRes[1] || !regexRes[3]) {
            return [];
        }

        const [from, to] = [
            regexRes[1] === "*" ? 0 : Math.round(+regexRes[1]),
            regexRes[3] === "*" ? undefined : Math.round(+regexRes[3] + 1)
        ];

        return this.slice(from, to);
    } catch (error) {
        return [];
    }
};
