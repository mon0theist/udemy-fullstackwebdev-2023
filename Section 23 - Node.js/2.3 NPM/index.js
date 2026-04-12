// CJS
// var generateName = require("sillyname");

// ESM
import generateName from "sillyname";
import { randomSuperhero } from "superheroes";

var sillyName = generateName();
var superName = randomSuperhero();

console.log(`Hi, my name is ${sillyName}`);
console.log(`Greetings citizen, I am ${superName}`);
