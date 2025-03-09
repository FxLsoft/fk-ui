import type { UnionType } from '../_utils/types';
import type { CascaderOption, CascaderOptionInfo } from './interface';
import type { InjectionKey, Slots } from 'vue';

export interface CascaderContext {
	onClickOption: (option: CascaderOptionInfo | CascaderOptionInfo[], checked?: boolean) => void;
	setActiveKey: (key?: string) => void;
	setSelectedPath: (key?: string) => void;
	loadMore: (option: CascaderOption, done: (children?: CascaderOption[]) => void) => void;
	addLazyLoadOptions: (children: CascaderOption[], key: string) => void;
	formatLabel: (options: CascaderOption[]) => string;
	slots: Slots;
	valueMap: Map<string, UnionType | UnionType[]>;
	expandTrigger: 'click' | 'hover';
	updateValueByOption: (values: CascaderOptionInfo[]) => void;
}

export const cascaderInjectionKey: InjectionKey<CascaderContext> = Symbol('Cascader');
