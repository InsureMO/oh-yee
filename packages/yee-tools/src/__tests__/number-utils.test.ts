import {
  add,
  subtract,
  multiply,
  divide,
  random,
} from "../number/number-utils";

describe("Number Utils", () => {
  describe("add", () => {
    it("should perform precise floating-point addition", () => {
      expect(add(0.1, 0.2)).toBe(0.3);
      expect(add(0.7, 0.1)).toBe(0.8);
      expect(add(1.5, 2.3)).toBe(3.8);
    });

    it("should handle integers", () => {
      expect(add(1, 2)).toBe(3);
      expect(add(100, 200)).toBe(300);
    });

    it("should handle negative numbers", () => {
      expect(add(-1, -2)).toBe(-3);
      expect(add(-0.1, 0.2)).toBe(0.1);
    });
  });

  describe("subtract", () => {
    it("should perform precise floating-point subtraction", () => {
      expect(subtract(0.3, 0.1)).toBeCloseTo(0.2, 10);
      expect(subtract(1.5, 0.3)).toBeCloseTo(1.2, 10);
    });

    it("should handle integers", () => {
      expect(subtract(5, 3)).toBe(2);
      expect(subtract(100, 50)).toBe(50);
    });

    it("should handle negative numbers", () => {
      expect(subtract(-1, -2)).toBe(1);
      expect(subtract(0.1, 0.2)).toBeCloseTo(-0.1, 10);
    });

    it("should return number type, not string", () => {
      expect(typeof subtract(5, 3)).toBe("number");
    });
  });

  describe("multiply", () => {
    it("should perform precise floating-point multiplication", () => {
      expect(multiply(0.1, 0.2)).toBe(0.02);
      expect(multiply(0.7, 0.1)).toBe(0.07);
      expect(multiply(1.5, 2)).toBe(3);
    });

    it("should handle integers", () => {
      expect(multiply(2, 3)).toBe(6);
      expect(multiply(10, 20)).toBe(200);
    });

    it("should handle scientific notation", () => {
      expect(multiply(1e-5, 2)).toBe(0.00002);
    });
  });

  describe("divide", () => {
    it("should perform precise floating-point division", () => {
      expect(divide(0.3, 0.1)).toBe(3);
      expect(divide(1.5, 0.3)).toBe(5);
    });

    it("should handle integers", () => {
      expect(divide(6, 2)).toBe(3);
      expect(divide(100, 4)).toBe(25);
    });

    it("should handle scientific notation", () => {
      expect(divide(1e-4, 2)).toBe(0.00005);
    });
  });

  describe("random", () => {
    it("should generate random integers within range", () => {
      for (let i = 0; i < 100; i++) {
        const result = random(1, 10);
        expect(result).toBeGreaterThanOrEqual(1);
        expect(result).toBeLessThanOrEqual(10);
        expect(Number.isInteger(result)).toBe(true);
      }
    });

    it("should handle single value range", () => {
      expect(random(5, 5)).toBe(5);
    });

    it("should handle negative ranges", () => {
      const result = random(-10, -5);
      expect(result).toBeGreaterThanOrEqual(-10);
      expect(result).toBeLessThanOrEqual(-5);
    });
  });
});
