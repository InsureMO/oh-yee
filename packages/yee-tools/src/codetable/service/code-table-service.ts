/**
 * CodeTable service for data fetching and processing
 * @module code-table-service
 */

import { configer } from "../../config/config-provider";
import { getCodeTableConfig } from "../config/code-table-config";
import { CodeTableConstant } from "../constant/code-table-constant";
import { SessionContext } from "../../cache/session-context";
import { StoreContext } from "../../cache/store-context";
import * as UrlUtils from "../../url/url-utils";
import { ax } from "../../fetch";
import { warn } from "../../common/logger";
import type {
  CodeTableParams,
  BusinessCodeTable,
  CodeTableValue,
} from "../types";

/**
 * CodeTable service for handling data operations
 */
class CodeTableServiceClass {
  /**
   * Fetch code table data from server
   * @param params - Request parameters
   * @returns Promise that resolves to code table data
   * @throws {Error} When the API request fails
   */
  async getCodeTable(params: CodeTableParams): Promise<BusinessCodeTable> {
    const config = getCodeTableConfig();
    const {
      CodeTableId,
      ConditionMap,
      CodeTableName,
      CodeTableUrl,
      IncludedValueList,
      KeyWord,
    } = params;

    let url: string;
    let requestData: any;
    let method: "GET" | "POST" = "POST";

    if (CodeTableId && ConditionMap) {
      url = config.getCodeTableByConditionUrl;
      requestData = { CodeTableId, ConditionMap };
    } else if (CodeTableId) {
      url = config.getCodeTableByIdUrl;
      requestData = { CodeTableId };
      method = "GET";
    } else if (CodeTableUrl) {
      url = CodeTableUrl.url;
      requestData = CodeTableUrl.param || {};
    } else {
      url = config.getCodeTableByNameUrl;
      requestData = {
        CodeTableName,
        ConditionMap,
        LangId: "",
        IncludedValueList,
        KeyWord,
      };
    }

    const response = await ax.request({
        url,
        method,
        data: method === "POST" ? requestData : undefined,
        params: method === "GET" ? requestData : undefined,
      });

      return response;
  }

  /**
   * Fetch multiple code tables by names
   * @param codeTableNames - Array of code table names
   * @returns Promise that resolves to code table data
   * @throws {Error} When codeTableNames is empty or the API request fails
   */
  async codeTableNames(codeTableNames: string[]): Promise<any> {
    if (!codeTableNames || codeTableNames.length === 0) {
      throw new Error("Code table names are required");
    }

    const config = getCodeTableConfig();

    const response = await ax.post(
      config.getCodeTablesByNameUrl,
      codeTableNames,
    );
    return response;
  }

  /**
   * Build and process code table data
   * @param codes - Raw code table data
   * @returns Processed code table data
   */
  buildCodeTable(codes: BusinessCodeTable): BusinessCodeTable {
    const config = getCodeTableConfig();
    const codeTableKeyValue = config.codeTableKeyValue;

    if (
      !codes.BusinessCodeTableValueList ||
      codes.BusinessCodeTableValueList.length === 0
    ) {
      codes.BusinessCodeTableValueList = [];
    } else {
      // Transform code table values to standard format
      codes.BusinessCodeTableValueList = codes.BusinessCodeTableValueList.map(
        (code: CodeTableValue) => {
          const result: CodeTableValue = {};

          for (const key in code) {
            if (key === CodeTableConstant.CODE_TABLE_ID) {
              result[codeTableKeyValue.KEY] = code[key];
            } else if (key === CodeTableConstant.CODE_TABLE_DESCRIPTION) {
              result[codeTableKeyValue.VALUE] = code[key];
            } else {
              result[key] = code[key];
            }
          }

          return result;
        },
      );

      // Filter by status if status code list exists
      const statusCodeList = SessionContext.get<string[]>("__CODETABLE_STATUS");
      if (statusCodeList && Array.isArray(statusCodeList)) {
        codes.BusinessCodeTableValueList =
          codes.BusinessCodeTableValueList.filter((code: CodeTableValue) => {
            if (!code.Status) {
              return true;
            }

            return statusCodeList.includes(code.Status);
          });
      }
    }

    return codes;
  }

  /**
   * Sort code table data
   * @param codes - Code table data to sort
   * @param sorter - Sorting function
   * @returns Sorted code table data
   */
  sortCodeTable(
    codes: BusinessCodeTable,
    sorter?: { sort: (list: any[]) => void },
  ): BusinessCodeTable {
    if (sorter && sorter.sort) {
      sorter.sort(codes.BusinessCodeTableValueList);
    }
    return codes;
  }

  // -------------- Optimized methods start ----------------------------

