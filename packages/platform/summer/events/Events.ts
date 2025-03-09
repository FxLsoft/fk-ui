import type { SrOptions } from '../SummerOptions';

export interface SrEvent {
	type: string;
	params?: any;
}

export interface ReadyEvent extends SrEvent {
	options: SrOptions;
}
