import { get } from "lodash";
import { Observable, of } from "rxjs";

declare global {
    interface Object {
        get(path: string, def?: any): any;
        getSafe<T, R>(fn: (obj: T) => R, def?: R): any;
        toObservable(): Observable<any>;
        toPromise(): Promise<any>;
    }

    interface Promise<T> {
        delay(ms: number): Promise<T>;
    }
}

Object.prototype.get = function(path: string, def?: any) {
    return get(this, path, def);
};

Object.prototype.getSafe = function take<T, R>(
    fn: (obj: T) => R,
    def?: R
): any {
    let returnValue = def;
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

Promise.prototype.delay = function(ms: number) {
    return new Promise(resolve => setTimeout(() => resolve(this), ms));
};
