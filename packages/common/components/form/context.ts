import type { Size } from '../_utils/constant';
import type { InjectionKey } from 'vue';
import type { Data } from '../_utils/types';
import type { FieldData, FieldRule, FormItemEventHandler, ValidateStatus, ValidatedError } from './interface';

export interface FormContext {
	layout: string;
	disabled?: boolean;
	labelAlign: string;
	labelColProps?: any;
	wrapperColProps?: any;
	labelColStyle?: any;
	wrapperColStyle?: any;
	model: Data;
	size: Size;
	rules?: Record<string, FieldRule | FieldRule[]>;
	fields: FormItemInfo[];
	touchedFields: FormItemInfo[];
	addField: (field: FormItemInfo) => void;
	removeField: (field: FormItemInfo) => void;
	validateField: (
		field: string | string[],
		callback?: (errors: undefined | Record<string, ValidatedError>) => void,
	) => Promise<undefined | Record<string, ValidatedError>>;
	setLabelWidth: (width: number, uid?: number) => void;
	removeLabelWidth: (uid?: number) => void;
	maxLabelWidth: number;
	autoLabelWidth: boolean;
	id?: string;
}

export interface FormItemContext {
	eventHandlers: FormItemEventHandler;
	size: Size | undefined;
	disabled: boolean;
	error: boolean;
	feedback: string | undefined;
	updateValidateState: (field: string, { status, message }: { status: ValidateStatus | ''; message: string }) => void;
}

export interface FormItemInfo {
	field: string;
	disabled: boolean;
	error: boolean;
	labelWidth?: number;
	validate: () => Promise<any>;
	clearValidate: () => void;
	resetField: () => void;
	setField: (data: FieldData) => void;
}

export const formItemInjectionKey: InjectionKey<FormItemContext> = Symbol('FormItemContext');
export const formInjectionKey: InjectionKey<FormContext> = Symbol('FormContext');
