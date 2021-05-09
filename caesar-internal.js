const fs = require("fs");

/**
 * Check input arguments
 * @param {*} shift
 * @param {*} input
 * @param {*} output
 * @param {*} action
 */
const checkInputArgs = (shift, input, output, action) => {
  // check shift
  if (!shift) {
    console.log(`Error: shift nust be integer, passed "${shiftAsString}"`);
    process.exit(0);
  }

  // check input
  if (input) {
    // Check if the file exists in the current directory.
    fs.access(input, fs.constants.F_OK, (err) => {
      if (err) {
        console.log(`Error: ${input} "does not exist"`);
        process.exit(0);
      }
    });

    // Check if the file is readable.
    fs.access(input, fs.constants.R_OK, (err) => {
      if (err) {
        console.log(`Error: ${input} "is not readable"`);
        process.exit(0);
      }
    });
  }

  // check output
  if (output) {
    // Check if the file exists in the current directory.
    fs.access(output, fs.constants.F_OK, (err) => {
      if (err) {
        console.log(`Error: ${output} "does not exist"`);
        process.exit(0);
      }
    });

    // Check if the file is writable.
    fs.access(output, fs.constants.W_OK, (err) => {
      if (err) {
        console.log(`Error: ${output} "is not writable"`);
        process.exit(0);
      }
    });
  }

  // check action
  const actionIsCorrect =
    action &&
    (action.toUpperCase() == "ENCODE" || action.toUpperCase() == "DECODE")
      ? true
      : false;

  if (!actionIsCorrect) {
    console.log(
      `Error: action required and must be 'encode' or 'decode' , passed "${action}"`
    );
    process.exit(0);
  }
};

module.exports = { checkInputArgs };
