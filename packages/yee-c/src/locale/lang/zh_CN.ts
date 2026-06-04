import type { Locale } from '../interface';

const locale: Locale = {
    locale: 'zh_CN',

    global: {},

    button: {
        loadingText: '加载中...',
    },

    card: {},

    datepicker: {
        weekList: ['周日', '周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        shortWeekList: ['日', '一', '二', '三', '四', '五', '六', '日'],
        monthList: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        shortMonthList: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
        timeList: ['时', '分', '秒'],
        APMList: ['上午', '下午'],
        selectTime: '选择时间',
        returnDate: '选择日期',
        now: '此刻',
        confirm: '确定',
        yearSuffix: '年',
        monthSuffix: '月',
    },

    rangepicker: {
        startPlaceholder: '开始日期',
        endPlaceholder: '结束日期',
        confirm: '确认',
        next: "下一步"
    },

    select: {
        noData: '暂无数据',
    },

    weekpicker: {
        weekHeader: ['', '日', '一', '二', '三', '四', '五', '六'],
    },

    table: {
        emptyText: '暂无数据',
        filterConfirm: '确定',
        filterReset: '重置',
        filterEmptyText: '无筛选条件',
        selectAll: '全选',
        selectInvert: '反选',
        selectNone: '清空选择',
        selectionAll: '全选当页',
        selectionInvert: '反选当页',
        selectionNone: '清空当页选择',
    },

    pagination: {
        total: '共 {total} 条',
        itemsPerPage: '条/页',
        jumpTo: '跳至',
        page: '页',
        prevPage: '上一页',
        nextPage: '下一页',
        prevPages: '向前 {num} 页',
        nextPages: '向后 {num} 页',
    },

    upload: {
        upload: '上传',
        remove: '删除',
        uploadError: '上传失败',
        preview: '预览',
        reupload: '重新上传',
        fileSizeError: '文件大小超出限制',
        fileTypeError: '文件格式不支持',
        draggerHint: '单击或拖动文件到此区域进行上传'
    },

    modal: {
        okText: '确定',
        cancelText: '取消',
    },

    popconfirm: {
        okText: '确定',
        cancelText: '取消',
    },

    qrcode: {
        expired: '二维码已过期',
        refresh: '点击刷新',
        scanned: '已扫描',
    },

    form: {
        defaultRequiredMessage: '该项为必填项',
        defaultValidateMessage: '格式不正确',
    },
};

export default locale;