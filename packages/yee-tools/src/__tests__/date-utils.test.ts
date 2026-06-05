import {
  getCurrentDateTime,
  formatStringToDate,
  formatToSubmitFormat,
  formatToViewFormat,
  add,
  subtract,
} from "../date/date-utils";

describe("Date Utils", () => {
  describe("getCurrentDateTime", () => {
    it("should return current date time in default format", () => {
      const result = getCurrentDateTime();
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);
    });

    it("should return current date time in custom format", () => {
      const result = getCurrentDateTime("YYYY-MM-DD");
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });

  describe("formatStringToDate", () => {
    it("should format string date to default format", () => {
      const result = formatStringToDate("2024-01-15", "YYYY-MM-DD");
      expect(result).toBe("2024-01-15 00:00:00");
    });

    it("should format string date to custom format", () => {
      const result = formatStringToDate(
        "2024-01-15",
        "YYYY-MM-DD",
        "YYYY-MM-DD",
      );
      expect(result).toBe("2024-01-15");
    });
  });

  describe("formatToSubmitFormat", () => {
    it("should format Date object to submit format", () => {
      const date = new Date("2024-01-15T14:30:00");
      const result = formatToSubmitFormat(date);
      expect(result).toMatch(/^2024-01-15 \d{2}:\d{2}:\d{2}$/);
    });

    it("should return null for null/undefined", () => {
      expect(formatToSubmitFormat(null)).toBeNull();
      expect(formatToSubmitFormat(undefined)).toBeNull();
    });

    it("should format Date object to custom format", () => {
      const date = new Date("2024-01-15T14:30:00");
      const result = formatToSubmitFormat(date, "YYYY-MM-DD");
      expect(result).toBe("2024-01-15");
    });
  });

  describe("formatToViewFormat", () => {
    it("should format Date object to view format", () => {
      const date = new Date("2024-01-15T14:30:00");
      const result = formatToViewFormat(date);
      expect(result).toMatch(/^2024-01-15 \d{2}:\d{2}:\d{2}$/);
    });

    it("should return null for null/undefined", () => {
      expect(formatToViewFormat(null)).toBeNull();
      expect(formatToViewFormat(undefined)).toBeNull();
    });
  });

  describe("add", () => {
    it("should add days to a date", () => {
      const result = add("2024-01-15", 1, "day");
      expect(result).toBe("2024-01-16 00:00:00");
    });

    it("should add months to a date", () => {
      const result = add("2024-01-15", 2, "months", "YYYY-MM-DD");
      expect(result).toBe("2024-03-15");
    });

    it("should add years to a date", () => {
      const result = add("2024-01-15", 1, "year", "YYYY-MM-DD");
      expect(result).toBe("2025-01-15");
    });

    it("should add hours to a date", () => {
      const result = add("2024-01-15 10:00:00", 2, "hours");
      expect(result).toBe("2024-01-15 12:00:00");
    });
  });

  describe("subtract", () => {
    it("should subtract days from a date", () => {
      const result = subtract("2024-01-15", 1, "day");
      expect(result).toBe("2024-01-14 00:00:00");
    });

    it("should subtract months from a date", () => {
      const result = subtract("2024-03-15", 2, "months", "YYYY-MM-DD");
      expect(result).toBe("2024-01-15");
    });

    it("should subtract years from a date", () => {
      const result = subtract("2024-01-15", 1, "year", "YYYY-MM-DD");
      expect(result).toBe("2023-01-15");
    });

    it("should subtract hours from a date", () => {
      const result = subtract("2024-01-15 12:00:00", 2, "hours");
      expect(result).toBe("2024-01-15 10:00:00");
    });
  });
});
