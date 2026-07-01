/**
 * CodeTable module - Main entry point
 * @packageDocumentation
 */

// Export main action class
export { CodeTableAction } from "./action/code-table-action";

// Export service classes
export { CodeTableService } from "./service/code-table-service";
export { IndexedDBService } from "./service/indexed-db-service";

// Export utilities
export { CodeTableCache } from "./utils/code-table-cache";

// Export configuration
export {
  getCodeTableConfig,
  getProjectConfig,
} from "./config/code-table-config";
export type { CodeTableConfig } from "./config/code-table-config";

// Export constants
export { CodeTableConstant } from "./constant/code-table-constant";
export type { CodeTableConstantType } from "./constant/code-table-constant";

// Export types (single source of truth in ./types.ts)
export type {
  CodeTableParams,
  CodeTableResult,
  CodeTableValue,
  BusinessCodeTable,
} from "./types";
