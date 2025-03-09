import { defineComponent, h, inject, onMounted, onUnmounted, provide, ref } from 'vue';
import { assembleColumn, destroyColumn, watchColumn } from '../../table/src/util';
import Cell from '../../table/src/cell';
import { columnProps } from './column';
import type { XEColumnInstance } from '../../table/src/util';
import type { Ref, Slot } from 'vue';

import type { VxeTableConstructor, VxeTablePrivateMethods } from '../../../types';

export default defineComponent({
	name: 'VxeColgroup',
	props: columnProps,
	setup(props, { slots }) {
		const refElem = ref() as Ref<HTMLDivElement>;
		const $xeTable = inject('$xeTable', {} as VxeTableConstructor & VxeTablePrivateMethods);
		const parentColgroup = inject('$xeColgroup', null as XEColumnInstance | null);
		const column = Cell.createColumn($xeTable, props);
		const columnSlots: {
			header?: Slot;
		} = {};

		if (slots.header) {
			columnSlots.header = slots.header;
		}

		column.slots = columnSlots;
		column.children = [];

		watchColumn($xeTable, props, column);

		onMounted(() => {
			assembleColumn($xeTable, refElem.value, column, parentColgroup);
		});

		onUnmounted(() => {
			destroyColumn($xeTable, column);
		});

		const renderVN = () => {
			return h(
				'div',
				{
					ref: refElem,
				},
				slots.default ? slots.default() : [],
			);
		};

		const $xeColgroup = { column };

		provide('$xeColgroup', $xeColgroup);
		provide('$xeGrid', null);

		return renderVN;
	},
});
