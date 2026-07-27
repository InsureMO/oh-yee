import { notice } from './wrapper';
export type {
  NoticeApi,
  NoticeClose,
  NoticeConfig,
  PlacementType,
} from './interface';
export * from './notice-provider';
export { default as useNotice } from './use-notice';
export default notice;
