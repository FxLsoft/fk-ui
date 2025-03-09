import { computed, defineComponent, nextTick, onMounted, provide, reactive, ref, toRaw, watch } from 'vue';
import { get, hasOwnProp, isEqual, set } from 'xe-utils';
import { cloneDeep, pick } from 'lodash-es';
import scrollIntoView from 'scroll-into-view-if-needed';
import {
	Button,
	IconCheckCircle,
	IconDelete,
	IconDragDotVertical,
	IconFindReplace,
	IconList,
	IconMenuFold,
	IconMenuUnfold,
	List,
	Scrollbar,
	Tooltip,
	Trigger,
	throttleByRaf,
} from '@erp/common';
import { getId } from '../form/context';
import Input from '../input';
import { pop } from '../pop';
import { getDraggableProps } from '../../utils';
import { FormFieldComponent } from './form-field';
import { createFieldSettingsPop } from './field-settings-pop';
import { destroyTableFilterApi, getTableFilterInfoApi, storeTableFilterApi, updateTableFilterApi, updateTableFilterSortApi } from './api';
import { type FormFieldI, SearchFormContextKey, type SearchFormI } from './interface';
import type { FieldSortDataI } from './field-settings-pop';
import type { FormButtonType } from '../form/interface';
import type { ScrollbarInstance } from '@erp/common';
import type { PropType } from 'vue';

