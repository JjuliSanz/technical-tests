import { expect } from "chai";
import { describe, it } from "vitest";

const canReconfigure = (from, to) => {
  //  if (from === undefined) throw new Error('from is required')
  if (typeof from !== "string") throw new Error("from must be a string");
  if (typeof to !== "string") throw new Error("to must be a string");

  const isSameLength = from.length === to.length;
  if (!isSameLength) return false;

  const hasSameUniqueLetters = new Set(from).size === new Set(to).size;
  if (!hasSameUniqueLetters) return false;

  const transformations = {}
  for (let i = 0; i < from.length; i++) {
    const fromLetter = from[i]
    const toLetter = to[i]

    const storedLetter = transformations[fromLetter]
    if (storedLetter && storedLetter !== toLetter) return false

    transformations[fromLetter] = toLetter;
  }

  return true;
};

describe("canReconfigure", () => {
  // it('should be a function', () => {
  //   expect(canReconfigure).toBeTypeOf('function')
  // })

  it("should throw if first paramater is missing", () => {
    expect(() => canReconfigure()).toThrow();
  });

  it("should throw if first paramater is not a string", () => {
    expect(() => canReconfigure(2)).toThrow();
  });

  it("should throw if second paramater is not a string", () => {
    expect(() => canReconfigure("a")).toThrow();
  });

  it("should return a boolean", () => {
    expect(canReconfigure("a", "b")).toBeTypeOf("boolean");
  });

  it("should return false if strings provided have different length", () => {
    expect(canReconfigure("abc", "bd")).toBe(false);
  });

  it("should return false if strings provided have different length even with same unique letters", () => {
    expect(canReconfigure("aab", "ab")).toBe(false);
  });

  it("should return false if strings provided have different number of unique letters", () => {
    expect(canReconfigure("abc", "ddd")).toBe(false);
  });

  it("should return false if strings has different order of transformation", () => {
    expect(canReconfigure("XBOX", "XXBO")).toBe(false);
  });

  it("should return true if strings has same order of transformation", () => {
    expect(canReconfigure("XBOX", "XOBX")).toBe(true);
  });

});
