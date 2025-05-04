import { add, subtract, multiply, divide } from "../../index";

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

describe("Multiply operation", () => {
  it("should multiply numbers 1 and 2 correctly", () => {
    expect(multiply(1, 2)).toEqual(2);
  });

  it("should multiply numbers -2 and -2 correctly", () => {
    expect(multiply(-2, -2)).toEqual(4);
  });

  it("should multiply numbers -2 and 5 correctly", () => {
    expect(multiply(-2, 5)).toEqual(-10);
  });

  it("should multiply numbers 0.5 and 5 correctly", () => {
    expect(multiply(0.5, 5)).toEqual(2.5);
  });

  it("should multiply numbers 0.5 and 0.5 correctly", () => {
    expect(multiply(0.5, 0.5)).toEqual(0.25);
  });
});

describe("Divide operation", () => {
  it("should divide numbers 10 and 2 correctly", () => {
    expect(divide(10, 2)).toEqual(5);
  });

  it("should divide numbers 5 and 2 correctly", () => {
    expect(divide(5, 2)).toEqual(2.5);
  });

  it("should divide numbers -10 and 2 correctly", () => {
    expect(divide(-10, 2)).toEqual(-5);
  });

  it("should divide numbers 5.5 and 1.1 correctly", () => {
    expect(divide(5.5, 1.1)).toEqual(5);
  });
});
