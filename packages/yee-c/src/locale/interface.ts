export interface LocaleButton {
    // Reserved for extension
    loadingText?: string;
}

export interface LocaleCard {
    // Reserved for extension
}

export interface LocaleGlobal {
    // Reserved for extension
}

// DatePicker related config
export interface LocaleDatePicker {
    // Date time panel config
    weekList: string[];           // Full weekday names ['Sun', 'Mon', ...]
    shortWeekList: string[];      // Short weekday names ['Su', 'Mo', ...]
    monthList: string[];          // Full month names ['January', 'February', ...]
    shortMonthList: string[];     // Short month names ['Jan', 'Feb', ...]
    timeList: string[];           // Time unit list ['h', 'm', 's']
    APMList: string[];            // AM/PM list ['AM', 'PM']

    // Button and action text
    selectTime: string;           // "Select time"
    returnDate: string;           // "Select date"
    now: string;                  // "Now"
    confirm: string;              // "OK"

    // Date format suffixes
    yearSuffix: string;           // Year suffix
    monthSuffix: string;          // Month suffix
}

// RangePicker component
export interface LocaleRangePicker {
    startPlaceholder: string;     // "Start date"
    endPlaceholder: string;       // "End date"
    confirm: string;              // "Confirm"
    next: string;                 // "Next"
}

// Select component
export interface LocaleSelect {
    noData: string;               // "No data"
}

// WeekPicker component
export interface LocaleWeekPicker {
    weekHeader: string[];         // ['', 'Su', 'Mo', 'Tu', ...]
}

// Table component
export interface LocaleTable {
    emptyText: string;            // "No data"
    filterConfirm: string;        // "OK"
    filterReset: string;          // "Reset"
    filterEmptyText: string;      // "No filter conditions"
    selectAll?: string;           // "Select all"
    selectInvert?: string;        // "Invert selection"
    selectNone?: string;          // "Clear selection"
    selectionAll?: string;        // "Select all on current page"
    selectionInvert?: string;     // "Invert selection on current page"
    selectionNone?: string;       // "Clear selection on current page"
}

// Pagination component
export interface LocalePagination {
    total?: string;               // "Total {total} items"
    itemsPerPage?: string;        // "items/page"
    jumpTo: string;               // "Jump to"
    page: string;                 // "page"
    prevPage: string;             // "Previous page"
    nextPage: string;             // "Next page"
    prevPages: string;            // "{num} pages back"
    nextPages: string;            // "{num} pages forward"
}

// Upload component
export interface LocaleUpload {
    upload: string;               // "Upload"
    remove: string;               // "Remove"
    uploadError: string;          // "Upload failed"
    preview: string;              // "Preview"
    reupload: string;             // "Re-upload"
    fileSizeError: string;        // "File size exceeds limit"
    fileTypeError: string;        // "File format not supported"
    draggerHint: string;
}

// Modal/Dialog component
export interface LocaleModal {
    okText: string;               // "OK"
    cancelText: string;           // "Cancel"
}

// Popconfirm component
export interface LocalePopconfirm {
    okText: string;               // "OK"
    cancelText: string;           // "Cancel"
}

// QRCode component
export interface LocaleQRCode {
    expired: string;              // "QR code expired"
    refresh: string;              // "Click to refresh"
    scanned: string;              // "Scanned"
}

// Form component
export interface LocaleForm {
    defaultRequiredMessage: string; // "This field is required"
    defaultValidateMessage?: string; // "Invalid format"
}

export interface Locale {
    locale: string;
    global: LocaleGlobal;
    button: LocaleButton;
    card: LocaleCard;
    datepicker: LocaleDatePicker;
    rangepicker: LocaleRangePicker;
    select: LocaleSelect;
    weekpicker: LocaleWeekPicker;
    table: LocaleTable;
    pagination: LocalePagination;
    upload: LocaleUpload;
    modal: LocaleModal;
    popconfirm: LocalePopconfirm;
    qrcode: LocaleQRCode;
    form: LocaleForm;
}

// ============ Translation key type inference ============

// Recursively generate path types: 'global.placeholder' | 'button.okText' | ...
type DeepPath<T extends object, P extends string = ''> = {
    [K in keyof T]: T[K] extends string
    ? P extends ''
    ? `${K & string}`
    : `${P}.${K & string}`
    : T[K] extends object
    ? DeepPath<T[K], P extends '' ? `${K & string}` : `${P}.${K & string}`>
    : never;
}[keyof T];

// Export all valid translation keys
export type LocaleKey = DeepPath<Locale>;

// Extract template parameter types: from "Total {total} items" extract { total: string | number }
type ExtractParams<T extends string> =
    T extends `${infer _}{${infer P}}${infer Rest}`
    ? { [K in P | keyof ExtractParams<Rest>]: string | number }
    : {};

// Get parameter type by key
export type LocaleParams<K extends LocaleKey> = ExtractParams<
    K extends keyof Locale ? Locale[K] :
    K extends `${infer A}.${infer B}` ?
    A extends keyof Locale ?
    B extends keyof Locale[A] ? Locale[A][B] :
    never : never : never
>;

// Translation function signature
export type TFunction = <K extends LocaleKey>(
    key: K,
    params?: LocaleParams<K>
) => string;
