import { computed, defineComponent, onMounted, provide, reactive, toRaw, watch } from 'vue';
import { cloneDeep, pick } from 'lodash-es';
import { get, hasOwnProp, set } from 'xe-utils';
import { Button, Grid, IconFindReplace, IconList, InputTag, Popconfirm } from '@erp/common';
import { getId } from '../form/context';
import Input from '../input';
import { pop } from '../pop';
import { FormFieldComponent } from './form-field';
import { destroyTableFilterApi, getTableFilterInfoApi, storeTableFilterApi, updateTableFilterApi } from './api';
import { createFieldSettingsPop } from './field-settings-pop';
import { SearchFormContextKey } from './interface';
import type { FormFieldI, SearchFormI } from './interface';
import type { GridContextI } from '@erp/common';
import type { FieldSortDataI } from './field-settings-pop';
import type { FormButtonType } from '../form/interface';
import type { PropType } from 'vue';

const _Component = defineComponent({
	name: 'FilterForm',
	props: {
		/**
		 * @zh 绑定值
		 */
		modelValue: {
			type: Object as PropType<Record<string, any>>,
			default() {
				return {};
			},
		},

		/**
		 * @zh SearchForm 动态表单配置
		 */
		config: {
			type: Object as PropType<SearchFormI>,
		},

		/**
		 * loading
		 */
		loading: {
			type: Boolean,
			default: false,
		},
	},
	emits: {
		'update:modelValue': (value: Record<string, any>) => true,
		click: (button: FormButtonType) => true,
		/**
		 * 查询组件重置
		 * @param model
		 * @returns
		 */
		reset: (model: Record<string, any>) => true,
		/**
		 * 触发筛选
		 * @param model
		 * @returns
		 */
		query: (model: Record<string, any>) => true,
		/**
		 * 值改变
		 * @param value
		 * @param field
		 * @returns
		 */
		change: (value: any, field: FormFieldI) => true,
		/**
		 * 配置筛选项
		 * @param evt
		 * @returns
		 */
		'column-settings': (evt: MouseEvent) => true,
	},

	setup(props, { emit, slots, attrs }) {
		const config = props.config;
		const model = cloneDeep(toRaw(props.modelValue));
		const innerState = reactive<{
			collapsed: boolean;
			canCollapse: boolean;
			storeData: FieldSortDataI;
		}>({
			collapsed: true,
			canCollapse: false,
			storeData: {
				sortData: {},
				visibleData: {},
			},
		});

		provide(SearchFormContextKey, {
			components: config.components,
			slots,
		});

		const fields = computed(() => {
			return config.fields
				.filter(field => {
					return !(innerState.storeData.visibleData[field.key] === false);
				})
				.sort((x, y) => {
					return innerState.storeData.sortData?.[x.key] - innerState.storeData.sortData?.[y.key] > 0 ? 1 : -1;
				});
		});

		const clazz = computed(() => {
			const out: string[] = ['filter-form'];
			if (config.labelLayout) {
				out.push(`label-layout-${config.labelLayout}`);
			}
			if (config.queryPool) {
				out.push(`query-pool-form`);
			}
			return out;
		});

		const formatConfig = () => {
			if (!config.gridProps) {
				config.gridProps = {
					cols: {
						xxl: 7,
						xl: 6,
						lg: 5,
						md: 4,
						sm: 3,
						xs: 2,
					},
					colGap: 14,
					rowGap: 10,
					collapsedRows: 2,
				};
			}
			config.fields = (config.fields || []).map((field, index) => {
				field.$id = field.$id ?? getId('filter-form-field');
				innerState.storeData.sortData[field.key] = index;
				return reactive(field);
			});
		};

		/**
		 * 查询
		 */
		const handleQuery = (evt: MouseEvent) => {
			evt.stopPropagation();
			evt.preventDefault();
			emit('query', props.modelValue);
		};

		/**
		 * 查询重置
		 */
		const handleReset = () => {
			console.log('handleReset');
			/** 重置数据 */
			config.fields.forEach(field => {
				set(props.modelValue, field.key, get(model, field.key));
			});
			// emit(UPDATE_MODEL, cloneDeep(model));
			emit('reset', props.modelValue);
		};

		/**
		 * 筛选项展开或收起
		 */
		const handleExpand = () => {
			innerState.collapsed = !innerState.collapsed;
		};

		/**
		 * 是否可以展开搜索
		 * @param canCollapse
		 */
		const handleLayoutChange = (gridContext: GridContextI) => {
			innerState.canCollapse = gridContext.canCollapse;
			if (!gridContext.canCollapse) {
				innerState.collapsed = false;
			}
			console.log('handleLayoutChange >>', gridContext);
		};

		const suffixSpan = computed(() => {
			if (props.config.suffixSpan) {
				return props.config.suffixSpan;
			}
			let span = 1;
			if (config.queryPool) {
				span++;
			}
			if (innerState.canCollapse) {
				// span++;
			}
			return span;
		});

		const suffix = computed(() => {
			if (config.queryPool && !innerState.collapsed) {
				return false;
			}
			return true;
		});

		const renderButton = () => {
			return (
				<Grid.Item span={suffixSpan.value} suffix={suffix.value} key="suffix" class={['suffix-btns btns', { 'has-pool': !!config.queryPool }]}>
					{innerState.canCollapse ? (
						<Button key="expand" size="small" type="text" onClick={handleExpand}>
							{innerState.collapsed ? '展开' : '收起'}
						</Button>
					) : null}
					<Button key="query" loading={props.loading} type="primary" htmlType="submit" onClick={handleQuery}>
						查询
					</Button>
					<Button key="reset" loading={props.loading} htmlType="reset" onClick={handleReset}>
						重置
					</Button>
					{config.queryPool && renderQueryPool()}
				</Grid.Item>
			);
		};

		const handleSaveQueryPool = close => {
			const name = queryPoolModel.name.trim();
			if (!name) {
				pop.warning(`请确保填入模板名称！`);
				close(false);
				return;
			}
			const params = {
				table_name: props.config.queryPool,
				name,
				form: props.modelValue,
				list: props.config.fields.map(v => {
					const item: any = pick(v, ['key', 'label', 'type', '$id']);
					item.$sort = innerState.storeData.sortData[v.key];
					item.$hide = innerState.storeData.visibleData[v.key] === false;
					return item;
				}),
				type: 2,
			};
			queryPoolModel.loading = true;
			storeTableFilterApi(params)
				.then(res => {
					close(res);
					pop.success('保存查询池成功！');
					queryPoolModel.name = '';
					initQueryPool();
				})
				.catch(() => {
					close(false);
				})
				.finally(() => {
					queryPoolModel.loading = false;
				});
		};

		const handleQueryPoolDelete = (id: number) => {
			console.log('handleQueryPoolDelete >>', id);
			const find = queryPoolModel.list.find(v => v.id == id);
			pop.confirm(`确定要删除该条数据【${find.name}】吗？`).then(res => {
				const loading = pop.loading();
				destroyTableFilterApi(id)
					.then(res => {
						pop.success('删除成功！');
						const findIndex = queryPoolModel.list.findIndex(v => v.id == id);
						if (findIndex > -1) {
							queryPoolModel.list.splice(findIndex, 1);
						}
					})
					.finally(() => {
						loading.close();
					});
			});
		};

		const handleTagClick = (id: number) => {
			const find = queryPoolModel.list.find(v => v.id == id);
			if (find) {
				setFilterModel(find);
			}
		};

		const setFilterModel = storeModel => {
			config.fields.forEach(field => {
				if (hasOwnProp(storeModel.form, field.key)) {
					set(props.modelValue, field.key, get(storeModel.form, field.key));
				}
				// TODO 隐藏、顺序
				const item = storeModel.list?.find(v => v.key === field.key);
				if (item) {
					innerState.storeData.visibleData[field.key] = !(item.$hide === true);
					innerState.storeData.sortData[field.key] = item.$sort;
				}
			});
			// innerState.collapsed = false;
			emit('query', props.modelValue);
		};

		/**
		 * 配置筛选选项
		 */
		const handleColumnSettings = (evt: MouseEvent) => {
			createFieldSettingsPop({
				fields: config.fields,
				storeData: innerState.storeData,
			}).then(storeData => {
				const loading = pop.loading();
				const params = {
					id: queryPoolModel.defaultId,
					table_name: props.config.queryPool,
					name: '',
					form: props.modelValue,
					list: props.config.fields.map(v => {
						const item: any = pick(v, ['key', 'label', 'type', '$id']);
						item.$sort = storeData.sortData[v.key];
						item.$hide = storeData.visibleData[v.key] === false;
						return item;
					}),
					type: 1,
				};
				let actionApi = updateTableFilterApi;
				if (!queryPoolModel.defaultId) {
					actionApi = storeTableFilterApi;
				}
				actionApi(params)
					.then(res => {
						pop.success('保存成功');
						innerState.storeData = storeData;
					})
					.finally(() => {
						loading.close();

						if (!queryPoolModel.defaultId) {
							initQueryPool();
						}
					});
			});
		};

		const initQueryPool = () => {
			if (props.config.queryPool) {
				getTableFilterInfoApi(props.config.queryPool).then(res => {
					queryPoolModel.list = (res.normal || []).reverse();
					const defaultModel = res.default?.[0];
					queryPoolModel.defaultId = defaultModel?.id;
					if (defaultModel) {
						setFilterModel(defaultModel);
					}
				});
			}
		};

		const queryPoolModel = reactive({
			defaultId: '',
			name: '',
			loading: false,
			list: [],
		});

		const queryPoolTags = computed(() => {
			const out = [];
			queryPoolModel.list.forEach(el => {
				out.push({
					value: el.id,
					label: el.name,
					closable: true,
				});
			});
			return out;
		});

		const renderQueryPool = () => {
			return (
				<div key="query-pool" class="query-pool-wrap btns">
					<Popconfirm
						position="bottom"
						title="保存查询池"
						type="info"
						okText="保存"
						v-slots={{
							content: () => (
								<Input
									type="text"
									style="width: 220px;"
									modelValue={queryPoolModel.name}
									// @ts-ignore
									size="small"
									placeholder="输入查询条件组名称"
									onUpdate:modelValue={(value: string) => (queryPoolModel.name = value)}
									maxLength={25}
								></Input>
							),
						}}
						onBeforeOk={handleSaveQueryPool}
					>
						<Button loading={queryPoolModel.loading} class="btn query-pool-btn" v-slots={{ icon: () => <IconFindReplace /> }} />
					</Popconfirm>
					<Button class="btn col-settings-btn" v-slots={{ icon: () => <IconList /> }} onClick={handleColumnSettings} />
					<InputTag
						disabledInput
						class="query-pool-tags"
						onRemove={handleQueryPoolDelete}
						onTagClick={handleTagClick}
						modelValue={queryPoolTags.value}
					></InputTag>
				</div>
			);
		};

		const renderBody = () => {
			const gridItems = fields.value.map(field => {
				return (
					<Grid.Item key={field.$id} span={field.span}>
						<FormFieldComponent
							key={field.$id}
							// @ts-ignore
							id={field.$id}
							model={props.modelValue}
							field={field}
							onChange={value => emit('change', value, field)}
							labelLayout={config.labelLayout}
						></FormFieldComponent>
					</Grid.Item>
				);
			});
			gridItems.push(renderButton());
			if (config.queryPool) {
				// gridItems.push(renderQueryPool());
			}
			return gridItems;
		};

		const render = () => {
			return (
				<form onSubmit={handleQuery}>
					<Grid class={clazz.value} collapsedRows={2} {...config.gridProps} collapsed={innerState.collapsed} onLayout={handleLayoutChange}>
						{renderBody()}
					</Grid>
				</form>
			);
		};
		formatConfig();

		onMounted(() => {
			initQueryPool();
		});
		return {
			render,
		};
	},

	render() {
		return this.render();
	},
});

export default _Component;
