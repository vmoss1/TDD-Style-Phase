const chai = require("chai");
const expect = chai.expect;
const { returnsThree, reciprocal } = require("../problems/number-fun");

describe("returnsThree()", () => {
  it("should return 3", () => {
    expect(returnsThree()).to.equal(3);
    expect(returnsThree(5)).to.equal(3);
  });
});

describe("reciprocal()", () => {
  it("should throw error for invalid input", () => {
    expect(() => reciprocal(-1)).to.throw(RangeError);
    expect(() => reciprocal("hello")).to.throw(ReferenceError);
    expect(() => reciprocal(1000001)).to.throw(RangeError);
  });
  it("should return reciprocal of a number", () => {
    expect(reciprocal(1)).to.equal(1);
    expect(reciprocal(5)).to.equal(1 / 5);
    expect(reciprocal(34)).to.equal(1 / 34);
  });
});
