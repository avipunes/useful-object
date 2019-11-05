# Useful Object

Typescript util to add useful methods to global Object type.

## Installation

```sh
npm install useful-object --save
```

## Usage

---

### Object

#### get

```typescript
import "useful-object"; // 49.8K (gzipped: 11.8K)

....

const obj: any = {
    name: {
        firstName: "Avi",
        lastName: "Punes"
    }
};

obj.get("name.firstName"); // return "Avi"
```

#### Need type safety? use getSafe

```typescript
interface MyInterface {
    name: {
        firstName: string;
        lastName: string;
    };
}

const obj: MyInterface = {
    name: {
        firstName: "Avi",
        lastName: "Punes"
    }
};

const firstName: string = obj.getSafe<MyInterface, string>(
    obj => obj.name.firstName
); // Avi
const lastName: string = obj.getSafe((obj: MyInterface) => obj.name.lastName); // Punes
```

#### toPromise

```typescript
const firstName: string = await obj.get("name.firstName").toPromise(); // Avi
```

#### toObservable

```typescript
obj.get("name.firstName")
    .toObservable()
    .subscribe((firstName: string) => console.log(firstName)); // logs Avi
```

---

### Promise

#### delay

```typescript
const firstName: string = await obj
    .get("name.firstName")
    .toPromise()
    .delay(1000); // Avi after one second
```

---

### Array

#### subset

```typescript
const array = [1, 50, 3, 10];
array.subset("0..1"); // [1, 50]
array.subset("*..1"); // [1, 50]
array.subset("1..2"); // [50, 3]
array.subset("2..*"); // [3, 10]
array.subset("*..*"); // [1, 50, 3, 10]
```

---

## Test

```sh
npm test
```
