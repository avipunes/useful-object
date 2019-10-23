import { get } from "lodash";
import { Observable, of } from "rxjs";

declare global {
    interface Object {
        get(path: string, def?: any): any;
        toObservable(): Observable<any>;
        toPromise(): Promise<any>;
    }
}

Object.prototype.get = function(path: string, def?: any) {
    return get(this, path, def);
};

Object.prototype.toObservable = function() {
    return of(this);
};

Object.prototype.toPromise = function() {
    return new Promise(resolve => resolve(this));
};
