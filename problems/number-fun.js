function returnsThree() {
  return 3;
}

function reciprocal(n) {
  if (typeof n !== "number") {
    throw new ReferenceError();
  }
  if (n < 1 || n > 1000000) {
    throw new RangeError();
  }
  return 1 / n;
}

module.exports = {
  returnsThree,
  reciprocal,
};
