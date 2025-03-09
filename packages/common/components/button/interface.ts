import type { ButtonHTMLAttributes } from 'vue';
import type { BorderShape, Size, Status } from '../_utils/constant';
import type { ButtonTypes } from './constants';

export interface ButtonProps {
	type?: ButtonTypes;
	shape?: BorderShape;
	status?: Status;
	size?: Size;
	long?: boolean;
	loading?: boolean;
	disabled?: boolean;
	htmlType?: Pick<ButtonHTMLAttributes, 'type'>['type'];
	href?: string;
	label?: string;
	icon?: string;
}
