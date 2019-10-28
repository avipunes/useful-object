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

    it(`getSafe should value`, () => {
        interface MyInterface {
            name: {
                firstName: string;
                lastName: string;
            };
        }

        let obj: MyInterface = {
            name: {
                firstName: "Avi",
                lastName: "Punes"
            }
        };
        const firstName: string = obj.getSafe<MyInterface, string>(
            obj => obj.name.firstName
        );
        const lastName: string = obj.getSafe(
            (obj: MyInterface) => obj.name.lastName
        );
        expect(firstName).toEqual(obj.name.firstName);
        expect(lastName).toEqual(obj.name.lastName);
    });

    // toPromise, toObservable methods
    it(`toPromise should be defined and return a promise`, async () => {
        const obj = {};

        expect(obj["toPromise"]).toBeDefined();
        expect(obj.toPromise).toBeDefined();
        expect(typeof obj.toPromise).toBe("function");

        expect(await obj.toPromise()).toEqual(obj);
        expect((await obj.toPromise()) === obj).toBeTruthy();
        expect((await obj.toPromise()) === { name: "avi" }).toBeFalsy();
        expect(await { name: "avi" }.get("name").toPromise()).toEqual("avi");
    });

    it(`Promise.delay be defined and delay x milliseconds`, async () => {
        const start = Date.now();
        await new Object().toPromise().delay(1000);
        expect(Date.now() - start).toBeGreaterThanOrEqual(1000);
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

        interface MyInterface {
            name: {
                firstName: string;
                lastName?: string;
            };
        }

        const myInterface: MyInterface = {
            name: {
                firstName: "Avi"
            }
        };

        myInterface
            .getSafe((myInterface: MyInterface) => myInterface.name.firstName)
            .toObservable()
            .subscribe((firstName: string) => {
                expect(firstName).toEqual(myInterface.name.firstName);
            });
    });
});
