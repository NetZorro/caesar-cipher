const { Command } = require("commander");

const program = new Command();
const caesarCipher = require("./caesar-cipher.js");

program
  .option("-s, --shift <number>", "a shift")
  .option("-i, --input <path>", "an input file")
  .option("-a, --action <type>", "an action encode/decode");

program.parse(process.argv);

const options = program.opts();

//console.log(options.shift);

console.log(caesarCipher.encode("Z", -1));
