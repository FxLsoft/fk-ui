import { createCommentVNode, defineComponent, h, inject, nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
import XEUtils from 'xe-utils';
import { addClass, getOffsetPos, hasClass, removeClass } from '../../ui/src/dom';
import { VxeUI } from '../../ui';
import { isEnableConf } from '../../ui/src/utils';
import { getSlotVNs } from '../../ui/src/vn';
import { convertHeaderColumnToRows, getColReMinWidth } from './util';
import type { PropType, Ref } from 'vue';

import type { VxeColumnPropTypes, VxeTableConstructor, VxeTableDefines, VxeTableMethods, VxeTablePrivateMethods } from '../../types';

const renderType = 'header';

const { renderer, hooks } = VxeUI;

export default defineComponent({
	name: 'VxeTableHeader',
	props: {
		tableData: Array as PropType<any[]>,
		tableColumn: Array as PropType<VxeTableDefines.ColumnInfo[]>,
		tableGroupColumn: Array as PropType<VxeTableDefines.ColumnInfo[]>,
		fixedColumn: Array as PropType<VxeTableDefines.ColumnInfo[]>,
		fixedType: { type: String as PropType<VxeColumnPropTypes.Fixed>, default: null },
	},
	setup(props) {
		const $xeTable = inject('$xeTable', {} as VxeTableConstructor & VxeTableMethods & VxeTablePrivateMethods);

		const { xID, props: tableProps, reactData: tableReactData, internalData: tableInternalData } = $xeTable;
		const { refElem: tableRefElem, refTableBody, refLeftContainer, refRightContainer, refCellResizeBar } = $xeTable.getRefMaps();
		const { computeColumnOpts, computeFilterOpts } = $xeTable.getComputeMaps();

		const headerColumn = ref([] as VxeTableDefines.ColumnInfo[][]);

		const refElem = ref() as Ref<HTMLDivElement>;
		const refHeaderTable = ref() as Ref<HTMLTableElement>;
		const refHeaderColgroup = ref() as Ref<HTMLTableColElement>;
		const refHeaderTHead = ref() as Ref<HTMLTableSectionElement>;
		const refHeaderXSpace = ref() as Ref<HTMLDivElement>;
		const refHeaderBorderRepair = ref() as Ref<HTMLDivElement>;

		const uploadColumn = () => {
			const { isGroup } = tableReactData;
			headerColumn.value = isGroup ? convertHeaderColumnToRows(props.tableGroupColumn) : [];
		};

		const resizeMousedown = (evnt: MouseEvent, params: any) => {
			const { column } = params;
			const { fixedType } = props;
			const tableBody = refTableBody.value;
			const leftContainerElem = refLeftContainer.value;
			const rightContainerElem = refRightContainer.value;
			const resizeBarElem = refCellResizeBar.value;
			const { clientX: dragClientX } = evnt;
			const wrapperElem = refElem.value;
			const dragBtnElem = evnt.target as HTMLDivElement;
			const cell = (params.cell = dragBtnElem.parentNode as HTMLTableCellElement);
			let dragLeft = 0;
			const tableBodyElem = tableBody.$el as HTMLDivElement;
			const pos = getOffsetPos(dragBtnElem, wrapperElem);
			const dragBtnWidth = dragBtnElem.clientWidth;
			const dragBtnOffsetWidth = Math.floor(dragBtnWidth / 2);
			const minInterval = getColReMinWidth(params) - dragBtnOffsetWidth; // 列之间的最小间距
			let dragMinLeft = pos.left - cell.clientWidth + dragBtnWidth + minInterval;
			let dragPosLeft = pos.left + dragBtnOffsetWidth;
			const domMousemove = document.onmousemove;
			const domMouseup = document.onmouseup;
			const isLeftFixed = fixedType === 'left';
			const isRightFixed = fixedType === 'right';
			const tableEl = tableRefElem.value;

			// 计算左右侧固定列偏移量
			let fixedOffsetWidth = 0;
			if (isLeftFixed || isRightFixed) {
				const siblingProp = isLeftFixed ? 'nextElementSibling' : 'previousElementSibling';
				let tempCellElem = cell[siblingProp] as HTMLTableCellElement;
				while (tempCellElem) {
					if (hasClass(tempCellElem, 'fixed--hidden')) {
						break;
					} else if (!hasClass(tempCellElem, 'col--group')) {
						fixedOffsetWidth += tempCellElem.offsetWidth;
					}
					tempCellElem = tempCellElem[siblingProp] as HTMLTableCellElement;
				}
				if (isRightFixed && rightContainerElem) {
					dragPosLeft = rightContainerElem.offsetLeft + fixedOffsetWidth;
				}
			}

			// 处理拖动事件
			const updateEvent = function (evnt: MouseEvent) {
				evnt.stopPropagation();
				evnt.preventDefault();
				const offsetX = evnt.clientX - dragClientX;
				let left = dragPosLeft + offsetX;
				const scrollLeft = fixedType ? 0 : tableBodyElem.scrollLeft;
				if (isLeftFixed) {
					// 左固定列（不允许超过右侧固定列、不允许超过右边距）
					left = Math.min(left, (rightContainerElem ? rightContainerElem.offsetLeft : tableBodyElem.clientWidth) - fixedOffsetWidth - minInterval);
				} else if (isRightFixed) {
					// 右侧固定列（不允许超过左侧固定列、不允许超过左边距）
					dragMinLeft = (leftContainerElem ? leftContainerElem.clientWidth : 0) + fixedOffsetWidth + minInterval;
					left = Math.min(left, dragPosLeft + cell.clientWidth - minInterval);
				} else {
					dragMinLeft = Math.max(tableBodyElem.scrollLeft, dragMinLeft);
					// left = Math.min(left, tableBodyElem.clientWidth + tableBodyElem.scrollLeft - 40)
				}
				dragLeft = Math.max(left, dragMinLeft);
				resizeBarElem.style.left = `${dragLeft - scrollLeft}px`;
			};

			tableReactData._isResize = true;
			addClass(tableEl, 'drag--resize');
			resizeBarElem.style.display = 'block';
			document.onmousemove = updateEvent;
			document.onmouseup = function (evnt) {
				document.onmousemove = domMousemove;
				document.onmouseup = domMouseup;
				const resizeWidth = column.renderWidth + (isRightFixed ? dragPosLeft - dragLeft : dragLeft - dragPosLeft);
				column.resizeWidth = resizeWidth;
				resizeBarElem.style.display = 'none';
				tableReactData._isResize = false;
				tableInternalData._lastResizeTime = Date.now();
				$xeTable.analyColumnWidth();
				$xeTable.recalculate(true).then(() => {
					$xeTable.saveCustomStore('update:visible');
					$xeTable.updateCellAreas();
					$xeTable.dispatchEvent('resizable-change', { ...params, resizeWidth }, evnt);
					setTimeout(() => $xeTable.recalculate(true), 300);
				});
				removeClass(tableEl, 'drag--resize');
			};
			updateEvent(evnt);
			if ($xeTable.closeMenu) {
				$xeTable.closeMenu();
			}
		};

		watch(() => props.tableColumn, uploadColumn);

		onMounted(() => {
			nextTick(() => {
				const { fixedType } = props;
				const { internalData } = $xeTable;
				const { elemStore } = internalData;
				const prefix = `${fixedType || 'main'}-header-`;
				elemStore[`${prefix}wrapper`] = refElem;
				elemStore[`${prefix}table`] = refHeaderTable;
				elemStore[`${prefix}colgroup`] = refHeaderColgroup;
				elemStore[`${prefix}list`] = refHeaderTHead;
				elemStore[`${prefix}xSpace`] = refHeaderXSpace;
				elemStore[`${prefix}repair`] = refHeaderBorderRepair;
				uploadColumn();
			});
		});

		onUnmounted(() => {
			const { fixedType } = props;
			const { internalData } = $xeTable;
			const { elemStore } = internalData;
			const prefix = `${fixedType || 'main'}-header-`;
			elemStore[`${prefix}wrapper`] = null;
			elemStore[`${prefix}table`] = null;
			elemStore[`${prefix}colgroup`] = null;
			elemStore[`${prefix}list`] = null;
			elemStore[`${prefix}xSpace`] = null;
			elemStore[`${prefix}repair`] = null;
		});

		const renderFilterCell = (column: VxeTableDefines.ColumnInfo, params: VxeTableDefines.CellRenderHeaderParams) => {
			const slots = column ? column.slots : null;
			const filterSlot = slots ? slots.filter : null;
			const { filterRender } = column;
			const compConf = isEnableConf(filterRender) ? renderer.get(filterRender.name) : null;
			const filterParams = Object.assign({}, params, tableInternalData._currFilterParams);
			const rtFilter = compConf ? compConf.renderTableHeaderFilter : null;
			if (filterSlot) {
				return $xeTable.callSlot(filterSlot, filterParams);
			} else if (rtFilter) {
				return getSlotVNs(rtFilter(filterRender, filterParams));
			}
			return null;
		};

		const renderHeaderFilterVN = (headerGroups: VxeTableDefines.ColumnInfo[][]) => {
			const { fixedType } = props;
			const cols = headerGroups[headerGroups.length - 1];
			const { currentColumn, scrollXLoad, overflowX, scrollbarWidth } = tableReactData;
			const $rowIndex = headerGroups.length;
			const columnOpts = computeColumnOpts.value;
			const filterOpts = computeFilterOpts.value;
			const {
				headerRowClassName,
				headerCellClassName,
				headerRowStyle,
				headerCellStyle,
				showHeaderOverflow: allColumnHeaderOverflow,
				headerAlign: allHeaderAlign,
				align: allAlign,
				mouseConfig,
			} = tableProps;
			return h(
				'tr',
				{
					key: $rowIndex,
					class: [
						'vxe-header--row',
						'vxe-header--filter-row',
						headerRowClassName
							? XEUtils.isFunction(headerRowClassName)
								? headerRowClassName({ $table: $xeTable, $rowIndex, fixed: fixedType, type: renderType })
								: headerRowClassName
							: '',
					],
					style: headerRowStyle
						? XEUtils.isFunction(headerRowStyle)
							? headerRowStyle({ $table: $xeTable, $rowIndex, fixed: fixedType, type: renderType })
							: headerRowStyle
						: null,
				},
				cols
					.map((column, $columnIndex) => {
						const { type, showHeaderOverflow, headerAlign, align, headerClassName } = column;
						const colid = column.id;
						const isColGroup = column.children && column.children.length;
						const fixedHiddenColumn = fixedType ? column.fixed !== fixedType && !isColGroup : !!column.fixed && overflowX;
						const headOverflow = XEUtils.eqNull(showHeaderOverflow) ? allColumnHeaderOverflow : showHeaderOverflow;
						const headAlign = headerAlign || align || allHeaderAlign || allAlign;
						let showEllipsis = headOverflow === 'ellipsis';
						const showTitle = headOverflow === 'title';
						const showTooltip = headOverflow === true || headOverflow === 'tooltip';
						let hasEllipsis = showTitle || showTooltip || showEllipsis;
						const hasFilter = filterOpts.mode === 'header' && column.filters && column.filters.some(item => item.checked);
						const columnIndex = $xeTable.getColumnIndex(column);
						const _columnIndex = $xeTable.getVTColumnIndex(column);
						const params: VxeTableDefines.CellRenderHeaderParams = {
							$table: $xeTable,
							$grid: $xeTable.xegrid,
							$rowIndex,
							column,
							columnIndex,
							$columnIndex,
							_columnIndex,
							fixed: fixedType,
							type: renderType,
							isHidden: fixedHiddenColumn,
							hasFilter,
						};
						const thOns: any = {
							onClick: (evnt: MouseEvent) => $xeTable.triggerHeaderCellClickEvent(evnt, params),
							onDblclick: (evnt: MouseEvent) => $xeTable.triggerHeaderCellDblclickEvent(evnt, params),
						};
						// 横向虚拟滚动不支持动态行高
						if (scrollXLoad && !hasEllipsis) {
							showEllipsis = hasEllipsis = true;
						}
						// 按下事件处理
						if (mouseConfig) {
							thOns.onMousedown = (evnt: MouseEvent) => $xeTable.triggerHeaderCellMousedownEvent(evnt, params);
						}
						return h(
							'th',
							{
								class: [
									'vxe-header--column',
									colid,
									{
										[`col--${headAlign}`]: headAlign,
										[`col--${type}`]: type,
										'col--last': $columnIndex === cols.length - 1,
										'col--fixed': column.fixed,
										'col--group': isColGroup,
										'col--ellipsis': hasEllipsis,
										'fixed--hidden': fixedHiddenColumn,
										'is--filter-active': hasFilter,
										'col--current': currentColumn === column,
									},
									headerClassName ? (XEUtils.isFunction(headerClassName) ? headerClassName(params) : headerClassName) : '',
									headerCellClassName ? (XEUtils.isFunction(headerCellClassName) ? headerCellClassName(params) : headerCellClassName) : '',
								],
								colid,
								colspan: column.colSpan > 1 ? column.colSpan : null,
								rowspan: 1,
								style: headerCellStyle ? (XEUtils.isFunction(headerCellStyle) ? headerCellStyle(params) : headerCellStyle) : null,
								...thOns,
								key: columnOpts.useKey || isColGroup ? colid : $columnIndex,
							},
							[
								h(
									'div',
									{
										class: [
											'vxe-cell',
											{
												'c--title': showTitle,
												'c--tooltip': showTooltip,
												'c--ellipsis': showEllipsis,
											},
										],
									},
									renderFilterCell(column, params),
									// column.renderHeader(params),
								),
							],
						);
					})
					.concat(
						scrollbarWidth
							? [
									h('th', {
										class: 'vxe-header--gutter col--gutter',
									}),
							  ]
							: [],
					),
			);
		};

		const renderVN = () => {
			const { fixedType, fixedColumn, tableColumn } = props;
			const {
				border,
				headerRowClassName,
				headerCellClassName,
				headerRowStyle,
				headerCellStyle,
				showHeaderOverflow: allColumnHeaderOverflow,
				headerAlign: allHeaderAlign,
				align: allAlign,
				mouseConfig,
			} = tableProps;
			const { isGroup, currentColumn, scrollXLoad, overflowX, scrollbarWidth } = tableReactData;
			const { visibleColumn } = tableInternalData;
			const columnOpts = computeColumnOpts.value;
			const filterOpts = computeFilterOpts.value;
			let headerGroups: VxeTableDefines.ColumnInfo[][] = headerColumn.value;
			let renderColumnList = tableColumn as VxeTableDefines.ColumnInfo[];
			if (isGroup) {
				renderColumnList = visibleColumn;
			} else {
				// 如果是使用优化模式
				if (fixedType) {
					if (scrollXLoad || allColumnHeaderOverflow) {
						renderColumnList = fixedColumn as VxeTableDefines.ColumnInfo[];
					}
				}
				headerGroups = [renderColumnList];
			}
			const rows = headerGroups.map((cols, $rowIndex) => {
				return h(
					'tr',
					{
						class: [
							'vxe-header--row',
							headerRowClassName
								? XEUtils.isFunction(headerRowClassName)
									? headerRowClassName({ $table: $xeTable, $rowIndex, fixed: fixedType, type: renderType })
									: headerRowClassName
								: '',
						],
						style: headerRowStyle
							? XEUtils.isFunction(headerRowStyle)
								? headerRowStyle({ $table: $xeTable, $rowIndex, fixed: fixedType, type: renderType })
								: headerRowStyle
							: null,
					},
					cols
						.map((column, $columnIndex) => {
							const { type, showHeaderOverflow, headerAlign, align, headerClassName } = column;
							const colid = column.id;
							const isColGroup = column.children && column.children.length;
							const fixedHiddenColumn = fixedType ? column.fixed !== fixedType && !isColGroup : !!column.fixed && overflowX;
							const headOverflow = XEUtils.eqNull(showHeaderOverflow) ? allColumnHeaderOverflow : showHeaderOverflow;
							const headAlign = headerAlign || align || allHeaderAlign || allAlign;
							let showEllipsis = headOverflow === 'ellipsis';
							const showTitle = headOverflow === 'title';
							const showTooltip = headOverflow === true || headOverflow === 'tooltip';
							let hasEllipsis = showTitle || showTooltip || showEllipsis;
							const hasFilter = !filterOpts.mode && column.filters && column.filters.some(item => item.checked);
							const columnIndex = $xeTable.getColumnIndex(column);
							const _columnIndex = $xeTable.getVTColumnIndex(column);
							const params: VxeTableDefines.CellRenderHeaderParams = {
								$table: $xeTable,
								$grid: $xeTable.xegrid,
								$rowIndex,
								column,
								columnIndex,
								$columnIndex,
								_columnIndex,
								fixed: fixedType,
								type: renderType,
								isHidden: fixedHiddenColumn,
								hasFilter,
							};
							const thOns: any = {
								onClick: (evnt: MouseEvent) => $xeTable.triggerHeaderCellClickEvent(evnt, params),
								onDblclick: (evnt: MouseEvent) => $xeTable.triggerHeaderCellDblclickEvent(evnt, params),
							};
							// 横向虚拟滚动不支持动态行高
							if (scrollXLoad && !hasEllipsis) {
								showEllipsis = hasEllipsis = true;
							}
							// 按下事件处理
							if (mouseConfig) {
								thOns.onMousedown = (evnt: MouseEvent) => $xeTable.triggerHeaderCellMousedownEvent(evnt, params);
							}
							return h(
								'th',
								{
									class: [
										'vxe-header--column',
										colid,
										{
											[`col--${headAlign}`]: headAlign,
											[`col--${type}`]: type,
											'col--last': $columnIndex === cols.length - 1,
											'col--fixed': column.fixed,
											'col--group': isColGroup,
											'col--ellipsis': hasEllipsis,
											'fixed--hidden': fixedHiddenColumn,
											'is--sortable': column.sortable,
											'col--filter': !!column.filters,
											'is--filter-active': hasFilter,
											'col--current': currentColumn === column,
										},
										headerClassName ? (XEUtils.isFunction(headerClassName) ? headerClassName(params) : headerClassName) : '',
										headerCellClassName
											? XEUtils.isFunction(headerCellClassName)
												? headerCellClassName(params)
												: headerCellClassName
											: '',
									],
									colid,
									colspan: column.colSpan > 1 ? column.colSpan : null,
									rowspan: column.rowSpan > 1 ? column.rowSpan : null,
									style: headerCellStyle ? (XEUtils.isFunction(headerCellStyle) ? headerCellStyle(params) : headerCellStyle) : null,
									...thOns,
									key: columnOpts.useKey || isColGroup ? colid : $columnIndex,
								},
								[
									h(
										'div',
										{
											class: [
												'vxe-cell',
												{
													'c--title': showTitle,
													'c--tooltip': showTooltip,
													'c--ellipsis': showEllipsis,
												},
											],
										},
										column.renderHeader(params),
									),
									/**
									 * 列宽拖动
									 */
									!fixedHiddenColumn && !isColGroup && (XEUtils.isBoolean(column.resizable) ? column.resizable : columnOpts.resizable)
										? h('div', {
												class: [
													'vxe-resizable',
													{
														'is--line': !border || border === 'none',
													},
												],
												onMousedown: (evnt: MouseEvent) => resizeMousedown(evnt, params),
										  })
										: null,
								],
							);
						})
						.concat(
							scrollbarWidth
								? [
										h('th', {
											class: 'vxe-header--gutter col--gutter',
										}),
								  ]
								: [],
						),
				);
			});
			if (filterOpts.mode === 'header') {
				rows.push(renderHeaderFilterVN(headerGroups));
			}
			return h(
				'div',
				{
					ref: refElem,
					class: ['vxe-table--header-wrapper', fixedType ? `fixed-${fixedType}--wrapper` : 'body--wrapper'],
					xid: xID,
				},
				[
					fixedType
						? createCommentVNode()
						: h('div', {
								ref: refHeaderXSpace,
								class: 'vxe-body--x-space',
						  }),
					h(
						'table',
						{
							ref: refHeaderTable,
							class: 'vxe-table--header',
							xid: xID,
							cellspacing: 0,
							cellpadding: 0,
							border: 0,
						},
						[
							/**
							 * 列宽
							 */
							h(
								'colgroup',
								{
									ref: refHeaderColgroup,
								},
								renderColumnList
									.map((column, $columnIndex) => {
										return h('col', {
											name: column.id,
											key: $columnIndex,
										});
									})
									.concat(
										scrollbarWidth
											? [
													h('col', {
														name: 'col_gutter',
													}),
											  ]
											: [],
									),
							),
							/**
							 * 头部
							 */
							h(
								'thead',
								{
									ref: refHeaderTHead,
								},
								rows,
							),
						],
					),
					/**
					 * 其他
					 */
					h('div', {
						ref: refHeaderBorderRepair,
						class: 'vxe-table--header-border-line',
					}),
				],
			);
		};

		return renderVN;
	},
});
