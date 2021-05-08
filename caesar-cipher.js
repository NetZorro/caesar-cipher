const alphabetSize = 26;
const letterFirstCharIndex = 97;
const letterLastCharIndex = 122;
const upperFirstCharIndex = 65;
const upperLastCharIndex = 90;

/**
 * Encode input text
 * @returns encoded text
 */
const encode = (text, shift) => {
  if (!text) {
    return text;
  }

  text = text.trim();

  let result = "";

  [...text].forEach((char) => {
    const isUpper = char === char.toUpperCase();

    const firstCharIndex = isUpper ? upperFirstCharIndex : letterFirstCharIndex;

    const charCode = char.charCodeAt(0);

    const isAlphabetChar =
      (charCode >= letterFirstCharIndex && charCode <= letterLastCharIndex) ||
      (charCode >= upperFirstCharIndex && charCode <= upperLastCharIndex);

    if (isAlphabetChar) {
      let newCharIndex =
        ((charCode + shift - firstCharIndex) % alphabetSize) + firstCharIndex;

      if (newCharIndex < firstCharIndex) {
        // case when index less first char's index
        newCharIndex =
          firstCharIndex + alphabetSize - (firstCharIndex - newCharIndex);
      }

      let ch = String.fromCharCode(newCharIndex);
      result += ch;
    } else {
      result += char;
    }
  });

  return result;
};

module.exports = { encode };
