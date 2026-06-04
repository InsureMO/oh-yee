import { CodeTableService } from "../service/code-table-service";
import { SessionContext } from "../../cache/session-context";
import { StoreContext } from "../../cache/store-context";
import { LocalContext } from "../../cache/local-context";
import { getCodeTableConfig } from "../config/code-table-config";
import { ax } from "../../fetch";
import { warn } from "../../common/logger";

interface CodeTableParams {
  CodeTableId?: string | number;
  ConditionMap?: Record<string, any>;
  CodeTableName?: string;
  CodeTableUrl?: {
    url: string;
    param?: any;
    setting?: any;
  };
  IncludedValueList?: any[];
  KeyWord?: string;
}

interface CodeTableResult {
  codes: any[];
  common?: any[];
}

/**
 * Code table action class providing methods for fetching, caching, and managing code table data
 */
class CodeTableActionClass {
  /**
   * Sort object keys alphabetically
   * @param obj - The object to sort
   * @returns A new object with keys sorted alphabetically
   */
  private objKeySort(obj: Record<string, any>): Record<string, any> {
    const sortedKeys = Object.keys(obj).sort();
    const newObj: Record<string, any> = {};

    for (const key of sortedKeys) {
      newObj[key] = obj[key];
    }

    return newObj;
  }

  /**
   * Build a cache key from code table parameters
   * @param params - Code table request parameters
   * @returns A cache key string
   */
  buildKey(params: CodeTableParams): string {
    const { CodeTableName, ConditionMap, CodeTableUrl } = params;

    if (CodeTableUrl) {
      return encodeURI(CodeTableUrl.url);
    }

    if (ConditionMap) {
      const conditionStr =
        JSON.stringify(ConditionMap) === "{}"
          ? ""
          : JSON.stringify(ConditionMap);
      return `C_${CodeTableName}${conditionStr}`;
    }

    return `C_${CodeTableName}`;
  }

  /**
   * Check if a condition map contains empty values
   * @param conditionMap - The condition map to check
   * @returns true if any condition value is empty, false otherwise
   */
  checkConditionMap(conditionMap: Record<string, any>): boolean {
    const emptyKeys: string[] = [];

    Object.keys(conditionMap).forEach((key) => {
      if (!conditionMap[key]) {
        emptyKeys.push(key);
      }
    });

    return emptyKeys.length > 0;
  }

  /**
   * Get code table data with caching support
   *
   * @param params - Code table request parameters
   * @returns Promise resolving to code table data
   * @throws {Error} When code table request fails
   *
   * @example
   * ```ts
   * const result = await CodeTableAction.getCodeTable({
   *   CodeTableName: 'USER_STATUS'
   * });
   * console.log(result.codes); // Array of code table values
   * ```
   */
  async getCodeTable(params: CodeTableParams): Promise<CodeTableResult> {
    const { ConditionMap, CodeTableName, CodeTableUrl } = params;
    const config = getCodeTableConfig();

    let sortedConditionMap = ConditionMap;
    if (ConditionMap) {
      sortedConditionMap = this.objKeySort(ConditionMap);
    }

    const keyParams: CodeTableParams = {};
    if (sortedConditionMap) keyParams.ConditionMap = sortedConditionMap;
    if (CodeTableName) keyParams.CodeTableName = CodeTableName;
    if (CodeTableUrl) keyParams.CodeTableUrl = CodeTableUrl;

    const key = this.buildKey(keyParams);

    try {
      // Check cache first
      const cachedData = await StoreContext.get<any>(key);
      if (cachedData) {
        const codeTableObj = JSON.parse(cachedData);
        const returnData: CodeTableResult = {
          codes: codeTableObj.BusinessCodeTableValueList || [],
        };

        if (codeTableObj.common) {
          returnData.common = codeTableObj.common;
        }

        return returnData;
      }

      // Fetch from API if not cached
      if (CodeTableUrl) {
        const tmpCodeTable = await CodeTableService.getCodeTable(params);
        const userSign = tmpCodeTable.BusinessCodeTable?.UserSign;
        const needCache = tmpCodeTable.BusinessCodeTable?.NeedCache;
        const processedTable = CodeTableService.buildCodeTable(tmpCodeTable);

        delete processedTable.BusinessCodeTable;
        const codeTableObj: CodeTableResult = {
          codes: processedTable.BusinessCodeTableValueList || [],
        };

        if (needCache === "Y") {
          await StoreContext.put(key, JSON.stringify(processedTable));
        }

        return this._handlerUserCodetable(userSign, CodeTableName || "", codeTableObj);
      }

      if (config.defaultProject && CodeTableName) {
        const userInfo = SessionContext.get<any>("userInfo");
        const tenantCode = userInfo?.firmCode || "";

        let lang = "en";
        const i18nKey = LocalContext.get<string>("system_i18nKey");
        if (i18nKey) {
          if (i18nKey.includes("_")) {
            const parts = i18nKey.split("_");
            if (parts.length > 0 && parts[0]) {
              lang = parts[0];
            }
          } else if (i18nKey.includes("-")) {
            const parts = i18nKey.split("-");
            if (parts.length > 0 && parts[0]) {
              lang = parts[0];
            }
          }
        }

        const response = await ax.post(config.getDefineCodeTableByNameUrl, {
          codes: [CodeTableName],
          language: lang,
          tenantCode: tenantCode,
        });

        const returnData = response.body?.data?.[0] || [];
        const userSign = returnData.UserSign;

        const obj = {
          BusinessCodeTableValueList: returnData.items || [],
        };

        const codeTableObj: CodeTableResult = {
          codes: obj.BusinessCodeTableValueList,
        };
        await StoreContext.put(key, JSON.stringify(obj));

        return this._handlerUserCodetable(userSign, CodeTableName, codeTableObj);
      }

      if (CodeTableName) {
        const defineResponse = await ax.get(
          `${config.getDefineCodeTableByNameUrl}?codeTableName=${CodeTableName}`,
        );

        if (defineResponse?.Name) {
          const url = defineResponse.ServiceName
            ? config.getCodeTableByNameUrl.replace(
                /dd/,
                defineResponse.ServiceName,
              )
            : config.getCodeTableByNameUrl;

          const tmpCodeTable = await ax.post(url, {
            CodeTableName: defineResponse.Name,
            ConditionMap: sortedConditionMap,
          });

          const userSign = tmpCodeTable.BusinessCodeTable?.UserSign;
          const processedTable =
            CodeTableService.buildCodeTable(tmpCodeTable);

          delete processedTable.BusinessCodeTable;
          const codeTableObj: CodeTableResult = {
            codes: processedTable.BusinessCodeTableValueList || [],
          };

          await StoreContext.put(key, JSON.stringify(processedTable));
          return this._handlerUserCodetable(userSign, CodeTableName, codeTableObj);
        } else {
          warn("codetable is undefined: ", CodeTableName);
          return { codes: [] };
        }
      } else {
        return { codes: [] };
      }
    } catch (error) {
      warn("codetable operation error:", error);
      return { codes: [] };
    }
  }

