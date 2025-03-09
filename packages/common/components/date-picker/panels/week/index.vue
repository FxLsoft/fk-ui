<template>
	<DatePanel
		v-bind="$attrs"
		mode="week"
		is-week
		:day-start-of-week="dayStartOfWeek"
		:is-same-time="isSameTime"
		@select="onSelect"
		@cellMouseEnter="onCellMouseEnter"
	/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { methods } from '../../../_utils/date';
import DatePanel from '../date/index.vue';
import { useI18n } from '../../../locale';
import type { Dayjs } from 'dayjs';
import type { PropType } from 'vue';
import type { IsSameTime, WeekStart } from '../../interface';

export default defineComponent({
	name: 'WeekPanel',
	components: {
		DatePanel,
	},
	props: {
		dayStartOfWeek: {
			type: Number as PropType<WeekStart>,
			default: 0,
		},
	},
	emits: ['select', 'cell-mouse-enter'],
	setup(props, { emit }) {
		const { locale } = useI18n();
		const isSameTime: IsSameTime = (current, target) => {
			return methods.isSameWeek(current, target, props.dayStartOfWeek);
		};
		return {
			isSameTime,
			onSelect: (value: Dayjs) => {
				const startDateOfWeek = methods.startOfWeek(value, props.dayStartOfWeek);
				emit('select', startDateOfWeek);
			},
			onCellMouseEnter: (value: Dayjs) => {
				const startDateOfWeek = methods.startOfWeek(value, props.dayStartOfWeek);
				emit('cell-mouse-enter', startDateOfWeek);
			},
		};
	},
});
</script>
