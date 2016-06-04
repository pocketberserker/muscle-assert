import muscle from "../src/muscle-assert";
import assert from "assert";

describe("muscle-assert", function() {
  beforeEach(function () {
    this.assertMessage = function (body, expected) {
      try {
        body();
        assert.fail(undefined, expected, "AssertionError should be thrown", undefined);
      } catch (e) {
        assert(e.message === expected);
      }
    };
  });

  it("should dump object", function() {
    const expected = {
      name: "foo"
    };
    const actual = {
      name: "bar"
    };
    this.assertMessage(function () {
      muscle.deepStrictEqual(actual, expected);
    }, `

path: .name
  expected: "foo"
  actual:   "bar"`);
  });

  it("should dump array", function() {
    const expected = ["foo"];
    const actual = ["bar"];
    this.assertMessage(function () {
      muscle.deepStrictEqual(actual, expected);
    }, `

path: .[0]
  expected: "foo"
  actual:   "bar"`);
  });

  it("should dump nested object", function() {
    const expected = {
      contact: {
        phoneNumber: "0123456789"
      }
    };
    const actual = {
      contact: {
        phoneNumber: "9876543210"
      }
    };
    this.assertMessage(function () {
      muscle.deepStrictEqual(actual, expected);
    }, `

path: .contact.phoneNumber
  expected: "0123456789"
  actual:   "9876543210"`);
  });

  it("should dump nested array", function() {
    const expected = {
      elements: ["foo"]
    };
    const actual = {
      elements: ["bar"]
    };
    this.assertMessage(function () {
      muscle.deepStrictEqual(actual, expected);
    }, `

path: .elements.[0]
  expected: "foo"
  actual:   "bar"`);
  });

  it("should dump a newly added element", function() {
    const expected = {
      elements: []
    };
    const actual = {
      elements: ["foo"]
    };
    this.assertMessage(function () {
      muscle.deepStrictEqual(actual, expected);
    }, `

path: .elements.[0]
  actual: "foo"`);
  });

  it("should dump deleted element", function() {
    const expected = {
      elements: ["foo"]
    };
    const actual = {
      elements: []
    };
    this.assertMessage(function () {
      muscle.deepStrictEqual(actual, expected);
    }, `

path: .elements.[0]
  expected: "foo"`);
  });

  it("should dump a newly added other type element", function() {
    const expected = {
      elements: ["foo"]
    };
    const actual = {
      elements: ["foo", {name: "bar"}]
    };
    this.assertMessage(function () {
      muscle.deepStrictEqual(actual, expected);
    }, `

path: .elements.[1]
  actual: Object{name:"bar"}`);
  });

  it("should dump a newly added property", function() {
    const expected = {};
    const actual = {
      name: "bar"
    };
    this.assertMessage(function () {
      muscle.deepStrictEqual(actual, expected);
    }, `

path: .name
  actual: "bar"`);
  });

  it("should dump deleted object", function() {
    const expected = {
      name: "foo"
    };
    const actual = {};
    this.assertMessage(function () {
      muscle.deepStrictEqual(actual, expected);
    }, `

path: .name
  expected: "foo"`);
  });

  it("should dump strict diff", function() {
    const expected = {
      my_number: 0
    };
    const actual = {
      my_number: "0"
    };
    this.assertMessage(function () {
      muscle.deepStrictEqual(actual, expected);
    }, `

path: .my_number
  expected: 0
  actual:   "0"`);
  });
});
