import { add } from "../../index";

describe("Math operation", () => {
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
