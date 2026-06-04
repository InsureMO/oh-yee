/**
 * CodeTable constants
 * @ohdule code-table-constant
 */

export const CodeTableConstant = {
  DB_NAME: "RainbowUI",
  DB_VERSION: 1,
  DB_STORE_NAME: "CODE_TABLE",

  TRANSACTION_OPTION_READWRITE: "readwrite" as const,

  CODE_TABLE_ID: "Id",
  CODE_TABLE_DESCRIPTION: "Description",
} as const;

export type CodeTableConstantType = typeof CodeTableConstant;
