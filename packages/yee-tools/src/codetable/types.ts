/**
 * Shared type definitions for the CodeTable module.
 *
 * Previously these interfaces were duplicated (and diverged) across
 * index.ts / action / service. They now live here as the single source
 * of truth and are re-exported and imported where needed.
 * @packageDocumentation
 */

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
  /** Language ID */
  LangId?: string;
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
 * A single code table value entry, normalized to `{ id, text }` plus any
 * extra fields returned by the API.
 */
export interface CodeTableValue {
  /** The value identifier */
  id?: string | number;
  /** The display text */
  text?: string;
  /** Additional properties */
  [key: string]: any;
}

/**
 * Business code table data structure returned from the API
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
    /** Service name for routing */
    ServiceName?: string;
  };
  /** Whether more records are available */
  HasMoreRecords?: boolean;
  /** Condition map used for the query */
  ConditionMap?: Record<string, any>;
}
