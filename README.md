# Useful Object

Typescript util to add useful methods to global Object type.

## Installation

```sh
npm install useful-object --save
```

## Usage

```sh
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

## Test

```sh
npm test
```
