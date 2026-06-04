import { useLocale } from '../../locale';

/**
 * Get DatePicker config from the Locale system
 * This is a transitional solution for backward compatibility with the existing panelConfigs structure
 */
export function usePanelConfigs() {
    const { locale } = useLocale();
    const { datepicker } = locale;

    // Map locale code to panelConfigs.language
    const languageMap: Record<string, string> = {
        'zh_CN': 'zh',
        'zh_TW': 'zh_tw',
        'en_US': 'en',
        'ja_JP': 'jp',
    };

    return {
        language: languageMap[locale.locale] || 'en',
        weekList: datepicker.weekList,
        shortWeekList: datepicker.shortWeekList,
        monthList: datepicker.monthList,
        shortMonthList: datepicker.shortMonthList,
        timeList: datepicker.timeList,
        APMList: datepicker.APMList,
        selectTime: datepicker.selectTime,
        returnDate: datepicker.returnDate,
        now: datepicker.now,
        confirm: datepicker.confirm,
    };
}