  /**
   * Handle user code table processing
   * @private
   * @param userSign - Whether the code table uses user-defined values ('Y' or undefined)
   * @param codeTableName - The name of the code table
   * @param codeTableObj - The code table result to augment with user data
   * @returns The code table result with user data appended to the common field
   */
  private _handlerUserCodetable(
    userSign: string | undefined,
    codeTableName: string,
    codeTableObj: CodeTableResult,
  ): CodeTableResult {
    if (userSign === "Y") {
      const userCodeTable =
        SessionContext.get<Record<string, any[]>>("USER_CODETABLE");
      const commonData: any[] = [];

      if (userCodeTable && userCodeTable[codeTableName]) {
        userCodeTable[codeTableName].forEach((item: any) => {
          commonData.push({
            id: item.key,
            text: item.value,
          });
        });
      }

      codeTableObj.common = commonData;
    }

    return codeTableObj;
  }

  /**
   * Get a specific code table value by key
   * @param params - Code table request parameters with the target key
   * @param callback - Optional callback invoked with the found value (or null)
   * @returns The text value matching the key, or null if not found
   */
  async getCodeTableValue(
    params: CodeTableParams & { CodeTableKey: string | number },
    callback?: (value: string | null) => void,
  ): Promise<string | null> {
    const { CodeTableKey, ...otherParams } = params;

    try {
      const data = await this.getCodeTable(otherParams);
      const returnObj = data.codes.find((item: any) => item.id == CodeTableKey);

      const result = returnObj ? returnObj.text : null;
      callback?.(result);
      return result;
    } catch (error) {
      warn("Failed to get code table value:", error);
      callback?.(null);
      return null;
    }
  }

  /**
   * Load a code table with session caching
   * @param params - Code table request parameters
   * @returns The code table data (cached or freshly loaded)
   * @throws {Error} When the code table request fails
   */
  async loadCodeTable(params: CodeTableParams): Promise<any> {
    const key = this.buildKey(params);
    let tmpCodeTable = SessionContext.get(key);

    if (tmpCodeTable) {
      return tmpCodeTable;
    }

    try {
      const codeTableObj = await CodeTableService.getCodeTable(params);
      const isCache = codeTableObj.BusinessCodeTable?.NeedCache;
      tmpCodeTable = CodeTableService.buildCodeTable(codeTableObj);

      if (isCache === "Y") {
        SessionContext.put(key, tmpCodeTable);
      }

      return tmpCodeTable;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get multiple code tables by their names
   * @param codeTableNames - Array of code table names to fetch
   * @returns The code table data for all requested names
   * @throws {Error} When the batch code table request fails
   */
  async getCodeTableByNames(codeTableNames: string[]): Promise<any> {
    try {
      return await CodeTableService.codeTableNames(codeTableNames);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get detailed code table data by name, including raw business code table structure
   * @param params - Code table request parameters
   * @returns The full code table data object, or null if not found
   */
  async getCodeTableDetailByName(params: CodeTableParams): Promise<any> {
    const { CodeTableName, ConditionMap } = params;
    const config = getCodeTableConfig();

    const keyParams: CodeTableParams = {};
    if (ConditionMap) keyParams.ConditionMap = ConditionMap;
    if (CodeTableName) keyParams.CodeTableName = CodeTableName;

    const key = this.buildKey(keyParams);

    try {
      const cachedData = await StoreContext.get<string>(key);
      if (cachedData) {
        return JSON.parse(cachedData);
      }

      if (CodeTableName) {
        const defineResponse = await ax.get(
          `${config.getDefineCodeTableByNameUrl}?codeTableName=${CodeTableName}`,
        );

        const url = defineResponse.ServiceName
          ? config.getCodeTableByNameUrl.replace(
              /dd/,
              defineResponse.ServiceName,
            )
          : config.getCodeTableByNameUrl;

        const tmpCodeTable = await ax.post(url, {
          CodeTableName: defineResponse.Name,
          ConditionMap,
        });

        const processedTable = CodeTableService.buildCodeTable(tmpCodeTable);
        delete processedTable.BusinessCodeTable;

        if (!processedTable.HasMoreRecords) {
          await StoreContext.put(key, JSON.stringify(processedTable));
        }

        return processedTable;
      }

      return null;
    } catch (error) {
      warn("codetable operation error:", error);
      return null;
    }
  }
}

/**
 * Singleton instance of CodeTableActionClass
 */
export const CodeTableAction = new CodeTableActionClass();
