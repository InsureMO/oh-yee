import type { Locale } from '../interface';

const locale: Locale = {
  locale: 'zh_TW',

  global: {},

  button: {
    loadingText: '載入中...',
  },

  card: {},

  datepicker: {
    weekList: ['周日', '週一', '週二', '週三', '週四', '週五', '週六', '周日'],
    shortWeekList: ['日', '一', '二', '三', '四', '五', '六', '日'],
    monthList: [
      '一月',
      '二月',
      '三月',
      '四月',
      '五月',
      '六月',
      '七月',
      '八月',
      '九月',
      '十月',
      '十一月',
      '十二月',
    ],
    shortMonthList: [
      '一',
      '二',
      '三',
      '四',
      '五',
      '六',
      '七',
      '八',
      '九',
      '十',
      '十一',
      '十二',
    ],
    timeList: ['時', '分', '秒'],
    APMList: ['上午', '下午'],
    selectTime: '選擇時間',
    returnDate: '選擇日期',
    now: '此刻',
    confirm: '確定',
    yearSuffix: '年',
    monthSuffix: '月',
  },

  rangepicker: {
    startPlaceholder: '開始日期',
    endPlaceholder: '結束日期',
    confirm: '確認',
    next: '下一步',
  },

  select: {
    noData: '暫無資料',
  },

  input: {
    showPassword: '顯示密碼',
    hidePassword: '隱藏密碼',
  },

  ellipsis: {
    expand: '展開',
    collapse: '收合',
  },

  transfer: {
    searchPlaceholder: '搜尋',
  },

  weekpicker: {
    weekHeader: ['', '日', '一', '二', '三', '四', '五', '六'],
  },

  table: {
    emptyText: '暫無資料',
    filterConfirm: '確定',
    filterReset: '重置',
    filterEmptyText: '無篩選條件',
    filterAll: '全部',
    selectAll: '全選',
    selectInvert: '反選',
    selectNone: '清空選擇',
    selectionAll: '全選當頁',
    selectionInvert: '反選當頁',
    selectionNone: '清空當頁選擇',
  },

  pagination: {
    total: '共 {total} 條',
    itemsPerPage: '條/頁',
    jumpTo: '跳至',
    page: '頁',
    prevPage: '上一頁',
    nextPage: '下一頁',
    prevPages: '向前 {num} 頁',
    nextPages: '向後 {num} 頁',
  },

  upload: {
    upload: '上傳',
    remove: '刪除',
    uploadError: '上傳失敗',
    preview: '預覽',
    reupload: '重新上傳',
    fileSizeError: '文件大小超出限制',
    fileTypeError: '文件格式不支持',
    draggerHint: '按一下或拖動檔案到此區域進行上傳',
  },

  modal: {
    okText: '確定',
    cancelText: '取消',
  },

  tour: {
    previous: '上一步',
    next: '下一步',
    finish: '完成',
    skip: '跳過',
  },

  popconfirm: {
    okText: '確定',
    cancelText: '取消',
  },

  qrcode: {
    expired: '二維碼已過期',
    refresh: '點擊刷新',
    scanned: '已掃描',
  },

  form: {
    defaultRequiredMessage: '該項為必填項',
    defaultValidateMessage: '格式不正確',
  },
};

export default locale;