const _Component = defineComponent({
	name: 'SearchForm',
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
		 * @zh 展开收起
		 */
		expand: {
			type: Boolean,
		},
		/**
		 * 查询按钮的loading
		 */
		loading: {
			type: Boolean,
		},
	},

	emits: {
		'update:modelValue': (value: Record<string, any>) => true,
		'update:expand': (value: boolean) => true,
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
	},

	setup(props, { emit, slots, attrs }) {
		const config = props.config;
		const model = cloneDeep(toRaw(props.modelValue));
		const root = ref<HTMLElement>();
		const bodyScrollbar = ref<ScrollbarInstance>();
		const currentIndex = ref(0);
		const isClose = ref(props.expand);
		const popupVisible = ref(false);

		provide(SearchFormContextKey, {
			components: config.components,
			slots,
		});

		const innerState = reactive<{
			collapsed: boolean;
			storeData: FieldSortDataI;
		}>({
			collapsed: false,
			storeData: {
				sortData: {},
				visibleData: {},
			},
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

		const formatConfig = () => {
			config.fields = (config.fields || []).map((field, index) => {
				field.$id = field.$id ?? getId('search-form-field');
				innerState.storeData.sortData[field.key] = index;
				return reactive(field);
			});
		};

		const popupVisibleChange = (visible: boolean) => {
			if (!visible) {
				popupVisible.value = false;
			}
		};

		/**
		 * 打开查询池
		 */
		const handleOpenQueryPool = () => {
			const id = 'QueryPoolDrawer';
			const instance = pop.hasDrawer(id);
			if (instance) {
				instance.close();
			} else {
				pop.createDrawer(QueryPool, {
					id,
					popupContainer: root.value.querySelector('.search-form-body') as HTMLElement,
					width: '100%',
					placement: 'bottom',
					footer: false,
					header: false,
					model: {
						queryPool: config.queryPool,
						getParams() {
							return {
								table_name: props.config.queryPool,
								form: props.modelValue,
								list: props.config.fields.map(v => {
									const item: any = pick(v, ['key', 'label', 'type', '$id']);
									item.$sort = innerState.storeData.sortData[v.key];
									item.$hide = innerState.storeData.visibleData[v.key] === false;
									return item;
								}),
								type: 2,
							};
						},
					},
				}).then((res: any) => {
					setFilterModel(res);
				});
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
			emit('query', props.modelValue);
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
		 * 展开
		 */
		const handleExpand = () => {
			isClose.value = !isClose.value;
			nextTick(() => {
				popupVisible.value = false;
			});
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

		const renderHeader = () => {
			return (
				<div key="search-form-header" class="search-form-header">
					<Button loading={props.loading} size="mini" class="query-btn" type="primary" htmlType="submit" onClick={handleQuery}>
						筛选
					</Button>
					<Button size="mini" type="text" class="reset-btn" onClick={handleReset}>
						重置
					</Button>
					<Tooltip content="收缩筛选栏">
						<Button size="mini" class="fold-btn" onClick={handleExpand} v-slots={{ icon: () => <IconMenuFold /> }}></Button>
					</Tooltip>
				</div>
			);
		};

		const renderBody = () => {
			return (
				<Scrollbar ref={bodyScrollbar} onScroll={handleRootScroll} style="overflow: auto;height: 100%;padding: 8px;">
					{fields.value.map(field => {
						return (
							<FormFieldComponent
								key={field.$id}
								id={field.$id}
								model={props.modelValue}
								field={field}
								size="mini"
								onChange={value => emit('change', value, field)}
								labelLayout="expand"
							></FormFieldComponent>
						);
					})}
				</Scrollbar>
			);
		};

		const renderFooter = () => {
			return (
				<div key="search-form-footer" class="search-form-footer">
					<Button class="btn" onClick={handleOpenQueryPool} v-slots={{ icon: () => <IconFindReplace />, default: () => '查询池' }} />
					<Button class="btn" onClick={evt => handleColumnSettings(evt)} v-slots={{ icon: () => <IconList />, default: () => '配置筛选选项' }} />
				</div>
			);
		};

		const navList = computed(() => {
			const out: {
				id?: string;
				label: string;
				key: string;
				type: string;
				checked: boolean;
				hasFilter: boolean;
			}[] = [
				{
					label: '-- 顶部 --',
					key: '',
					type: 'other',
					checked: false,
					hasFilter: false,
				},
			];
			fields.value
				.filter(field => field.label)
				.forEach(field => {
					out.push({
						id: field.$id,
						label: field.label,
						key: field.key,
						type: field.type,
						hasFilter: !isEqual(get(model, field.key), get(props.modelValue, field.key)),
						checked: false,
					});
				});
			return out;
		});

		const handleNav = (item, index) => {
			const el = bodyScrollbar.value?.containerRef;
			if (item.id && el) {
				const node = el.querySelector(`#${item.id}`);
				scrollIntoView(node as HTMLDivElement, {
					behavior: 'smooth',
					block: 'start',
					scrollMode: 'always',
					boundary: el,
				});
				currentIndex.value = index;
				const isFocusEls = el.querySelectorAll('.is-focus');
				isFocusEls.forEach(node => {
					node.classList.remove('is-focus');
				});
				node.classList.add('is-focus');
				const animationend = () => {
					node.classList.remove('is-focus');
					node.removeEventListener('animationend', animationend);
				};
				node.addEventListener('animationend', animationend);
			} else {
				currentIndex.value = 0;
				bodyScrollbar.value.scrollTop(0);
			}

			if (scrollTimeoutId) clearTimeout(scrollTimeoutId);
			scrollTimeoutId = setTimeout(() => {
				scrollTimeoutId = 0;
			}, 1000);
		};
		let scrollTimeoutId: number;
		const handleRootScroll = throttleByRaf((evt: UIEvent) => {
			if (isClose.value) {
				popupVisible.value = false;
				return;
			}
			popupVisible.value = true;
			if (scrollTimeoutId) return;
			updateSideStyle();
		});

		const updateSideStyle = () => {
			const el = bodyScrollbar.value.containerRef;
			const groupEls: HTMLElement[] = Array.from(el.querySelectorAll('.field-wrap'));
			const exceedFactor = 0.3;
			for (let i = 0; i < groupEls.length; i++) {
				const groupEl = groupEls[i];
				let topStart = groupEl.offsetTop - el.offsetTop;
				const topEnd = groupEl.offsetHeight * exceedFactor + topStart;
				topStart = topStart - el.offsetHeight * exceedFactor;
				if (el.scrollTop >= topStart && el.scrollTop < topEnd) {
					currentIndex.value = i + 1;
					break;
				}
			}
		};

		const navSlots = {
			item: ({ item, index }) => {
				return (
					<div
						onClick={() => handleNav(item, index)}
						class={{ 'search-form-nav-item': true, 'is-checked': currentIndex.value === index, 'is-other': item.type === 'other' }}
					>
						<span title={item.label}>{item.label}</span>
						{item.hasFilter && <IconCheckCircle class="check-icon" />}
					</div>
				);
			},
		};

		const renderNav = () => {
			return (
				<div class="search-form-nav">
					<List data={navList.value} v-slots={navSlots}></List>
				</div>
			);
		};

		const bodySlots = {
			default: () => renderBody(),
			content: () => renderNav(),
		};

		const queryPoolModel = reactive({
			loading: false,
			defaultId: '',
		});
		const initQueryPool = () => {
			if (props.config.queryPool) {
				getTableFilterInfoApi(props.config.queryPool).then(res => {
					const defaultModel = res.default?.[0];
					queryPoolModel.defaultId = defaultModel?.id;
					if (defaultModel) {
						setFilterModel(defaultModel);
					}
				});
			}
		};
		// 同步expand状态
		watch(
			() => isClose.value,
			() => {
				emit('update:expand', isClose.value);
			},
			{
				flush: 'post',
			},
		);

		onMounted(() => {
			initQueryPool();
		});

		const render = () => {
			return (
				<div ref={root} class={['search-form', { 'is-closed': isClose.value, 'query-pool-form': !!config.queryPool }]}>
					{isClose.value && (
						<Tooltip key="unfold-btn" content="展开筛选栏">
							<Button size="mini" class="unfold-btn" onClick={handleExpand} v-slots={{ icon: () => <IconMenuUnfold /> }}></Button>
						</Tooltip>
					)}
					<div class="search-form-inner">
						<form key="search-form-container" onSubmit={handleQuery} class="search-form-container">
							{renderHeader()}
							<div class="search-form-body" key="search-form-body">
								<Trigger
									trigger="click"
									position="right"
									clickToClose={false}
									popupVisible={popupVisible.value}
									// onUpdate:popupVisible={value => (popupVisible.value = value)}
									onPopupVisibleChange={value => popupVisibleChange(value)}
								>
									{bodySlots}
								</Trigger>
							</div>
							{props.config.queryPool && renderFooter()}
						</form>
					</div>
				</div>
			);
		};
		formatConfig();
		return {
			render,
		};
	},

	render() {
		return this.render();
	},
});

/**
 * 查询池功能
 */
const QueryPool = defineComponent({
	name: 'QueryPool',
	props: {
		queryPool: String,
		getParams: Function,
	},
	emits: {
		close: (params?: any) => true,
		ok: (params?: any) => true,
		loading: (l?: boolean) => true,
	},
	setup(props, { emit, slots, attrs }) {
		const root = ref<HTMLElement>();
		const queryPoolModel = reactive({
			defaultId: '',
			name: '',
			loading: true,
			list: [],
		});
		/**
		 * 拖拽排序
		 */
		const draggableProps = getDraggableProps('.draggable-btn', (from, to) => {
			const list = queryPoolModel.list.splice(+from.dataset.index, 1);
			queryPoolModel.list.splice(+to.dataset.index, 0, list[0]);
			queryPoolModel.loading = true;
			updateTableFilterSortApi(queryPoolModel.list.map(v => v.id).reverse())
				.then(res => {
					pop.success('更新排序成功');
				})
				.finally(() => {
					queryPoolModel.loading = false;
				});
		});

		const handleDelete = (item, index) => {
			pop.confirm(`确定要删除该条数据【${item.name}】吗？`).then(res => {
				const loading = pop.loading();
				destroyTableFilterApi(item.id)
					.then(res => {
						pop.success('删除成功！');
						queryPoolModel.list.splice(index, 1);
					})
					.finally(() => {
						loading.close();
					});
			});
		};

		const handlePressEnter = (evt: KeyboardEvent) => {
			const name = queryPoolModel.name.trim();
			if (!name) {
				pop.warning(`请确保填入模板名称！`);
				return;
			}
			const params = props.getParams();
			params.name = name;
			queryPoolModel.loading = true;
			storeTableFilterApi(params)
				.then(res => {
					pop.success('保存查询池成功！');
					initQueryPool();
					queryPoolModel.name = '';
				})
				.finally(() => {
					queryPoolModel.loading = false;
				});
		};

		const handleItemClick = item => {
			emit('ok', toRaw(item));
		};

		const listSlots = {
			item: ({ item, index }) => {
				return (
					<div class="query-pool-item" key={item.id} data-index={index} onClick={() => handleItemClick(item)} {...draggableProps}>
						<Tooltip overflowShow content={item.name}>
							<div class="query-pool-label">{item.name}</div>
						</Tooltip>
						<div class="query-pool-btns">
							<IconDelete
								class="btn delete-btn"
								onClick={evt => {
									evt.stopPropagation();
									handleDelete(item, index);
								}}
							/>
							<IconDragDotVertical class="btn draggable-btn" />
						</div>
					</div>
				);
			},
		};
		const render = () => {
			return (
				<div ref={root} class="search-form-query-pool">
					<div class="query-pool-header">
						<div class="query-pool-label">查询池</div>
					</div>
					<List
						class="query-pool-body"
						data={queryPoolModel.list}
						v-slots={listSlots}
						bordered={false}
						hoverable={true}
						draggable={true}
						maxHeight="100%"
						loading={queryPoolModel.loading}
					></List>
					<div class="query-pool-footer">
						<Input
							modelValue={queryPoolModel.name}
							onUpdate:modelValue={(value: any) => (queryPoolModel.name = value)}
							placeholder="输入名称后回车保存当前筛选配置"
							type="text"
							// @ts-ignore
							size="mini"
							onPressEnter={(evt: KeyboardEvent) => handlePressEnter(evt)}
							maxLength={25}
						></Input>
					</div>
				</div>
			);
		};
		const initQueryPool = () => {
			getTableFilterInfoApi(props.queryPool)
				.then(res => {
					queryPoolModel.list = (res.normal || []).reverse();
				})
				.finally(() => {
					queryPoolModel.loading = false;
				});
		};
		initQueryPool();
		return {
			render,
		};
	},
	render() {
		return this.render();
	},
});

export default _Component;
