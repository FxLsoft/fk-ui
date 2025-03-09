import { computed, createCommentVNode, defineComponent, h, inject, nextTick, reactive, ref } from 'vue';
import XEUtils, { isFunction } from 'xe-utils';
import { VxeUI } from '../../ui';
import { getSlotVNs } from '../../ui/src/vn';
import { errLog, warnLog } from '../../ui/src/log';
import type { PropType, Ref, VNode } from 'vue';

import type {
	GridPrivateMethods,
	ToolbarMethods,
	ToolbarPrivateRef,
	ToolbarReactData,
	VxeGridConstructor,
	VxeTableConstructor,
	VxeTableMethods,
	VxeTablePrivateMethods,
	VxeToolbarConstructor,
	VxeToolbarEmits,
	VxeToolbarPropTypes,
} from '../../types';

const { getConfig, getIcon, getI18n, renderer, commands, createEvent, useFns } = VxeUI;

export default defineComponent({
	name: 'VxeToolbar',
	props: {
		loading: Boolean,
		refresh: [Boolean, Object] as PropType<VxeToolbarPropTypes.Refresh>,
		import: [Boolean, Object] as PropType<VxeToolbarPropTypes.Import>,
		export: [Boolean, Object] as PropType<VxeToolbarPropTypes.Export>,
		print: [Boolean, Object] as PropType<VxeToolbarPropTypes.Print>,
		zoom: [Boolean, Object] as PropType<VxeToolbarPropTypes.Zoom>,
		custom: [Boolean, Object] as PropType<VxeToolbarPropTypes.Custom>,
		buttons: { type: Array as PropType<VxeToolbarPropTypes.Buttons>, default: () => getConfig().toolbar.buttons },
		tools: { type: Array as PropType<VxeToolbarPropTypes.Tools>, default: () => getConfig().toolbar.tools },
		perfect: { type: Boolean as PropType<VxeToolbarPropTypes.Perfect>, default: () => getConfig().toolbar.perfect },
		size: { type: String as PropType<VxeToolbarPropTypes.Size>, default: () => getConfig().toolbar.size || getConfig().size },
		className: [String, Function] as PropType<VxeToolbarPropTypes.ClassName>,
	},
	emits: ['button-click', 'tool-click'] as VxeToolbarEmits,
	setup(props, context) {
		const { slots, emit } = context;

		const xID = XEUtils.uniqueId();

		// 使用已安装的组件，如果未安装则不渲染
		const VxeUIButtonComponent = VxeUI.getComponent('Button');
		const VxeUIDropdownComponent = VxeUI.getComponent('Dropdown');
		const { computeSize } = useFns.useSize(props);

		const reactData = reactive<ToolbarReactData>({
			isRefresh: false,
			columns: [],
		});

		const refElem = ref() as Ref<HTMLDivElement>;

		const refMaps: ToolbarPrivateRef = {
			refElem,
		};

		const $xeToolbar = {
			xID,
			props,
			context,
			reactData,
			getRefMaps: () => refMaps,
		} as unknown as VxeToolbarConstructor;

		let toolbarMethods = {} as ToolbarMethods;

		const $xeGrid = inject('$xeGrid', null as (VxeGridConstructor & GridPrivateMethods) | null);
		const refTable = ref<VxeTableConstructor & VxeTableMethods & VxeTablePrivateMethods>();

		const connectFlag = ref(0);

		const computeRefreshOpts = computed(() => {
			return Object.assign({}, getConfig().toolbar.refresh, props.refresh) as VxeToolbarPropTypes.RefreshOpts;
		});

		const computeImportOpts = computed(() => {
			return Object.assign({}, getConfig().toolbar.import, props.import) as VxeToolbarPropTypes.ImportOpts;
		});

		const computeExportOpts = computed(() => {
			return Object.assign({}, getConfig().toolbar.export, props.export) as VxeToolbarPropTypes.ExportOpts;
		});

		const computePrintOpts = computed(() => {
			return Object.assign({}, getConfig().toolbar.print, props.print) as VxeToolbarPropTypes.PrintOpts;
		});

		const computeZoomOpts = computed(() => {
			return Object.assign({}, getConfig().toolbar.zoom, props.zoom) as VxeToolbarPropTypes.ZoomOpts;
		});

		const computeCustomOpts = computed(() => {
			return Object.assign({}, getConfig().toolbar.custom, props.custom) as VxeToolbarPropTypes.CustomOpts;
		});

		const computeTableCustomOpts = computed(() => {
			const $table = refTable.value;
			if (connectFlag.value || $table) {
				if ($table) {
					const { computeCustomOpts } = $table.getComputeMaps();
					return computeCustomOpts.value;
				}
			}
			return { trigger: '' };
		});

		const computeTrigger = computed(() => {
			const tableCustomOpts = computeTableCustomOpts.value;
			return tableCustomOpts.trigger;
		});

		const checkTable = () => {
			const $table = refTable.value;
			if ($table) {
				return true;
			}
			errLog('vxe.error.barUnableLink');
		};

		const handleClickSettingEvent = ($event: any) => {
			const $table = refTable.value;
			if ($table) {
				if ($table.triggerCustomEvent) {
					$table.triggerCustomEvent($event);
				} else {
					errLog('vxe.error.reqModule', ['VxeTableCustomModule']);
				}
			}
		};

		const handleMouseenterSettingEvent = ($event: any) => {
			const $table = refTable.value;
			if ($table) {
				$table.customOpenEvent($event);
			} else {
				errLog('vxe.error.reqModule', ['VxeTableCustomModule']);
			}
		};

		const handleMouseleaveSettingEvent = ($event: any) => {
			const $table = refTable.value;
			if ($table) {
				const { customStore } = $table.reactData;
				customStore.activeBtn = false;
				setTimeout(() => {
					if (!customStore.activeBtn && !customStore.activeWrapper) {
						$table.customCloseEvent($event);
					}
				}, 350);
			}
		};

		const refreshEvent = $event => {
			const { isRefresh } = reactData;
			const refreshOpts = computeRefreshOpts.value;
			if (!isRefresh) {
				const queryMethod = refreshOpts.queryMethod;
				if (queryMethod) {
					reactData.isRefresh = true;
					try {
						Promise.resolve(queryMethod({}))
							.catch(e => e)
							.then(() => {
								reactData.isRefresh = false;
							});
					} catch {
						reactData.isRefresh = false;
					}
				} else if ($xeGrid) {
					reactData.isRefresh = true;
					$xeGrid
						.triggerToolbarCommitEvent({ code: refreshOpts.code || 'reload' }, $event)
						.catch(e => e)
						.then(() => {
							reactData.isRefresh = false;
						});
				}
			}
		};

		const zoomEvent = $event => {
			if ($xeGrid) {
				$xeGrid.triggerZoomEvent($event);
			}
		};

		const btnEvent = (evnt: Event, item: VxeToolbarPropTypes.ButtonConfig) => {
			const $table = refTable.value;
			const { code } = item;
			if (code) {
				if ($xeGrid) {
					$xeGrid.triggerToolbarBtnEvent(item, evnt);
				} else {
					const gCommandOpts = commands.get(code);
					const params = { code, button: item, $table: $table!, $grid: $xeGrid, $event: evnt };
					if (gCommandOpts) {
						const tCommandMethod = gCommandOpts.tableCommandMethod;
						if (tCommandMethod) {
							tCommandMethod(params);
						}
					}
					$xeToolbar.dispatchEvent('button-click', params, evnt);
				}
			}
		};

		const tolEvent = (evnt: Event, item: VxeToolbarPropTypes.ButtonConfig) => {
			const $table = refTable.value;
			const { code } = item;
			if (code) {
				if ($xeGrid) {
					$xeGrid.triggerToolbarTolEvent(item, evnt);
				} else {
					const gCommandOpts = commands.get(code);
					const params = { code, tool: item, $table: $table!, $grid: $xeGrid, $event: evnt };
					if (gCommandOpts) {
						const tCommandMethod = gCommandOpts.tableCommandMethod;
						if (tCommandMethod) {
							tCommandMethod(params);
						}
					}
					$xeToolbar.dispatchEvent('tool-click', params, evnt);
				}
			}
		};

		const importEvent = () => {
			if (checkTable()) {
				const $table = refTable.value;
				if ($table) {
					$table.openImport();
				}
			}
		};

		const exportEvent = () => {
			if (checkTable()) {
				const $table = refTable.value;
				if ($table) {
					$table.openExport();
				}
			}
		};

		const printEvent = () => {
			if (checkTable()) {
				const $table = refTable.value;
				if ($table) {
					$table.openPrint();
				}
			}
		};

		const renderDropdowns = (item: VxeToolbarPropTypes.ButtonConfig, isBtn: boolean) => {
			const { dropdowns } = item;
			const downVNs: VNode[] = [];
			if (dropdowns) {
				return dropdowns.map((child, index) => {
					if (child.visible === false) {
						return createCommentVNode();
					}
					return h(VxeUIDropdownComponent.Option, {
						disabled: child.disabled,
						value: child.code,
						icon: child.icon,
						label: child.label,
						onClick: $event => (isBtn ? btnEvent($event, child) : tolEvent($event, child)),
					});
				});
			}
			return downVNs;
		};

		/**
		 * 渲染按钮
		 */
		const renderBtns = () => {
			const { buttons } = props;
			const $table = refTable.value;
			const buttonsSlot = slots.buttons;
			if (buttonsSlot) {
				return getSlotVNs(buttonsSlot({ $grid: $xeGrid, $table }));
			}
			const btnVNs: VNode[] = [];
			if (buttons) {
				buttons.forEach(item => {
					const { dropdowns, buttonRender } = item;
					if (isFunction(item.visible) ? item.visible() : item.visible !== false) {
						const compConf = buttonRender ? renderer.get(buttonRender.name) : null;
						if (buttonRender && compConf && compConf.renderToolbarButton) {
							const toolbarButtonClassName = compConf.toolbarButtonClassName;
							const params = { $grid: $xeGrid, $table: $table!, button: item };
							btnVNs.push(
								h(
									'span',
									{
										class: [
											'vxe-button--item',
											toolbarButtonClassName
												? XEUtils.isFunction(toolbarButtonClassName)
													? toolbarButtonClassName(params)
													: toolbarButtonClassName
												: '',
										],
									},
									getSlotVNs(compConf.renderToolbarButton(buttonRender, params)),
								),
							);
						} else {
							if (dropdowns && dropdowns.length && VxeUIDropdownComponent) {
								btnVNs.push(
									h(
										VxeUIDropdownComponent.Button,
										{
											disabled: item.disabled,
											loading: item.loading,
											type: item.type,
											label: item.label,
											shape: item.shape,
											icon: item.icon,
											status: item.status,
											class: 'vxe-toolbar-item',
											onClick: $event => btnEvent($event, item),
										},
										{
											content: () => renderDropdowns(item, true),
										},
									),
								);
							} else if (VxeUIButtonComponent) {
								btnVNs.push(
									h(VxeUIButtonComponent, {
										disabled: item.disabled,
										loading: item.loading,
										type: item.type,
										label: item.label,
										shape: item.shape,
										icon: item.icon,
										status: item.status,
										class: 'vxe-toolbar-item',
										onClick: $event => btnEvent($event, item),
									}),
								);
							}
						}
					}
				});
			}
			return btnVNs;
		};

		/**
		 * 渲染右侧工具
		 */
		const renderRightTools = () => {
			const { tools } = props;
			const $table = refTable.value;
			const toolsSlot = slots.tools;
			if (toolsSlot) {
				return getSlotVNs(toolsSlot({ $grid: $xeGrid, $table }));
			}
			const btnVNs: VNode[] = [];
			if (tools) {
				tools.forEach((item, tIndex) => {
					const { dropdowns, toolRender } = item;
					if (isFunction(item.visible) ? item.visible() : item.visible !== false) {
						const rdName = toolRender ? toolRender.name : null;
						const compConf = toolRender ? renderer.get(rdName) : null;
						if (toolRender && compConf && compConf.renderToolbarTool) {
							const toolbarToolClassName = compConf.toolbarToolClassName;
							const params = { $grid: $xeGrid, $table: $table!, tool: item };
							btnVNs.push(
								h(
									'span',
									{
										key: rdName as string,
										class: [
											'vxe-tool--item',
											toolbarToolClassName
												? XEUtils.isFunction(toolbarToolClassName)
													? toolbarToolClassName(params)
													: toolbarToolClassName
												: '',
										],
									},
									getSlotVNs(compConf.renderToolbarTool(toolRender, params)),
								),
							);
						} else {
							if (dropdowns && dropdowns.length && VxeUIDropdownComponent) {
								btnVNs.push(
									h(
										VxeUIDropdownComponent.Button,
										{
											disabled: item.disabled,
											loading: item.loading,
											type: item.type,
											label: item.label,
											shape: item.shape,
											icon: item.icon,
											status: item.status,
											class: 'vxe-toolbar-item',
											onClick: $event => btnEvent($event, item),
										},
										{
											content: () => renderDropdowns(item, true),
										},
									),
								);
							} else if (VxeUIButtonComponent) {
								btnVNs.push(
									h(VxeUIButtonComponent, {
										key: tIndex,
										disabled: item.disabled,
										loading: item.loading,
										type: item.type,
										label: item.label,
										shape: item.shape,
										icon: item.icon,
										status: item.status,
										class: 'vxe-toolbar-item',
										onClick: $event => tolEvent($event, item),
									}),
								);
							}
						}
					}
				});
			}
			return btnVNs;
		};

		const renderToolImport = () => {
			const importOpts = computeImportOpts.value;
			return VxeUIButtonComponent
				? h(VxeUIButtonComponent, {
						key: 'import',
						shape: 'circle',
						icon: importOpts.icon || getIcon().TOOLBAR_TOOLS_IMPORT,
						title: getI18n('vxe.toolbar.import'),
						onClick: importEvent,
				  })
				: createCommentVNode();
		};

		const renderToolExport = () => {
			const exportOpts = computeExportOpts.value;
			return VxeUIButtonComponent
				? h(VxeUIButtonComponent, {
						key: 'export',
						shape: 'circle',
						icon: exportOpts.icon || getIcon().TOOLBAR_TOOLS_EXPORT,
						title: getI18n('vxe.toolbar.export'),
						onClick: exportEvent,
				  })
				: createCommentVNode();
		};

		const renderToolPrint = () => {
			const printOpts = computePrintOpts.value;
			return VxeUIButtonComponent
				? h(VxeUIButtonComponent, {
						key: 'print',
						shape: 'circle',
						icon: printOpts.icon || getIcon().TOOLBAR_TOOLS_PRINT,
						title: getI18n('vxe.toolbar.print'),
						onClick: printEvent,
				  })
				: createCommentVNode();
		};

		const renderToolRefresh = () => {
			const refreshOpts = computeRefreshOpts.value;
			return VxeUIButtonComponent
				? h(VxeUIButtonComponent, {
						key: 'refresh',
						shape: 'circle',
						icon: reactData.isRefresh
							? refreshOpts.iconLoading || getIcon().TOOLBAR_TOOLS_REFRESH_LOADING
							: refreshOpts.icon || getIcon().TOOLBAR_TOOLS_REFRESH,
						title: getI18n('vxe.toolbar.refresh'),
						onClick: refreshEvent,
				  })
				: createCommentVNode();
		};

		const renderToolZoom = () => {
			const zoomOpts = computeZoomOpts.value;
			return $xeGrid && VxeUIButtonComponent
				? h(VxeUIButtonComponent, {
						key: 'zoom',
						shape: 'circle',
						icon: $xeGrid.isMaximized()
							? zoomOpts.iconOut || getIcon().TOOLBAR_TOOLS_MINIMIZE
							: zoomOpts.iconIn || getIcon().TOOLBAR_TOOLS_FULLSCREEN,
						title: getI18n(`vxe.toolbar.zoom${$xeGrid.isMaximized() ? 'Out' : 'In'}`),
						onClick: zoomEvent,
				  })
				: createCommentVNode();
		};

		const renderToolCustom = () => {
			const customOpts = computeCustomOpts.value;
			const btnTrigger = computeTrigger.value;
			const customBtnOns: {
				onClick?: typeof handleClickSettingEvent;
				onMouseenter?: typeof handleMouseenterSettingEvent;
				onMouseleave?: typeof handleMouseleaveSettingEvent;
			} = {};
			if (btnTrigger === 'manual') {
				// 手动触发
			} else if (btnTrigger === 'hover') {
				// hover 触发
				customBtnOns.onMouseenter = handleMouseenterSettingEvent;
				customBtnOns.onMouseleave = handleMouseleaveSettingEvent;
			} else {
				// 点击触发
				customBtnOns.onClick = handleClickSettingEvent;
			}
			return VxeUIButtonComponent
				? h(VxeUIButtonComponent, {
						key: 'custom',
						shape: 'circle',
						icon: customOpts.icon || getIcon().TOOLBAR_TOOLS_CUSTOM,
						title: getI18n('vxe.toolbar.custom'),
						class: 'vxe-toolbar-custom-target',
						...customBtnOns,
				  })
				: createCommentVNode();
		};

		toolbarMethods = {
			dispatchEvent(type, params, evnt) {
				emit(type, createEvent(evnt, { $toolbar: $xeToolbar }, params));
			},
			syncUpdate(params) {
				const { collectColumn } = params;
				refTable.value = params.$table;
				reactData.columns = collectColumn;
				connectFlag.value++;
			},
		};

		Object.assign($xeToolbar, toolbarMethods);

		nextTick(() => {
			const { refresh } = props;
			const refreshOpts = computeRefreshOpts.value;
			const queryMethod = refreshOpts.queryMethod;
			if (refresh && !$xeGrid && !queryMethod) {
				warnLog('vxe.error.notFunc', ['queryMethod']);
			}
		});

		const renderVN = () => {
			const { perfect, loading, refresh, zoom, custom, className } = props;
			const vSize = computeSize.value;
			return h(
				'div',
				{
					ref: refElem,
					class: [
						'vxe-toolbar',
						className ? (XEUtils.isFunction(className) ? className({ $toolbar: $xeToolbar }) : className) : '',
						{
							[`size--${vSize}`]: vSize,
							'is--perfect': perfect,
							'is--loading': loading,
						},
					],
				},
				[
					h(
						'div',
						{
							class: 'vxe-buttons--wrapper',
						},
						renderBtns(),
					),
					h(
						'div',
						{
							class: 'vxe-tools--wrapper',
						},
						renderRightTools(),
					),
					h(
						'div',
						{
							class: 'vxe-tools--operate',
						},
						[
							props.import ? renderToolImport() : createCommentVNode(),
							props.export ? renderToolExport() : createCommentVNode(),
							props.print ? renderToolPrint() : createCommentVNode(),
							refresh ? renderToolRefresh() : createCommentVNode(),
							zoom && $xeGrid ? renderToolZoom() : createCommentVNode(),
							custom ? renderToolCustom() : createCommentVNode(),
						],
					),
				],
			);
		};

		$xeToolbar.renderVN = renderVN;

		return $xeToolbar;
	},
	render() {
		return this.renderVN();
	},
});
