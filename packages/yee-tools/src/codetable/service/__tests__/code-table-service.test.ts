/**
 * Tests for the optimized CodeTableService
 */

import { CodeTableService } from "../code-table-service";
import { StoreContext } from "../../../cache/store-context";

// Mock dependencies
jest.mock("../../../cache/store-context");
jest.mock("../../../fetch");
jest.mock("../../../config/config-provider");
jest.mock("../../../url/url-utils");

const mockStoreContext = StoreContext as jest.Mocked<typeof StoreContext>;
const mockAx = require("../../../fetch").ax;

describe("CodeTableService - Optimized Methods", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("buildCacheKey", () => {
    it("should build cache key without condition map", () => {
      // Access private method for testing
      const service = CodeTableService as any;
      const key = service.buildCacheKey(null, "USER_STATUS");
      expect(key).toBe("C_USER_STATUS");
    });

    it("should build cache key with empty condition map", () => {
      const service = CodeTableService as any;
      const key = service.buildCacheKey({}, "USER_STATUS");
      expect(key).toBe("C_USER_STATUS");
    });

    it("should build cache key with condition map", () => {
      const service = CodeTableService as any;
      const conditionMap = { departmentId: "123", status: "ACTIVE" };
      const key = service.buildCacheKey(conditionMap, "USER_LIST");
      expect(key).toBe('C_USER_LIST{"departmentId":"123","status":"ACTIVE"}');
    });
  });

  describe("handleCodeTableCaching", () => {
    it("should cache code tables successfully", async () => {
      const mockConfig = require("../../../config/config-provider").configer;
      mockConfig.getAll.mockReturnValue({});

      const mockCodeTables = [
        {
          BusinessCodeTable: { Name: "USER_STATUS" },
          BusinessCodeTableValueList: [
            { Id: "1", Description: "Active" },
            { Id: "2", Description: "Inactive" },
          ],
        },
      ];

      mockStoreContext.put.mockResolvedValue(true);

      const service = CodeTableService as any;
      await service.handleCodeTableCaching(mockCodeTables);

      expect(mockStoreContext.put).toHaveBeenCalledWith(
        "C_USER_STATUS",
        expect.any(String),
      );
    });

    it("should handle code tables without names gracefully", async () => {
      const mockConfig = require("../../../config/config-provider").configer;
      mockConfig.getAll.mockReturnValue({});

      const mockCodeTables = [
        {
          BusinessCodeTable: {}, // Missing Name
          BusinessCodeTableValueList: [],
        },
      ];

      const consoleSpy = jest.spyOn(console, "warn").mockImplementation();

      const service = CodeTableService as any;
      await service.handleCodeTableCaching(mockCodeTables);

      expect(consoleSpy).toHaveBeenCalledWith(
        "[yee-tools]",
        "Code table missing name:",
        expect.any(Object),
      );
      expect(mockStoreContext.put).not.toHaveBeenCalled();

      consoleSpy.mockRestore();
    });
  });

  describe("getCodeTableByNames", () => {
    it("should return empty array for empty input", async () => {
      const result = await CodeTableService.getCodeTableByNames([]);
      expect(result).toEqual([]);
    });

    it("should throw error for missing configuration", async () => {
      const mockConfig = require("../../../config/config-provider").configer;
      mockConfig.get.mockReturnValue(undefined);

      await expect(
        CodeTableService.getCodeTableByNames([{ CodeTableName: "TEST" }]),
      ).rejects.toThrow("Missing required configuration for code table APIs");
    });

    it("should load code tables successfully", async () => {
      // Mock configuration
      const mockConfig = require("../../../config/config-provider").configer;
      mockConfig.get.mockImplementation((path: string) => {
        if (path === "api.codetableList") return "codetables/definitions";
        if (path === "api.codetableVoList") return "codetables/dd/data";
        return undefined;
      });
      mockConfig.getAll.mockReturnValue({});

      // Mock URL utils
      const mockUrlUtils = require("../../../url/url-utils");
      mockUrlUtils.normalizeURL.mockImplementation((url: string) => url);

      // Mock API responses
      const mockDefinitions = [
        {
          Name: "USER_STATUS",
          ServiceName: "user-service",
        },
      ];

      const mockCodeTableData = [
        {
          BusinessCodeTable: { Name: "USER_STATUS" },
          BusinessCodeTableValueList: [{ Id: "1", Description: "Active" }],
        },
      ];

      mockAx.post
        .mockResolvedValueOnce(mockDefinitions) // First call for definitions
        .mockResolvedValueOnce(mockCodeTableData); // Second call for data

      mockStoreContext.put.mockResolvedValue(true);

      const requests = [{ CodeTableName: "USER_STATUS" }];
      const result = await CodeTableService.getCodeTableByNames(requests);

      expect(mockAx.post).toHaveBeenCalledTimes(2);
      expect(result.length).toBeGreaterThan(0);
    });

    it("should handle missing code table definitions", async () => {
      // Mock configuration
      const mockConfig = require("../../../config/config-provider").configer;
      mockConfig.get.mockImplementation((path: string) => {
        if (path === "api.codetableList") return "codetables/definitions";
        if (path === "api.codetableVoList") return "codetables/dd/data";
        return undefined;
      });
      mockConfig.getAll.mockReturnValue({});

      const mockUrlUtils = require("../../../url/url-utils");
      mockUrlUtils.normalizeURL.mockImplementation((url: string) => url);

      // Mock API response with missing definition
      const mockDefinitions = [
        null, // Missing definition
      ];

      mockAx.post.mockResolvedValueOnce(mockDefinitions);

      const consoleSpy = jest.spyOn(console, "warn").mockImplementation();

      const requests = [{ CodeTableName: "MISSING_TABLE" }];
      const result = await CodeTableService.getCodeTableByNames(requests);

      expect(consoleSpy).toHaveBeenCalledWith(
        "[yee-tools]",
        "Code tables not found in definitions:",
        ["MISSING_TABLE"],
      );
      expect(result).toEqual([]);

      consoleSpy.mockRestore();
    });
  });
});
