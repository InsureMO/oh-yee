import type { Locale } from '../interface';

const locale: Locale = {
  locale: 'en_US',

  global: {},

  button: {
    loadingText: 'Loading...',
  },

  card: {},

  datepicker: {
    weekList: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ],
    shortWeekList: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    monthList: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    shortMonthList: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sept',
      'Oct',
      'Nov',
      'Dec',
    ],
    timeList: ['Hour', 'Minute', 'Second'],
    APMList: ['AM', 'PM'],
    selectTime: 'Select Time',
    returnDate: 'Select Date',
    now: 'Now',
    confirm: 'Confirm',
    yearSuffix: '',
    monthSuffix: '',
  },

  rangepicker: {
    startPlaceholder: 'Start Date',
    endPlaceholder: 'End Date',
    confirm: 'Confirm',
    next: 'Next',
  },

  select: {
    noData: 'No Data',
  },

  weekpicker: {
    weekHeader: ['', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  },

  table: {
    emptyText: 'No Data',
    filterConfirm: 'Confirm',
    filterReset: 'Reset',
    filterEmptyText: 'No filters',
    selectAll: 'Select All',
    selectInvert: 'Invert Selection',
    selectNone: 'Clear Selection',
    selectionAll: 'Select All on Page',
    selectionInvert: 'Invert Selection on Page',
    selectionNone: 'Clear Selection on Page',
  },

  pagination: {
    total: 'Total {total} items',
    itemsPerPage: 'items/page',
    jumpTo: 'Go to',
    page: 'Page',
    prevPage: 'Previous',
    nextPage: 'Next',
    prevPages: '{num} Pages Back',
    nextPages: '{num} Pages Forward',
  },

  upload: {
    upload: 'Upload',
    remove: 'Remove',
    uploadError: 'Upload Failed',
    preview: 'Preview',
    reupload: 'Re-upload',
    fileSizeError: 'File size exceeds limit',
    fileTypeError: 'File format not supported',
    draggerHint: 'Click or drag file to this area to upload',
  },

  modal: {
    okText: 'OK',
    cancelText: 'Cancel',
  },

  popconfirm: {
    okText: 'OK',
    cancelText: 'Cancel',
  },

  qrcode: {
    expired: 'QR Code expired',
    refresh: 'Refresh',
    scanned: 'Scanned',
  },

  form: {
    defaultRequiredMessage: 'This field is required',
    defaultValidateMessage: 'Invalid format',
  },
};

export default locale;
