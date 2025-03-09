import type { InjectionKey, Slots } from 'vue';

export interface CheckboxGroupContext {
	name: 'CheckboxGroup';
	computedValue: Array<string | number>;
	disabled: boolean;
	isMaxed: boolean;
	multiple: boolean;
	slots: Slots;
	handleChange: (value: Array<string | number | boolean>, e: Event) => void;
}

export const checkboxGroupKey: InjectionKey<CheckboxGroupContext> = Symbol('CheckboxGroup');
