replacer = require("./Replacer");

// Every instance of apple turns into duck
// Every instance orange turns into dog
const from = ["apple", "orange"];
const to = ["duck", "dog"];

replacer("./TestData", from, to);
