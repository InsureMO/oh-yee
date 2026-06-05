/**
 * CodeTable configuration
 * @ohdule code-table-config
 */

import { configer } from "../../config/config-provider";
import { normalizeURL } from "../../url/url-utils";
import { warn } from "../../common/logger";

/**
 * CodeTable API configuration
 */
interface CodeTableConfig {
  /** URL for looking up code table definitions by name */
  getDefineCodeTableByNameUrl: string;
  /** URL for fetching code table data by name */
  getCodeTableByNameUrl: string;
  /** URL for batch-fetching code tables by names */
  getCodeTablesByNameUrl: string;
  /** URL for fetching code table data by ID */
  getCodeTableByIdUrl: string;
  /** URL for fetching code table data by condition */
  getCodeTableByConditionUrl: string;
  /** URL for fetching common code tables */
  getCommonCodeTablesUrl: string;
  /** Field name mapping for code table key and value fields */
  codeTableKeyValue: {
    KEY: string;
    VALUE: string;
  };
  /** Whether to use default project configuration */
  defaultProject: boolean;
}

/**
 * Get project configuration from sessionStorage
 * @returns The parsed project configuration object, or null if not available
 */
function getProjectConfig(): Record<string, any> | null {
  if (typeof sessionStorage === "undefined") {
    return null;
  }

  const projectKey = configer.get("storageKeys.projectConfig") || "project_config";

  const configStr = sessionStorage.getItem(projectKey);
  if (!configStr) {
    return null;
  }

  try {
    return JSON.parse(configStr);
  } catch (error) {
    warn(`Failed to parse ${projectKey} from sessionStorage:`, error);
    return null;
  }
}

/**
 * Get CodeTable configuration, merging defaults with custom settings
 * @returns The resolved CodeTable configuration object
 */
function getCodeTableConfig(): CodeTableConfig {
  const config = configer.getAll();
  const projectConfig = getProjectConfig();

  const root = projectConfig?.UI_API_GATEWAY_PROXY || "";

  const UI_API_GATEWAY_PROXY_PATH = root.endsWith("/") ? root.slice(0, -1) : root;

  let getDefineCodeTableByNameUrl =
    UI_API_GATEWAY_PROXY_PATH + normalizeURL("/dd/public/codetable/v1/byCodeTableName");
  let getCodeTableByNameUrl =
    UI_API_GATEWAY_PROXY_PATH + normalizeURL("/dd/public/codetable/v1/data/list/byName");
  let getCodeTableByIdUrl =
    UI_API_GATEWAY_PROXY_PATH + normalizeURL("/dd/public/codetable/v1/data/codeTableById");
  const getCodeTableByConditionUrl =
    UI_API_GATEWAY_PROXY_PATH + normalizeURL("/dd/public/codetable/v1/data/condition/in");
  const getCodeTablesByNameUrl =
    UI_API_GATEWAY_PROXY_PATH +
    normalizeURL("/dd/public/codetable/v1/codeTableVoList/byNameList");
  const getCommonCodeTablesUrl =
    UI_API_GATEWAY_PROXY_PATH +
    normalizeURL("/urp/pub/set/loadObjectByKey?key=MainConfig.SelectConfig..");

  // Override with custom configurations
  const GET_CODETABLE_ID = projectConfig?.GET_CODETABLE_ID;
  if (GET_CODETABLE_ID) {
    getCodeTableByIdUrl = UI_API_GATEWAY_PROXY_PATH + GET_CODETABLE_ID;
  }

  if (config.DEFAULT_CODETABLE_API) {
    getDefineCodeTableByNameUrl =
      UI_API_GATEWAY_PROXY_PATH + config.DEFAULT_CODETABLE_API;
  }

  return {
    getDefineCodeTableByNameUrl,
    getCodeTableByNameUrl,
    getCodeTablesByNameUrl,
    getCodeTableByIdUrl,
    getCodeTableByConditionUrl,
    getCommonCodeTablesUrl,
    codeTableKeyValue: config.DEFAULT_CODETABLE_KEYVALUE || {
      KEY: "value",
      VALUE: "label",
    },
    defaultProject: config.DEFAULT_PROJECT || false,
  };
}

export { getCodeTableConfig, getProjectConfig };
export type { CodeTableConfig };
