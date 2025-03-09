import { defineComponent, toRefs } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import { useI18n } from '../locale';
import type { Dayjs } from 'dayjs';
import type { PropType } from 'vue';

export default defineComponent({
	name: 'Week',
	props: {
		mode: {
			type: String as PropType<'day' | 'week' | 'month' | 'year'>,
		},
		dayStartOfWeek: {
			type: Number as PropType<0 | 1>,
		},
		isWeek: {
			type: Boolean,
		},
		panel: {
			type: Boolean,
		},
		value: {
			type: Object as PropType<Dayjs>,
			required: true,
		},
		selectHandler: {
			type: Function as PropType<(time: Dayjs, disabled: boolean) => void>,
		},
		pageShowData: {
			type: Object as PropType<Dayjs>,
			required: true,
		},
		pageData: {
			type: Array,
		},
	},
	setup(props) {
		const { dayStartOfWeek, isWeek, panel, mode } = toRefs(props);
		const prefixCls = getPrefixCls('calendar-week-list');
		const { t } = useI18n();
		const weekList = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
		if (dayStartOfWeek.value === 0) {
			weekList.unshift('sunday');
		} else {
			weekList.push('sunday');
		}
		if (isWeek.value) {
			weekList.unshift('self');
		}
		return () => (
			<div class={prefixCls}>
				{weekList.map(w => (
					<div class={`${prefixCls}-item`} key={w}>
						{t(`calendar.week.${panel.value || mode.value === 'year' ? 'short' : 'long'}.${w}`)}
					</div>
				))}
			</div>
		);
	},
});
