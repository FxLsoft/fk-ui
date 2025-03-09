import type { InjectionKey } from 'vue';
import type { Direction } from '../_utils/constant';
import type { LabelPositionType, ModeType } from './interface';

export interface TimelineContext {
	items: number[];
	direction: Direction;
	reverse: boolean;
	labelPosition: LabelPositionType;
	mode: ModeType;
}

export const timelineInjectionKey: InjectionKey<TimelineContext> = Symbol('Timeline');
