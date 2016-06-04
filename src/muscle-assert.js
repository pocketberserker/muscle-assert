"use strict";
import baseAssert from "assert";
const _deepEqual = require("universal-deep-strict-equal");
const diff = require("deep-diff").diff;
const stringify = require("stringifier").stringify;

baseAssert.deepStrictEqual = function deepStrictEqual (actual, expected, message) {
  if (!_deepEqual(actual, expected, true)) {
    const differences = diff(expected, actual);
    baseAssert.fail(actual, expected, format(message, differences), "deepStrictEqual", deepStrictEqual);
  }
};

function format (message, differences) {
  if (differences === undefined) {
    return messages;
  }
  let text = message ? message + "\n" : "\n";
  for (let diff of differences) {
    text += "\npath: ";
    for (let p of diff.path) {
      text += (typeof p === "number") ? `.[${p}]` : `.${p}`;
    }
    switch(diff.kind) {
    case 'A':
      let indexPath = diff.index !== undefined ? `.[${diff.index}]` : "";
      switch(diff.item.kind) {
      case 'N':
        text += `${indexPath}\n  actual: ${stringify(diff.item.rhs)}`;
        break;
      case 'D':
        text += `${indexPath}\n  expected: ${stringify(diff.item.lhs)}`;
        break;
      }
      break;
    case 'N':
      text += `\n  actual: ${stringify(diff.rhs)}`;
      break;
    case 'D':
      text += `\n  expected: ${stringify(diff.lhs)}`;
      break;
    case 'E':
      text += `\n  expected: ${stringify(diff.lhs)}\n  actual:   ${stringify(diff.rhs)}`;
      break;
    }
  }
  return text;
}

module.exports = baseAssert;
