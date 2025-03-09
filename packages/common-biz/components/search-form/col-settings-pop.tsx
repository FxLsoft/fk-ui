import { defineComponent, onMounted, reactive, ref } from 'vue';
import { Button, IconLock, IconUnlock, Transfer } from '@erp/common';
import { pop } from '../pop';
import type { TransferItem } from '@erp/common';
import type { PropType } from 'vue';
import type { VxeColumnPropTypes, VxeGridConstructor, VxeGridInstance } from '../../types';

const _Component = defineComponent({
	name: 'ColSettingsPop',
	props: {
		gridInstance: Object as PropType<VxeGridInstance>,
	},
	emits: {
		close: (param?: any) => true,
		ok: (param?: any) => true,
		loading: (l: boolean) => true,
	},
	setup(props, { emit, slots, attrs }) {
		const gridInstance = props.gridInstance;
		const options = ref<TransferItem[]>([]);
		const selected = ref<string[]>([]);
		const fixedMap = reactive(new Map<string, VxeColumnPropTypes.Fixed>());
		const columnInfo = gridInstance.getTableColumn();
		const storeData = gridInstance.getCustomStoreData();
		let baseIndex = 0;
		columnInfo.fullColumn.forEach((column, index) => {
			const key = column.getKey();
			if (column.fixed) {
				fixedMap.set(key, column.fixed);
			}
			if (['seq', 'radio', 'checkbox', 'expand'].includes(column.type)) {
				baseIndex = index;
				return;
			}
			const visible = storeData.visibleData?.[key] ?? true;
			options.value.push({
				label: column.title || column.type,
				value: key,
				sort: index,
				disabled: column.fixed === 'right',
			});
			if (visible) {
				selected.value.push(key);
			}
		});

		const handleLock = data => {
			const fixed = fixedMap.get(data.value);
			if (fixed) {
				fixedMap.delete(data.value);
			} else {
				fixedMap.set(data.value, 'left');
			}
			doSortOptions();
		};

		const doSortOptions = () => {
			const SortMap = {
				left: -1,
				right: 1,
			};
			options.value = options.value
				.sort((a, b) => {
					const aSort = SortMap[fixedMap.get(a.value)] || 0;
					const bSort = SortMap[fixedMap.get(b.value)] || 0;
					if (aSort !== bSort) {
						return aSort - bSort > 0 ? 1 : -1;
					} else {
						return a.sort - b.sort > 0 ? 1 : -1;
					}
				})
				.map((v, index) => {
					if (fixedMap.get(v.value)) {
						v.disabled = true;
					} else {
						v.disabled = false;
					}
					v.sort = baseIndex + index + 1;
					return v;
				});
		};

		const render = () => {
			const slots = {
				item: (data, type) => {
					if (type === 'target') {
						const fixed = fixedMap.get(data.value);
						return (
							<div class={['col-settings-item', fixed ? 'lock' : 'unlock']}>
								<span class="col-label" title={data.label}>
									{data.label}
								</span>
								{fixed === 'right' ? null : (
									<Button
										type="text"
										class="lock-btn"
										onClick={(event: MouseEvent) => {
											event.stopPropagation();
											event.preventDefault();
											handleLock(data);
										}}
									>
										{{ icon: () => (fixed ? <IconLock /> : <IconUnlock />) }}
									</Button>
								)}
							</div>
						);
					} else {
						return `${data.label}`;
					}
				},
			};
			return (
				<div class="col-settings-pop">
					<Transfer
						style="height: 420px"
						title={['不显示列', '显示列']}
						data={options.value}
						draggable={{
							onEnd(e) {
								doSortOptions();
							},
						}}
						modelValue={selected.value}
						onUpdate:modelValue={value => {
							selected.value = value;
						}}
						v-slots={slots}
					/>
					<p style="color: var(--color-text-3); margin-top: 12px">勾选字段，点击【&gt;】【&lt;】按钮移入对应列方可生效</p>
				</div>
			);
		};
		const beforeOk = async () => {
			const visibleData: Record<string, boolean> = storeData.visibleData || {};
			const sortData: Record<string, number> = storeData.sortData || {};
			const fixedData: Record<string, VxeColumnPropTypes.Fixed> = storeData.fixedData || {};
			options.value.forEach(el => {
				const visible = selected.value.includes(el.value);
				visibleData[el.value] = visible;
				sortData[el.value] = el.sort;
				if (fixedMap.get(el.value)) {
					fixedData[el.value] = fixedMap.get(el.value);
				} else {
					delete fixedData[el.value];
				}
			});
			storeData.visibleData = visibleData;
			storeData.sortData = sortData;
			storeData.fixedData = fixedData;
			columnInfo.fullColumn.forEach((column, index) => {
				const fixed = fixedMap.get(column.getKey());
				if (fixed) {
					column.fixed = fixed;
				} else {
					column.fixed = '';
				}
			});
			gridInstance.setCustomStoreData(storeData);
			return {};
		};
		onMounted(() => {
			doSortOptions();
		});
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
 * 打开表单配置
 * @param props ColSettingsPopPros
 * @returns
 */
export function createColSettingsPop(gridInstance: VxeGridInstance | VxeGridConstructor<any>) {
	return pop.createModal(
		_Component,
		{ gridInstance },
		{
			title: '列表配置',
		},
	);
}
