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

// Export types
/**
 * Parameters for code table requests
 */
export interface CodeTableParams {
  /** Code table ID */
  CodeTableId?: string | number;
  /** Condition map for filtering code table values */
  ConditionMap?: Record<string, any>;
  /** Code table name */
  CodeTableName?: string;
  /** Custom URL configuration for fetching code table data */
  CodeTableUrl?: {
    url: string;
    param?: any;
    setting?: any;
  };
  /** Pre-defined list of values to include */
  IncludedValueList?: any[];
  /** Keyword for filtering */
  KeyWord?: string;
}

/**
 * Result of a code table query
 */
export interface CodeTableResult {
  /** Array of code table entries */
  codes: any[];
  /** Common (user-defined) code table values */
  common?: any[];
}

/**
 * A single code table value entry
 */
export interface CodeTableValue {
  /** The value identifier */
  id: string | number;
  /** The display text */
  text: string;
  /** Additional properties */
  [key: string]: any;
}

/**
 * Business code table data structure returned from API
 */
export interface BusinessCodeTable {
  /** List of code table values */
  BusinessCodeTableValueList: CodeTableValue[];
  /** Business code table metadata */
  BusinessCodeTable?: {
    /** Whether caching is needed */
    NeedCache?: string;
    /** Whether user-defined values are used */
    UserSign?: string;
    /** Code table name */
    Name?: string;
  };
  /** Whether more records are available */
  HasMoreRecords?: boolean;
}
