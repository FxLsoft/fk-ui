import NP from 'number-precision';
import type { Direction } from '../_utils/constant';
import type { CSSProperties } from 'vue';

export const getOffsetPercent = (value: number, [min, max]: [number, number]): string => {
	const percent = Math.max((value - min) / (max - min), 0);
	return `${NP.round(percent * 100, 2)}%`;
};

export const getPositionStyle = (offset: string, direction: Direction): CSSProperties => {
	return direction === 'vertical' ? { bottom: offset } : { left: offset };
};
