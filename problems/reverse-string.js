module.exports = function reverseString(string) {
  if (typeof string !== "string") {
    throw new TypeError();
  }
  let newStr = "";

  for (let i = string.length - 1; i >= 0; i--) {
    newStr += string[i];
  }
  return newStr;
};
