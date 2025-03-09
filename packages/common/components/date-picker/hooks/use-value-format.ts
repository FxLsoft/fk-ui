import { toRefs } from 'vue';
import type { Dayjs } from 'dayjs';
import type { CalendarValue, ValueFormat } from '../interface';

export function getReturnValue(date: Dayjs, format: ValueFormat) {
	if (format === 'timestamp') {
		return date.toDate().getTime();
	}
	if (format === 'Date') {
		return date.toDate();
	}
	return date.format(format);
}

export function useReturnValue(props: { format: ValueFormat }) {
	const { format } = toRefs(props);

	return (date: Dayjs) => getReturnValue(date, format.value);
}

export function getReturnRangeValue(dates: Dayjs[], format: ValueFormat): CalendarValue[];
export function getReturnRangeValue(dates: (Dayjs | undefined)[], format: ValueFormat): (CalendarValue | undefined)[];
export function getReturnRangeValue(dates: (Dayjs | undefined)[], format: ValueFormat) {
	return dates.map(date => (date ? getReturnValue(date, format) : undefined));
}
