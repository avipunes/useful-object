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

    /**
     * @category Promise
     * delays an expected promise
     * @return the original promise.
     */
    interface Promise<T> {
        delay(milliseconds: number): Promise<T>;
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
    return new Promise(resolve => setTimeout(() => resolve(this), milliseconds));
};
