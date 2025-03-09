import { inject } from 'vue';
import { PickerInjectionKey } from '../context';
import type { PickerContext } from '../context';

export default function useDatePickerTransform() {
	const { datePickerT } = inject<PickerContext>(PickerInjectionKey) || {};

	return datePickerT || ((key: string, ...args: any[]) => key);
}
