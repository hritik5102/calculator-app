import { add, subtract } from "../../index";

describe("Add operation", () => {
  it("should add numbers 1 and 2 correctly", () => {
    expect(add(1, 2)).toEqual(3);
  });

  it("should add numbers -1 and -2 correctly", () => {
    expect(add(-1, -2)).toEqual(-3);
  });

  it("should add numbers -1 and 2 correctly", () => {
    expect(add(-1, 2)).toEqual(1);
  });

  it("should add numbers 1 and -2 correctly", () => {
    expect(add(1, -2)).toEqual(-1);
  });
});

describe("Subtract operation", () => {
  it("should subtract numbers 1 and 2 correctly", () => {
    expect(subtract(1, 2)).toEqual(-1);
  });

  it("should subtract numbers -1 and -2 correctly", () => {
    expect(subtract(-1, -2)).toEqual(1);
  });

  it("should subtract numbers -1 and 2 correctly", () => {
    expect(subtract(-1, 2)).toEqual(-3);
  });

  it("should subtract numbers 1 and -2 correctly", () => {
    expect(subtract(1, -2)).toEqual(3);
  });
});
