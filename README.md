## RecursiveReplace

Looks for every file in a specified directory and all subdirectories, and replaces a set of strings with another set of strings.

#### How To Use

```javascript
const replacer = require("./Replacer");
// Every instance of apple turns into duck
// Every instance orange turns into dog
const from = ["apple", "orange"];
const to = ["duck", "dog"];
replacer("./TestData", from, to);
```
