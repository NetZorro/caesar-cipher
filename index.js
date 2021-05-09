const program = new Command();
const fs = require("fs");
const { Command } = require("commander");
const { pipeline } = require("stream");
const { CaesarTransformStream } = require("./streams");
const { checkInputArgs } = require("./caesar-internal");

program
  .option("-s, --shift <number>", "a shift")
  .option("-i, --input <path>", "an input file")
  .option("-o, --output <path>", "an output file")
  .option("-a, --action <type>", "an action encode/decode");

program.parse(process.argv);

const { shift: shiftAsString, input, output, action } = program.opts();

const shift = parseInt(shiftAsString, 10);

checkInputArgs(shift, input, output, action);

const readStream = input
  ? fs.createReadStream(input, { encoding: "utf8" })
  : process.stdin;

const writeStream = output
  ? fs.createWriteStream(output, { flags: "a" })
  : process.stdout;

const transformStream = new CaesarTransformStream(shift, action);

pipeline(readStream, transformStream, writeStream, (err) => {
  if (err) {
    process.stderr.write("error");
  }
});
