/**
 * 滚动条的配置
 */
export interface ThumbData {
	ratio: number;
	thumbSize: number;
	max: number;
}

/**
 * 滚动条滑块的配置
 */
export interface ThumbMap {
	size: 'width' | 'height';
	direction: 'left' | 'top';
	offset: 'offsetWidth' | 'offsetHeight';
	client: 'clientX' | 'clientY';
}

/**
 * Scrollbar Props配置
 */
export interface ScrollbarProps {
	type: 'track' | 'embed';
	outerClass: any;
	outerStyle: any;
}
