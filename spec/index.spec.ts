import "../index";

describe("useful object", () => {
    // `get` method
    it(`get should be defined`, () => {
        const obj: any = {};
        expect(obj["get"]).toBeDefined();
        expect(obj.get).toBeDefined();
        expect(typeof obj.get).toBe("function");
    });

    it(`get should return value`, () => {
        let obj = null;
        obj = {
            name: {
                firstName: "Avi",
                lastName: "Punes"
            }
        };
        const firstName = obj.get("name.firstName");
        expect(firstName).toBeDefined();
        expect(firstName).toEqual(obj.name.firstName);
    });

    it(`get shouldn't return non existing value`, () => {
        let obj = {
            name: {
                firstName: "Avi",
                lastName: "Punes"
            }
        };
        const lastName = obj.get("name.lastName.notExist.NotExist");
        expect(lastName).toBeUndefined();
    });

    // toPromise, toObservable methods
    it(`toPromise should be defined`, async () => {
        const obj: any = {};
        expect(obj["toPromise"]).toBeDefined();
        expect(obj.toPromise).toBeDefined();
        expect(typeof obj.toPromise).toBe("function");

        expect(await obj.toPromise()).toEqual(obj);
        expect((await obj.toPromise()) === obj).toBeTruthy();
        expect((await obj.toPromise()) === { name: "avi" }).toBeFalsy();
    });

    it(`toObservable should be defined`, async () => {
        const obj: any = {};
        expect(obj["toObservable"]).toBeDefined();
        expect(obj.toObservable).toBeDefined();
        expect(typeof obj.toObservable).toBe("function");

        obj.toObservable().subscribe((res: any) => {
            expect(res).toEqual(obj);
            expect(res === { name: "avi" }).toBeFalsy();
        });
    });
});