  /**
   * Build cache key for code table with condition map
   * @param conditionMap - Condition parameters for the code table
   * @param codeTableName - Name of the code table
   * @returns Cache key string
   */
  private buildCacheKey(
    conditionMap: Record<string, any> | null,
    codeTableName: string,
  ): string {
    if (!conditionMap || Object.keys(conditionMap).length === 0) {
      return `C_${codeTableName}`;
    }

    const conditionStr = JSON.stringify(conditionMap);
    return `C_${codeTableName}${conditionStr === "{}" ? "" : conditionStr}`;
  }

  /**
   * Handle and cache code table data
   * @param codetables - Array of code table data
   * @returns Promise that resolves when all code tables are cached
   */
  private async handleCodeTableCaching(
    codetables: BusinessCodeTable[],
  ): Promise<void> {
    const cachePromises = codetables.map(async (codetable) => {
      try {
        const businessCodeTable = codetable.BusinessCodeTable;
        if (!businessCodeTable?.Name) {
          warn("Code table missing name:", codetable);
          return;
        }

        const name = businessCodeTable.Name;
        const processedCodeTable = this.buildCodeTable(codetable);

        // Build cache key based on condition map
        const conditionMap = (codetable as any).ConditionMap || null;
        const cacheKey = this.buildCacheKey(conditionMap, name);

        await StoreContext.put(cacheKey, JSON.stringify(processedCodeTable));
      } catch (error) {
        warn("Failed to cache code table:", error);
      }
    });

    await Promise.all(cachePromises);
  }

  /**
   * Load code table data from service
   * @param url - Service URL
   * @param data - Request data
   * @returns Promise that resolves to code table data
   */
  private async loadCodeTableFromService(
    url: string,
    data: any,
  ): Promise<BusinessCodeTable[]> {
    const response = await ax.post(url, data);

    if (Array.isArray(response)) {
      await this.handleCodeTableCaching(response);
      return response;
    }

    warn(
      "Invalid response format from code table service:",
      response,
    );
    return [];
  }

  /**
   * Get code tables by names with optimized batch processing
   * @param codeTableRequests - Array of code table requests with names and conditions
   * @param isAsync - Whether to process asynchronously (default: true)
   * @returns Promise that resolves to loaded code table data
   */
  async getCodeTableByNames(
    codeTableRequests: Array<{
      CodeTableName: string;
      ConditionMap?: Record<string, any>;
    }>,
    isAsync: boolean = true, // eslint-disable-line @typescript-eslint/no-unused-vars
  ): Promise<BusinessCodeTable[]> {
    if (!codeTableRequests || codeTableRequests.length === 0) {
      return [];
    }

    const defineListApi = configer.get("api.codetableList");
    const defineVoListApi = configer.get("api.codetableVoList");

    if (!defineListApi || !defineVoListApi) {
      throw new Error("Missing required configuration for code table APIs");
    }

    const defineUrl = UrlUtils.normalizeURL(defineListApi);
    const ctListUrlTemplate = UrlUtils.normalizeURL(defineVoListApi);

    // Step 1: Get code table definitions
    const codeTableNames = codeTableRequests.map((req) => req.CodeTableName);
    const codeTableDefinitions = await ax.post(defineUrl, codeTableNames);

    if (!Array.isArray(codeTableDefinitions)) {
      throw new Error("Invalid response from code table definition service");
    }

    // Step 2: Group requests by service name
    const serviceGroups = new Map<
      string,
      Array<{
        CodeTableName: string;
        ConditionMap?: Record<string, any>;
      }>
    >();

    const missingCodeTables: string[] = [];

    codeTableDefinitions.forEach((definition, index) => {
      if (!definition?.Name || !definition?.ServiceName) {
        const missingName = codeTableNames[index];
        if (missingName) {
          missingCodeTables.push(missingName);
        }
        return;
      }

      const { Name, ServiceName } = definition;
      const originalRequest = codeTableRequests.find(
        (req) => req.CodeTableName === Name,
      );

      if (!serviceGroups.has(ServiceName)) {
        serviceGroups.set(ServiceName, []);
      }

      const requestItem = {
        CodeTableName: Name,
        ConditionMap:
          originalRequest?.ConditionMap || definition.ConditionMap,
      };

      serviceGroups.get(ServiceName)!.push(requestItem);
    });

    // Log missing code tables
    if (missingCodeTables.length > 0) {
      warn(
        "Code tables not found in definitions:",
        missingCodeTables,
      );
    }

    // Step 3: Load code tables from each service
    const loadPromises = Array.from(serviceGroups.entries()).map(
      async ([serviceName, requests]) => {
        if (requests.length === 0) {
          return [];
        }

        const serviceUrl = ctListUrlTemplate.replace(/dd/, serviceName);
        return this.loadCodeTableFromService(serviceUrl, requests);
      },
    );

    const results = await Promise.all(loadPromises);
    return results.flat();
  }

  // ---------- Optimized methods end --------------------------
}

/**
 * Singleton instance of CodeTableService
 */
export const CodeTableService = new CodeTableServiceClass();
export default CodeTableService;
