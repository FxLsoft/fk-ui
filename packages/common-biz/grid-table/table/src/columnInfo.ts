import XEUtils from 'xe-utils';
import { VxeUI } from '../../ui';
import { getFuncText } from '../../ui/src/utils';
import { toFilters } from './util';

import type { VxeTableConstructor, VxeTablePrivateMethods } from '../../../types';

const { getI18n, formats } = VxeUI;
export class ColumnInfo {
	constructor($xeTable: VxeTableConstructor & VxeTablePrivateMethods, _vm: any, { renderHeader, renderCell, renderFooter, renderData }: any = {}) {
		const $xeGrid = $xeTable.xegrid;
		const formatter: string | any[] = _vm.formatter;
		const visible = XEUtils.isBoolean(_vm.visible) ? _vm.visible : true;
		Object.assign(this, {
			// 基本属性
			type: _vm.type,
			property: _vm.field,
			field: _vm.field,
			title: _vm.title,
			width: _vm.width,
			minWidth: _vm.minWidth,
			maxWidth: _vm.maxWidth,
			resizable: _vm.resizable,
			fixed: _vm.fixed,
			align: _vm.align,
			headerAlign: _vm.headerAlign,
			footerAlign: _vm.footerAlign,
			showOverflow: _vm.showOverflow,
			showHeaderOverflow: _vm.showHeaderOverflow,
			showFooterOverflow: _vm.showFooterOverflow,
			className: _vm.className,
			headerClassName: _vm.headerClassName,
			footerClassName: _vm.footerClassName,
			formatter,
			footerFormatter: _vm.footerFormatter,
			sortable: _vm.sortable,
			sortBy: _vm.sortBy,
			sortType: _vm.sortType,
			filters: toFilters(_vm.filters),
			filterMultiple: XEUtils.isBoolean(_vm.filterMultiple) ? _vm.filterMultiple : true,
			filterMethod: _vm.filterMethod,
			filterResetMethod: _vm.filterResetMethod,
			filterRecoverMethod: _vm.filterRecoverMethod,
			filterRender: _vm.filterRender,
			treeNode: _vm.treeNode,
			cellType: _vm.cellType,
			cellRender: _vm.cellRender,
			editRender: _vm.editRender,
			contentRender: _vm.contentRender,
			headerExportMethod: _vm.headerExportMethod,
			exportMethod: _vm.exportMethod,
			footerExportMethod: _vm.footerExportMethod,
			titleHelp: _vm.titleHelp,
			titlePrefix: _vm.titlePrefix,
			titleSuffix: _vm.titleSuffix,
			// 自定义参数
			params: _vm.params,
			canMouseSelected: _vm.canMouseSelected,
			// 渲染属性
			id: _vm.colId || XEUtils.uniqueId('col_'),
			parentId: null,
			visible,
			// 内部属性（一旦被使用，将导致不可升级版本）
			halfVisible: false,
			defaultVisible: visible,
			defaultFixed: _vm.fixed,

			checked: false,
			halfChecked: false,
			disabled: false,
			// 分组层级
			level: 1,
			// 跨行
			rowSpan: 1,
			// 跨列
			colSpan: 1,

			// 数据排序
			order: null, // 用于记录排序类型，升序和倒序
			sortTime: 0, // 用于多列的先后顺序

			// 列排序
			sortNumber: 0, // 用于记录自定义列顺序
			renderSortNumber: 0, // 用于记录自定义列顺序

			renderFixed: '',
			renderVisible: false,

			renderWidth: 0,
			renderHeight: 0,
			renderResizeWidth: 0,
			renderAutoWidth: 0,
			resizeWidth: 0, // 手动调整

			renderLeft: 0,
			renderArgs: [], // 渲染参数可用于扩展
			model: {},
			renderHeader: renderHeader || _vm.renderHeader,
			renderCell: renderCell || _vm.renderCell,
			renderFooter: renderFooter || _vm.renderFooter,
			renderData,
			// 单元格插槽，只对 grid 有效
			slots: _vm.slots,
		});
		if ($xeGrid) {
			const { computeProxyOpts } = $xeGrid.getComputeMaps();
			const proxyOpts = computeProxyOpts.value;
			if (proxyOpts.beforeColumn) {
				proxyOpts.beforeColumn({ $grid: $xeGrid, column: this });
			}
		}
	}

	getTitle() {
		return getFuncText(this.title || (this.type === 'seq' ? getI18n('vxe.table.seqTitle') : ''));
	}

	getKey() {
		const { type } = this;
		return this.field || (type ? `type=${type}` : null);
	}

	update(name: string, value: any) {
		// 不支持直接修改的属性
		if (name !== 'filters') {
			if (name === 'field') {
				// 兼容旧属性
				this.property = value;
			}
			this[name] = value;
		}
	}

	[key: string]: any;
}
