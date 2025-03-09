import { isArray } from '../../_utils/is';
import { isDisabledTime } from '../utils';
import type { Dayjs } from 'dayjs';
import type { TimePickerProps } from '../interface';

export default function useIsDisabledTime(props: {
	disabledHours: TimePickerProps['disabledHours'];
	disabledMinutes: TimePickerProps['disabledMinutes'];
	disabledSeconds: TimePickerProps['disabledSeconds'];
}) {
	const isDisabled = (value: Dayjs | undefined) => {
		return isDisabledTime(value, {
			disabledHours: props.disabledHours,
			disabledMinutes: props.disabledMinutes,
			disabledSeconds: props.disabledSeconds,
		});
	};

	return (value: Array<Dayjs | undefined> | Dayjs | undefined) => {
		return isArray(value) ? value.some(i => isDisabled(i)) : isDisabled(value);
	};
}
