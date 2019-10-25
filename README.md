# Useful Object

Typescript util to add useful methods to global Object type.

## Installation

```sh
npm install useful-object --save
```

## Usage

```typescript
import "useful-object"; // 16 KB

....

const obj: any = {
    name: {
        firstName: "Avi",
        lastName: "Punes"
    }
};

obj.get("name.firstName"); // return "Avi"
```

## Need type safety?

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

const firstName: string = obj.getSafe<MyInterface, string>(obj => obj.name.firstName); // Avi
const lastName: string = obj.getSafe((obj: MyInterface) => obj.name.lastName); // Punes
```

## Test

```sh
npm test
```
