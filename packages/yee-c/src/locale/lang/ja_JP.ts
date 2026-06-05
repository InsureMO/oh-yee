import type { Locale } from '../interface';

const locale: Locale = {
  locale: 'ja_JP',

  global: {},

  button: {
    loadingText: '読み込み中...',
  },

  card: {},

  datepicker: {
    weekList: [
      '日曜日',
      '月曜日',
      '火曜日',
      '水曜日',
      '木曜日',
      '金曜日',
      '土曜日',
      '日曜日',
    ],
    shortWeekList: ['日', '月', '火', '水', '木', '金', '土', '日'],
    monthList: [
      '1月',
      '2月',
      '3月',
      '4月',
      '5月',
      '6月',
      '7月',
      '8月',
      '9月',
      '10月',
      '11月',
      '12月',
    ],
    shortMonthList: [
      '1月',
      '2月',
      '3月',
      '4月',
      '5月',
      '6月',
      '7月',
      '8月',
      '9月',
      '10月',
      '11月',
      '12月',
    ],
    timeList: ['時', '分', '秒'],
    APMList: ['午前', '午後'],
    selectTime: '時間選択',
    returnDate: '期日に戻る',
    now: '現在',
    confirm: '確認',
    yearSuffix: '年',
    monthSuffix: '月',
  },

  rangepicker: {
    startPlaceholder: '開始日',
    endPlaceholder: '終了日',
    confirm: '確認',
    next: '次へ',
  },

  select: {
    noData: 'データなし',
  },

  weekpicker: {
    weekHeader: ['', '日', '月', '火', '水', '木', '金', '土'],
  },

  table: {
    emptyText: 'データなし',
    filterConfirm: '確認',
    filterReset: 'リセット',
    filterEmptyText: 'フィルターなし',
    selectAll: 'すべて選択',
    selectInvert: '選択を反転',
    selectNone: '選択をクリア',
    selectionAll: 'ページ内すべて選択',
    selectionInvert: 'ページ内選択を反転',
    selectionNone: 'ページ内選択をクリア',
  },

  pagination: {
    total: '合計 {total} 件',
    itemsPerPage: '件/ページ',
    jumpTo: '移動',
    page: 'ページ',
    prevPage: '前へ',
    nextPage: '次へ',
    prevPages: '{num} ページ戻る',
    nextPages: '{num} ページ進む',
  },

  upload: {
    upload: 'アップロード',
    remove: '削除',
    uploadError: 'アップロード失敗',
    preview: 'プレビュー',
    reupload: '再アップロード',
    fileSizeError: 'ファイルサイズ超過',
    fileTypeError: 'ファイル形式がサポートされていません',
    draggerHint:
      'ファイルをクリックまたはドラッグしてこの領域にアップロードします',
  },

  modal: {
    okText: 'OK',
    cancelText: 'キャンセル',
  },

  popconfirm: {
    okText: 'OK',
    cancelText: 'キャンセル',
  },

  qrcode: {
    expired: 'QRコードが期限切れです',
    refresh: '更新',
    scanned: 'スキャン済み',
  },

  form: {
    defaultRequiredMessage: 'この項目は必須です',
    defaultValidateMessage: '形式が正しくありません',
  },
};

export default locale;
