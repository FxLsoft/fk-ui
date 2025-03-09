import { defineComponent, reactive, ref } from 'vue';
import { Transfer } from '@erp/common';
import { pop } from '../pop';
import type { TransferItem } from '@erp/common';
import type { FormFieldI } from './interface';
import type { PropType } from 'vue';

export interface FieldSortDataI {
	sortData?: Record<string, number>;
	visibleData?: Record<string, boolean>;
}

export interface FieldSettingsProps {
	/**
	 * 字段名称
	 */
	fields: Array<FormFieldI>;

	storeData: FieldSortDataI;
}

const _Component = defineComponent({
	name: 'FieldSettingsPop',
	props: {
		/**
		 * 所有的字段
		 */
		fields: Array as PropType<Array<FormFieldI>>,
		/**
		 * 存储信息
		 */
		storeData: Object as PropType<FieldSortDataI>,
	},
	emits: {
		close: (param?: any) => true,
		ok: (param?: any) => true,
		loading: (l: boolean) => true,
	},
	setup(props, { emit, slots, attrs }) {
		const fields = props.fields;
		const storeData = (props.storeData || {}) as FieldSortDataI;
		const options = reactive<TransferItem[]>([]);
		const selected = ref<string[]>([]);
		fields
			.filter(v => v.label)
			.forEach((field, index) => {
				const visible = storeData.visibleData?.[field.key] ?? true;
				const sort = storeData.sortData?.[field.key] ?? index;
				options.push({
					label: field.label,
					value: field.key,
					disabled: false,
					sort,
				});
				if (visible) {
					selected.value.push(field.key);
				}
			});
		const render = () => {
			return (
				<div class="col-settings-pop">
					<Transfer
						style="height: 420px"
						title={['不显示字段', '显示字段']}
						data={options}
						draggable
						modelValue={selected.value}
						onUpdate:modelValue={value => {
							selected.value = value;
						}}
					/>
					<p style="color: var(--color-text-3); margin-top: 12px">勾选字段，点击【&gt;】【&lt;】按钮移入对应列方可生效</p>
				</div>
			);
		};
		const beforeOk = async () => {
			const visibleData: Record<string, boolean> = storeData.visibleData || {};
			const sortData = storeData.sortData || {};
			options.forEach(el => {
				const visible = selected.value.includes(el.value);
				visibleData[el.value] = visible;
				sortData[el.value] = el.sort;
			});
			storeData.visibleData = visibleData;
			storeData.sortData = sortData;
			return storeData;
		};
		return {
			beforeOk,
			render,
		};
	},

	methods: {
		/**
		 * 返回给调用方
		 */
		getModel(): Promise<Record<string, any>> {
			return this.beforeOk();
		},
	},

	render() {
		return this.render();
	},
});

/**
 * 打开字段配置
 * @param props FieldSettingsProps
 * @returns
 */
export function createFieldSettingsPop(props: FieldSettingsProps): Promise<FieldSortDataI> {
	return pop.createModal(_Component, props, {
		title: '字段配置',
	});
}
