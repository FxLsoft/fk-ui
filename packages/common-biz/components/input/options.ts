import dayjs from 'dayjs';

/**
 * 日期单选情况下默认配置
 * @returns
 */
export const getDateShortcuts = () => [
	{
		label: '今天',
		value: () => dayjs(),
	},
	{
		label: '昨天',
		value: () => dayjs().subtract(1, 'day'),
	},
	{
		label: '前一周',
		value: () => dayjs().subtract(1, 'week'),
	},
	{
		label: '前一月',
		value: () => dayjs().subtract(1, 'month'),
	},
	{
		label: '前两月',
		value: () => dayjs().subtract(2, 'month'),
	},
];

/**
 * 日期范围选择默认配置
 * @returns
 */
export const getDateRangeShortcuts = () => [
	{
		label: '今天',
		value: () => [dayjs(), dayjs()],
	},
	{
		label: '昨天',
		value: () => [dayjs().subtract(1, 'day'), dayjs().subtract(1, 'day')],
	},
	{
		label: '上周',
		value: () => [dayjs().startOf('week').subtract(7, 'day'), dayjs().endOf('week').subtract(7, 'day')],
	},
	{
		label: '上月',
		value: () => [dayjs().subtract(1, 'month').startOf('month'), dayjs().subtract(1, 'month').endOf('month')],
	},
	{
		label: '本月',
		value: () => [dayjs().startOf('month'), dayjs().endOf('month')],
	},
	{
		label: '最近7天',
		value: () => [dayjs().subtract(7 - 1, 'day'), dayjs()],
	},
	{
		label: '最近30天',
		value: () => [dayjs().subtract(30 - 1, 'day'), dayjs()],
	},
	{
		label: '最近60天',
		value: () => [dayjs().subtract(60 - 1, 'day'), dayjs()],
	},
	{
		label: '最近90天',
		value: () => [dayjs().subtract(90 - 1, 'day'), dayjs()],
	},
];

/**
 * 文件格式字典
 */
export const FileSuffixMap = [
	{
		label: 'Word',
		accept: ['doc', 'docx', 'wps'],
		icon: 'word',
		key: 'word',
	},
	{
		label: 'Excel',
		accept: ['xls', 'xlsx', 'csv', 'xlsm'],
		icon: 'excel',
		key: 'excel',
	},
	{
		label: 'PPT',
		accept: ['ppt', 'pptx'],
		icon: 'ppt',
		key: 'ppt',
	},
	{
		label: 'PDF',
		accept: ['pdf'],
		icon: 'pdf',
		key: 'pdf',
	},
	{
		label: '图片',
		accept: ['jpg', 'jpeg', 'gif', 'png', 'bmp', 'webp'],
		icon: 'img',
		key: 'image',
	},
	{
		label: '音频',
		accept: ['mp3', 'm4a', 'mid', 'wma'],
		icon: 'audio',
		key: 'audio',
	},
	{
		label: '视频',
		accept: ['mp4', 'avi', 'mkv', 'flv', 'mov', 'm4v', 'm2v'],
		icon: 'video',
		key: 'video',
		// 宽带达不到200M所以改成100M?
		maxSize: 100,
	},
];

/**
 * 获取文件后缀
 * @param filename
 * @returns
 */
export function getFileExtension(filename: string) {
	const fileExt = filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
	if (fileExt) {
		return fileExt.toLocaleLowerCase();
	}
	return fileExt;
}
