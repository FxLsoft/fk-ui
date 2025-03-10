import { inject, nextTick } from 'vue';
import XEUtils from 'xe-utils';
import { VxeUI } from '../../../ui';
import { getCellValue, isColumnInfo, mergeBodyMethod } from '../../src/util';
import { formatText, parseFile } from '../../../ui/src/utils';
import { errLog, warnLog } from '../../../ui/src/log';
import { createHtmlPage, getExportBlobByContent } from './util';

import type { TableExportMethods, VxeGridConstructor, VxeGridPrivateMethods, VxeGridPropTypes } from '../../../types';

const { getI18n, hooks, renderer } = VxeUI;

let htmlCellElem: any;

const csvBOM = '\uFEFF';
const enterSymbol = '\r\n';

function defaultFilterExportColumn(column: any) {
	return column.property || ['seq', 'checkbox', 'radio'].includes(column.type);
}

const getConvertColumns = (columns: any) => {
	const result: any = [];
	columns.forEach((column: any) => {
		if (column.childNodes && column.childNodes.length) {
			result.push(column);
			result.push(...getConvertColumns(column.childNodes));
		} else {
			result.push(column);
		}
	});
	return result;
};

const convertToRows = (originColumns: any): any[][] => {
	let maxLevel = 1;
	const traverse = (column: any, parent?: any) => {
		if (parent) {
			column._level = parent._level + 1;
			if (maxLevel < column._level) {
				maxLevel = column._level;
			}
		}
		if (column.childNodes && column.childNodes.length) {
			let colSpan = 0;
			column.childNodes.forEach((subColumn: any) => {
				traverse(subColumn, column);
				colSpan += subColumn._colSpan;
			});
			column._colSpan = colSpan;
		} else {
			column._colSpan = 1;
		}
	};

	originColumns.forEach((column: any) => {
		column._level = 1;
		traverse(column);
	});

	const rows: any = [];
	for (let i = 0; i < maxLevel; i++) {
		rows.push([]);
	}

	const allColumns = getConvertColumns(originColumns);

	allColumns.forEach((column: any) => {
		if (column.childNodes && column.childNodes.length) {
			column._rowSpan = 1;
		} else {
			column._rowSpan = maxLevel - column._level + 1;
		}
		rows[column._level - 1].push(column);
	});

	return rows;
};

function toTableBorder(border: any) {
	if (border === true) {
		return 'full';
	}
	if (border) {
		return border;
	}
	return 'default';
}

function getBooleanValue(cellValue: any) {
	return cellValue === 'TRUE' || cellValue === 'true' || cellValue === true;
}

function getFooterData(opts: any, footerTableData: any) {
	const { footerFilterMethod } = opts;
	return footerFilterMethod ? footerTableData.filter((items: any, index: any) => footerFilterMethod({ items, $rowIndex: index })) : footerTableData;
}

function getCsvCellTypeLabel(column: any, cellValue: any) {
	if (cellValue) {
		if (column.type === 'seq') {
			return `\t${cellValue}`;
		}
		switch (column.cellType) {
			case 'string':
				if (!Number.isNaN(cellValue)) {
					return `\t${cellValue}`;
				}
				break;
			case 'number':
				break;
			default:
				if (cellValue.length >= 12 && !Number.isNaN(cellValue)) {
					return `\t${cellValue}`;
				}
				break;
		}
	}
	return cellValue;
}

function toTxtCellLabel(val: any) {
	if (/[",\s\n]/.test(val)) {
		return `"${val.replace(/"/g, '""')}"`;
	}
	return val;
}

function getElementsByTagName(elem: any, qualifiedName: any): any[] {
	return elem.getElementsByTagName(qualifiedName);
}

function getTxtCellKey(now: number) {
	return `#${now}@${XEUtils.uniqueId()}`;
}

function replaceTxtCell(cell: any, vMaps: any) {
	return cell.replace(/#\d+@\d+/g, (key: any) => (XEUtils.hasOwnProp(vMaps, key) ? vMaps[key] : key));
}

function getTxtCellValue(val: any, vMaps: any) {
	const rest = replaceTxtCell(val, vMaps);
	return rest.replace(/^"+$/g, (qVal: any) => '"'.repeat(Math.ceil(qVal.length / 2)));
}

function parseCsvAndTxt(columns: any[], content: string, cellSeparator: string) {
	const list = content.split(enterSymbol);
	const rows: any[] = [];
	let fields: string[] = [];
	if (list.length) {
		const vMaps: any = {};
		const now = Date.now();
		list.forEach(rVal => {
			if (rVal) {
				const item: any = {};
				rVal = rVal
					.replace(/("")|(\n)/g, (text: string, dVal: string) => {
						const key = getTxtCellKey(now);
						vMaps[key] = dVal ? '"' : '\n';
						return key;
					})
					.replace(/"(.*?)"/g, (text: string, cVal: string) => {
						const key = getTxtCellKey(now);
						vMaps[key] = replaceTxtCell(cVal, vMaps);
						return key;
					});
				const cells = rVal.split(cellSeparator);
				if (!fields.length) {
					fields = cells.map(val => getTxtCellValue(val.trim(), vMaps));
				} else {
					cells.forEach((val, colIndex) => {
						if (colIndex < fields.length) {
							item[fields[colIndex]] = getTxtCellValue(val.trim(), vMaps);
						}
					});
					rows.push(item);
				}
			}
		});
	}
	return { fields, rows };
}

function parseCsv(columns: any, content: any) {
	return parseCsvAndTxt(columns, content, ',');
}

function parseTxt(columns: any, content: any) {
	return parseCsvAndTxt(columns, content, '\t');
}

function parseHTML(columns: any, content: any) {
	const domParser = new DOMParser();
	const xmlDoc = domParser.parseFromString(content, 'text/html');
	const bodyNodes = getElementsByTagName(xmlDoc, 'body');
	const rows: any = [];
	const fields: any = [];
	if (bodyNodes.length) {
		const tableNodes = getElementsByTagName(bodyNodes[0], 'table');
		if (tableNodes.length) {
			const theadNodes = getElementsByTagName(tableNodes[0], 'thead');
			if (theadNodes.length) {
				XEUtils.arrayEach(getElementsByTagName(theadNodes[0], 'tr'), rowNode => {
					XEUtils.arrayEach(getElementsByTagName(rowNode, 'th'), cellNode => {
						fields.push(cellNode.textContent);
					});
				});
				const tbodyNodes = getElementsByTagName(tableNodes[0], 'tbody');
				if (tbodyNodes.length) {
					XEUtils.arrayEach(getElementsByTagName(tbodyNodes[0], 'tr'), rowNode => {
						const item: any = {};
						XEUtils.arrayEach(getElementsByTagName(rowNode, 'td'), (cellNode, colIndex) => {
							if (fields[colIndex]) {
								item[fields[colIndex]] = cellNode.textContent || '';
							}
						});
						rows.push(item);
					});
				}
			}
		}
	}
	return { fields, rows };
}

function parseXML(columns: any, content: any) {
	const domParser = new DOMParser();
	const xmlDoc = domParser.parseFromString(content, 'application/xml');
	const sheetNodes = getElementsByTagName(xmlDoc, 'Worksheet');
	const rows: any = [];
	const fields: any = [];
	if (sheetNodes.length) {
		const tableNodes = getElementsByTagName(sheetNodes[0], 'Table');
		if (tableNodes.length) {
			const rowNodes = getElementsByTagName(tableNodes[0], 'Row');
			if (rowNodes.length) {
				XEUtils.arrayEach(getElementsByTagName(rowNodes[0], 'Cell'), cellNode => {
					fields.push(cellNode.textContent);
				});
				XEUtils.arrayEach(rowNodes, (rowNode, index) => {
					if (index) {
						const item: any = {};
						const cellNodes = getElementsByTagName(rowNode, 'Cell');
						XEUtils.arrayEach(cellNodes, (cellNode, colIndex) => {
							if (fields[colIndex]) {
								item[fields[colIndex]] = cellNode.textContent;
							}
						});
						rows.push(item);
					}
				});
			}
		}
	}
	return { fields, rows };
}

function clearColumnConvert(columns: any) {
	XEUtils.eachTree(
		columns,
		(column: any) => {
			delete column._level;
			delete column._colSpan;
			delete column._rowSpan;
			delete column._children;
			delete column.childNodes;
		},
		{ children: 'children' },
	);
}

/**
 * 检查导入的列是否完整
 * @param {Array} fields 字段名列表
 * @param {Array} rows 数据列表
 */
function checkImportData(columns: any[], fields: string[]) {
	const tableFields: string[] = [];
	columns.forEach(column => {
		const field = column.property;
		if (field) {
			tableFields.push(field);
		}
	});
	return fields.some(field => tableFields.includes(field));
}

const tableExportMethodKeys: (keyof TableExportMethods)[] = [
	'exportData',
	'importByFile',
	'importData',
	'saveFile',
	'readFile',
	'print',
	'getPrintHtml',
	'openImport',
	'openExport',
	'openPrint',
];

hooks.add('tableExportModule', {
	setupTable($xeTable) {
		const { props, reactData, internalData } = $xeTable;
		const {
			computeTreeOpts,
			computePrintOpts,
			computeExportOpts,
			computeImportOpts,
			computeCustomOpts,
			computeSeqOpts,
			computeRadioOpts,
			computeCheckboxOpts,
			computeColumnOpts,
		} = $xeTable.getComputeMaps();

		const $xeGrid = inject('$xeGrid', null as (VxeGridConstructor & VxeGridPrivateMethods) | null);

		const hasTreeChildren = (row: any) => {
			const treeOpts = computeTreeOpts.value;
			const childrenField = treeOpts.childrenField;
			return row[childrenField] && row[childrenField].length;
		};

		const getSeq = (cellValue: any, row: any, $rowIndex: any, column: any, $columnIndex: any) => {
			const seqOpts = computeSeqOpts.value;
			const seqMethod = seqOpts.seqMethod || column.seqMethod;
			if (seqMethod) {
				return seqMethod({
					row,
					rowIndex: $xeTable.getRowIndex(row),
					$rowIndex,
					column,
					columnIndex: $xeTable.getColumnIndex(column),
					$columnIndex,
				});
			}
			return cellValue;
		};

		function getHeaderTitle(opts: any, column: any) {
			const columnOpts = computeColumnOpts.value;
			const headExportMethod = column.headerExportMethod || columnOpts.headerExportMethod;
			return headExportMethod
				? headExportMethod({ column, options: opts, $table: $xeTable })
				: (opts.original ? column.property : column.getTitle()) || '';
		}

		const toBooleanValue = (cellValue: any) => {
			return XEUtils.isBoolean(cellValue) ? (cellValue ? 'TRUE' : 'FALSE') : cellValue;
		};

		const getLabelData = (opts: any, columns: any[], datas: any[]) => {
			const { isAllExpand, mode } = opts;
			const { treeConfig } = props;
			const radioOpts = computeRadioOpts.value;
			const checkboxOpts = computeCheckboxOpts.value;
			const treeOpts = computeTreeOpts.value;
			const columnOpts = computeColumnOpts.value;
			if (!htmlCellElem) {
				htmlCellElem = document.createElement('div');
			}
			if (treeConfig) {
				const childrenField = treeOpts.childrenField;
				// 如果是树表格只允许导出数据源
				const rest: any[] = [];
				const expandMaps: Map<any, number> = new Map();
				XEUtils.eachTree(
					datas,
					(item, $rowIndex, items, path, parent, nodes) => {
						const row = item._row || item;
						const parentRow = parent && parent._row ? parent._row : parent;
						if (isAllExpand || !parentRow || (expandMaps.has(parentRow) && $xeTable.isTreeExpandByRow(parentRow))) {
							const hasRowChild = hasTreeChildren(row);
							const item: any = {
								_row: row,
								_level: nodes.length - 1,
								_hasChild: hasRowChild,
								_expand: hasRowChild && $xeTable.isTreeExpandByRow(row),
							};
							columns.forEach((column, $columnIndex) => {
								let cellValue: string | number | boolean = '';
								const renderOpts = column.editRender || column.cellRender;
								let bodyExportMethod = column.exportMethod;
								if (!bodyExportMethod && renderOpts && renderOpts.name) {
									const compConf = renderer.get(renderOpts.name);
									if (compConf) {
										bodyExportMethod = compConf.tableExportMethod;
									}
								}
								if (!bodyExportMethod) {
									bodyExportMethod = columnOpts.exportMethod;
								}
								if (bodyExportMethod) {
									cellValue = bodyExportMethod({ $table: $xeTable, row, column, options: opts });
								} else {
									switch (column.type) {
										case 'seq': {
											const seqVal = path.map((num, i) => (i % 2 === 0 ? Number(num) + 1 : '.')).join('');
											cellValue = mode === 'all' ? seqVal : getSeq(seqVal, row, $rowIndex, column, $columnIndex);
											break;
										}
										case 'checkbox':
											cellValue = toBooleanValue($xeTable.isCheckedByCheckboxRow(row));
											item._checkboxLabel = checkboxOpts.labelField ? XEUtils.get(row, checkboxOpts.labelField) : '';
											item._checkboxDisabled = checkboxOpts.checkMethod && !checkboxOpts.checkMethod({ row });
											break;
										case 'radio':
											cellValue = toBooleanValue($xeTable.isCheckedByRadioRow(row));
											item._radioLabel = radioOpts.labelField ? XEUtils.get(row, radioOpts.labelField) : '';
											item._radioDisabled = radioOpts.checkMethod && !radioOpts.checkMethod({ row });
											break;
										default:
											if (opts.original) {
												cellValue = getCellValue(row, column);
											} else {
												cellValue = `${$xeTable.getCellLabel(row, column)}`;
												if (column.type === 'html') {
													htmlCellElem.innerHTML = cellValue;
													cellValue = htmlCellElem.innerText.trim();
												} else {
													const cell = $xeTable.getCellElement(row, column);
													if (cell) {
														cellValue = cell.innerText.trim();
													}
												}
											}
									}
								}
								item[column.id] = XEUtils.toValueString(cellValue);
							});
							expandMaps.set(row, 1);
							rest.push(Object.assign(item, row));
						}
					},
					{ children: childrenField },
				);
				return rest;
			}
			return datas.map((row, $rowIndex) => {
				const item: any = {
					_row: row,
				};
				columns.forEach((column, $columnIndex) => {
					let cellValue: string | number | boolean = '';
					const renderOpts = column.editRender || column.cellRender;
					let exportLabelMethod = column.exportMethod;
					if (!exportLabelMethod && renderOpts && renderOpts.name) {
						const compConf = renderer.get(renderOpts.name);
						if (compConf) {
							exportLabelMethod = compConf.tableExportMethod;
						}
					}
					if (exportLabelMethod) {
						cellValue = exportLabelMethod({ $table: $xeTable, row, column, options: opts });
					} else {
						switch (column.type) {
							case 'seq': {
								const seqValue = $rowIndex + 1;
								cellValue = mode === 'all' ? seqValue : getSeq(seqValue, row, $rowIndex, column, $columnIndex);
								break;
							}
							case 'checkbox':
								cellValue = toBooleanValue($xeTable.isCheckedByCheckboxRow(row));
								item._checkboxLabel = checkboxOpts.labelField ? XEUtils.get(row, checkboxOpts.labelField) : '';
								item._checkboxDisabled = checkboxOpts.checkMethod && !checkboxOpts.checkMethod({ row });
								break;
							case 'radio':
								cellValue = toBooleanValue($xeTable.isCheckedByRadioRow(row));
								item._radioLabel = radioOpts.labelField ? XEUtils.get(row, radioOpts.labelField) : '';
								item._radioDisabled = radioOpts.checkMethod && !radioOpts.checkMethod({ row });
								break;
							default:
								if (opts.original) {
									cellValue = getCellValue(row, column);
								} else {
									cellValue = `${$xeTable.getCellLabel(row, column)}`;
									if (column.type === 'html') {
										htmlCellElem.innerHTML = cellValue;
										cellValue = htmlCellElem.innerText.trim();
									} else {
										const cell = $xeTable.getCellElement(row, column);
										if (cell) {
											cellValue = cell.innerText.trim();
										}
									}
								}
						}
					}
					item[column.id] = XEUtils.toValueString(cellValue);
				});
				return item;
			});
		};

		const getExportData = (opts: any) => {
			const { columns, dataFilterMethod } = opts;
			let datas = opts.data;
			if (dataFilterMethod) {
				datas = datas.filter((row: any, index: any) => dataFilterMethod({ row, $rowIndex: index }));
			}
			return getLabelData(opts, columns, datas);
		};

		const getFooterCellValue = (opts: any, row: any, column: any) => {
			const columnOpts = computeColumnOpts.value;
			const renderOpts = column.editRender || column.cellRender;
			let footLabelMethod = column.footerExportMethod;
			if (!footLabelMethod && renderOpts && renderOpts.name) {
				const compConf = renderer.get(renderOpts.name);
				if (compConf) {
					footLabelMethod = compConf.tableFooterExportMethod;
				}
			}
			if (!footLabelMethod) {
				footLabelMethod = columnOpts.footerExportMethod;
			}
			const _columnIndex = $xeTable.getVTColumnIndex(column);
			if (footLabelMethod) {
				return footLabelMethod({ $table: $xeTable, items: row, itemIndex: _columnIndex, row, _columnIndex, column, options: opts });
			}
			// 兼容老模式
			if (XEUtils.isArray(row)) {
				return XEUtils.toValueString(row[_columnIndex]);
			}
			return XEUtils.get(row, column.field);
		};

		const toCsv = (opts: any, columns: any[], datas: any[]) => {
			let content = csvBOM;
			if (opts.isHeader) {
				content += columns.map(column => toTxtCellLabel(getHeaderTitle(opts, column))).join(',') + enterSymbol;
			}
			datas.forEach(row => {
				content += columns.map(column => toTxtCellLabel(getCsvCellTypeLabel(column, row[column.id]))).join(',') + enterSymbol;
			});
			if (opts.isFooter) {
				const { footerTableData } = reactData;
				const footers = getFooterData(opts, footerTableData);
				footers.forEach((row: any) => {
					content += columns.map((column: any) => toTxtCellLabel(getFooterCellValue(opts, row, column))).join(',') + enterSymbol;
				});
			}
			return content;
		};

		const toTxt = (opts: any, columns: any[], datas: any[]) => {
			let content = '';
			if (opts.isHeader) {
				content += columns.map(column => toTxtCellLabel(getHeaderTitle(opts, column))).join('\t') + enterSymbol;
			}
			datas.forEach(row => {
				content += columns.map(column => toTxtCellLabel(row[column.id])).join('\t') + enterSymbol;
			});
			if (opts.isFooter) {
				const { footerTableData } = reactData;
				const footers = getFooterData(opts, footerTableData);
				footers.forEach((row: any) => {
					content += columns.map((column: any) => toTxtCellLabel(getFooterCellValue(opts, row, column))).join(',') + enterSymbol;
				});
			}
			return content;
		};

		const hasEllipsis = (column: any, property: string, allColumnOverflow: any) => {
			const columnOverflow = column[property];
			const headOverflow = XEUtils.isUndefined(columnOverflow) || XEUtils.isNull(columnOverflow) ? allColumnOverflow : columnOverflow;
			const showEllipsis = headOverflow === 'ellipsis';
			const showTitle = headOverflow === 'title';
			const showTooltip = headOverflow === true || headOverflow === 'tooltip';
			let isEllipsis = showTitle || showTooltip || showEllipsis;
			// 虚拟滚动不支持动态高度
			const { scrollXLoad, scrollYLoad } = reactData;
			if ((scrollXLoad || scrollYLoad) && !isEllipsis) {
				isEllipsis = true;
			}
			return isEllipsis;
		};

		const toHtml = (opts: any, columns: any, datas: any) => {
			const {
				id,
				border,
				treeConfig,
				headerAlign: allHeaderAlign,
				align: allAlign,
				footerAlign: allFooterAlign,
				showOverflow: allColumnOverflow,
				showHeaderOverflow: allColumnHeaderOverflow,
			} = props;
			const { isAllSelected, isIndeterminate, mergeList } = reactData;
			const treeOpts = computeTreeOpts.value;
			const { print: isPrint, isHeader, isFooter, isColgroup, isMerge, colgroups, original } = opts;
			const allCls = 'check-all';
			const clss = ['vxe-table', `border--${toTableBorder(border)}`, isPrint ? 'is--print' : '', isHeader ? 'is--header' : ''].filter(cls => cls);
			const tables = [
				`<table class="${clss.join(' ')}" border="0" cellspacing="0" cellpadding="0">`,
				`<colgroup>${columns.map((column: any) => `<col style="width:${column.renderWidth}px">`).join('')}</colgroup>`,
			];
			if (isHeader) {
				tables.push('<thead>');
				if (isColgroup && !original) {
					colgroups.forEach((cols: any) => {
						tables.push(
							`<tr>${cols
								.map((column: any) => {
									const headAlign = column.headerAlign || column.align || allHeaderAlign || allAlign;
									const classNames = hasEllipsis(column, 'showHeaderOverflow', allColumnHeaderOverflow) ? ['col--ellipsis'] : [];
									const cellTitle = getHeaderTitle(opts, column);
									let childWidth = 0;
									let countChild = 0;
									XEUtils.eachTree(
										[column],
										item => {
											if (!item.childNodes || !column.childNodes.length) {
												countChild++;
											}
											childWidth += item.renderWidth;
										},
										{ children: 'childNodes' },
									);
									const cellWidth = childWidth - countChild;
									if (headAlign) {
										classNames.push(`col--${headAlign}`);
									}
									if (column.type === 'checkbox') {
										return `<th class="${classNames.join(' ')}" colspan="${column._colSpan}" rowspan="${column._rowSpan}"><div ${
											isPrint ? '' : `style="width: ${cellWidth}px"`
										}><input type="checkbox" class="${allCls}" ${isAllSelected ? 'checked' : ''}><span>${cellTitle}</span></div></th>`;
									}
									return `<th class="${classNames.join(' ')}" colspan="${column._colSpan}" rowspan="${
										column._rowSpan
									}" title="${cellTitle}"><div ${isPrint ? '' : `style="width: ${cellWidth}px"`}><span>${formatText(
										cellTitle,
										true,
									)}</span></div></th>`;
								})
								.join('')}</tr>`,
						);
					});
				} else {
					tables.push(
						`<tr>${columns
							.map((column: any) => {
								const headAlign = column.headerAlign || column.align || allHeaderAlign || allAlign;
								const classNames = hasEllipsis(column, 'showHeaderOverflow', allColumnHeaderOverflow) ? ['col--ellipsis'] : [];
								const cellTitle = getHeaderTitle(opts, column);
								if (headAlign) {
									classNames.push(`col--${headAlign}`);
								}
								if (column.type === 'checkbox') {
									return `<th class="${classNames.join(' ')}"><div ${
										isPrint ? '' : `style="width: ${column.renderWidth}px"`
									}><input type="checkbox" class="${allCls}" ${isAllSelected ? 'checked' : ''}><span>${cellTitle}</span></div></th>`;
								}
								return `<th class="${classNames.join(' ')}" title="${cellTitle}"><div ${
									isPrint ? '' : `style="width: ${column.renderWidth}px"`
								}><span>${formatText(cellTitle, true)}</span></div></th>`;
							})
							.join('')}</tr>`,
					);
				}
				tables.push('</thead>');
			}
			if (datas.length) {
				tables.push('<tbody>');
				if (treeConfig) {
					datas.forEach((item: any) => {
						tables.push(
							`<tr>${columns
								.map((column: any) => {
									const cellAlign = column.align || allAlign;
									const classNames = hasEllipsis(column, 'showOverflow', allColumnOverflow) ? ['col--ellipsis'] : [];
									const cellValue = item[column.id];
									if (cellAlign) {
										classNames.push(`col--${cellAlign}`);
									}
									if (column.treeNode) {
										let treeIcon = '';
										if (item._hasChild) {
											treeIcon = `<i class="${item._expand ? 'vxe-table--tree-fold-icon' : 'vxe-table--tree-unfold-icon'}"></i>`;
										}
										classNames.push('vxe-table--tree-node');
										if (column.type === 'radio') {
											return `<td class="${classNames.join(' ')}" title="${cellValue}"><div ${
												isPrint ? '' : `style="width: ${column.renderWidth}px"`
											}><div class="vxe-table--tree-node-wrapper" style="padding-left: ${
												item._level * treeOpts.indent
											}px"><div class="vxe-table--tree-icon-wrapper">${treeIcon}</div><div class="vxe-table--tree-cell"><input type="radio" name="radio_${id}" ${
												item._radioDisabled ? 'disabled ' : ''
											}${getBooleanValue(cellValue) ? 'checked' : ''}><span>${item._radioLabel}</span></div></div></div></td>`;
										} else if (column.type === 'checkbox') {
											return `<td class="${classNames.join(' ')}" title="${cellValue}"><div ${
												isPrint ? '' : `style="width: ${column.renderWidth}px"`
											}><div class="vxe-table--tree-node-wrapper" style="padding-left: ${
												item._level * treeOpts.indent
											}px"><div class="vxe-table--tree-icon-wrapper">${treeIcon}</div><div class="vxe-table--tree-cell"><input type="checkbox" ${
												item._checkboxDisabled ? 'disabled ' : ''
											}${getBooleanValue(cellValue) ? 'checked' : ''}><span>${item._checkboxLabel}</span></div></div></div></td>`;
										}
										return `<td class="${classNames.join(' ')}" title="${cellValue}"><div ${
											isPrint ? '' : `style="width: ${column.renderWidth}px"`
										}><div class="vxe-table--tree-node-wrapper" style="padding-left: ${
											item._level * treeOpts.indent
										}px"><div class="vxe-table--tree-icon-wrapper">${treeIcon}</div><div class="vxe-table--tree-cell">${cellValue}</div></div></div></td>`;
									}
									if (column.type === 'radio') {
										return `<td class="${classNames.join(' ')}"><div ${
											isPrint ? '' : `style="width: ${column.renderWidth}px"`
										}><input type="radio" name="radio_${id}" ${item._radioDisabled ? 'disabled ' : ''}${
											getBooleanValue(cellValue) ? 'checked' : ''
										}><span>${item._radioLabel}</span></div></td>`;
									} else if (column.type === 'checkbox') {
										return `<td class="${classNames.join(' ')}"><div ${
											isPrint ? '' : `style="width: ${column.renderWidth}px"`
										}><input type="checkbox" ${item._checkboxDisabled ? 'disabled ' : ''}${
											getBooleanValue(cellValue) ? 'checked' : ''
										}><span>${item._checkboxLabel}</span></div></td>`;
									}
									return `<td class="${classNames.join(' ')}" title="${cellValue}"><div ${
										isPrint ? '' : `style="width: ${column.renderWidth}px"`
									}>${formatText(cellValue, true)}</div></td>`;
								})
								.join('')}</tr>`,
						);
					});
				} else {
					datas.forEach((item: any) => {
						tables.push(
							`<tr>${columns
								.map((column: any) => {
									const cellAlign = column.align || allAlign;
									const classNames = hasEllipsis(column, 'showOverflow', allColumnOverflow) ? ['col--ellipsis'] : [];
									const cellValue = item[column.id];
									let rowSpan = 1;
									let colSpan = 1;
									if (isMerge && mergeList.length) {
										const _rowIndex = $xeTable.getVTRowIndex(item._row);
										const _columnIndex = $xeTable.getVTColumnIndex(column);
										const spanRest = mergeBodyMethod(mergeList, _rowIndex, _columnIndex);
										if (spanRest) {
											const { rowspan, colspan } = spanRest;
											if (!rowspan || !colspan) {
												return '';
											}
											if (rowspan > 1) {
												rowSpan = rowspan;
											}
											if (colspan > 1) {
												colSpan = colspan;
											}
										}
									}
									if (cellAlign) {
										classNames.push(`col--${cellAlign}`);
									}
									if (column.type === 'radio') {
										return `<td class="${classNames.join(' ')}" rowspan="${rowSpan}" colspan="${colSpan}"><div ${
											isPrint ? '' : `style="width: ${column.renderWidth}px"`
										}><input type="radio" name="radio_${id}" ${item._radioDisabled ? 'disabled ' : ''}${
											getBooleanValue(cellValue) ? 'checked' : ''
										}><span>${item._radioLabel}</span></div></td>`;
									} else if (column.type === 'checkbox') {
										return `<td class="${classNames.join(' ')}" rowspan="${rowSpan}" colspan="${colSpan}"><div ${
											isPrint ? '' : `style="width: ${column.renderWidth}px"`
										}><input type="checkbox" ${item._checkboxDisabled ? 'disabled ' : ''}${
											getBooleanValue(cellValue) ? 'checked' : ''
										}><span>${item._checkboxLabel}</span></div></td>`;
									}
									return `<td class="${classNames.join(' ')}" rowspan="${rowSpan}" colspan="${colSpan}" title="${cellValue}"><div ${
										isPrint ? '' : `style="width: ${column.renderWidth}px"`
									}>${formatText(cellValue, true)}</div></td>`;
								})
								.join('')}</tr>`,
						);
					});
				}
				tables.push('</tbody>');
			}
			if (isFooter) {
				const { footerTableData } = reactData;
				const footers = getFooterData(opts, footerTableData);
				if (footers.length) {
					tables.push('<tfoot>');
					footers.forEach((row: any) => {
						tables.push(
							`<tr>${columns
								.map((column: any) => {
									const footAlign = column.footerAlign || column.align || allFooterAlign || allAlign;
									const classNames = hasEllipsis(column, 'showOverflow', allColumnOverflow) ? ['col--ellipsis'] : [];
									const cellValue = getFooterCellValue(opts, row, column);
									if (footAlign) {
										classNames.push(`col--${footAlign}`);
									}
									return `<td class="${classNames.join(' ')}" title="${cellValue}"><div ${
										isPrint ? '' : `style="width: ${column.renderWidth}px"`
									}>${formatText(cellValue, true)}</div></td>`;
								})
								.join('')}</tr>`,
						);
					});
					tables.push('</tfoot>');
				}
			}
			// 是否半选状态
			const script =
				!isAllSelected && isIndeterminate
					? `<script>(function(){var a=document.querySelector(".${allCls}");if(a){a.indeterminate=true}})()</script>`
					: '';
			tables.push('</table>', script);
			return isPrint ? tables.join('') : createHtmlPage(opts, tables.join(''));
		};

		const toXML = (opts: any, columns: any, datas: any) => {
			let xml = [
				'<?xml version="1.0"?>',
				'<?mso-application progid="Excel.Sheet"?>',
				'<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" xmlns:html="http://www.w3.org/TR/REC-html40">',
				'<DocumentProperties xmlns="urn:schemas-microsoft-com:office:office">',
				'<Version>16.00</Version>',
				'</DocumentProperties>',
				'<ExcelWorkbook xmlns="urn:schemas-microsoft-com:office:excel">',
				'<WindowHeight>7920</WindowHeight>',
				'<WindowWidth>21570</WindowWidth>',
				'<WindowTopX>32767</WindowTopX>',
				'<WindowTopY>32767</WindowTopY>',
				'<ProtectStructure>False</ProtectStructure>',
				'<ProtectWindows>False</ProtectWindows>',
				'</ExcelWorkbook>',
				`<Worksheet ss:Name="${opts.sheetName}">`,
				'<Table>',
				columns.map((column: any) => `<Column ss:Width="${column.renderWidth}"/>`).join(''),
			].join('');
			if (opts.isHeader) {
				xml += `<Row>${columns.map((column: any) => `<Cell><Data ss:Type="String">${getHeaderTitle(opts, column)}</Data></Cell>`).join('')}</Row>`;
			}
			datas.forEach((row: any) => {
				xml += `<Row>${columns.map((column: any) => `<Cell><Data ss:Type="String">${row[column.id]}</Data></Cell>`).join('')}</Row>`;
			});
			if (opts.isFooter) {
				const { footerTableData } = reactData;
				const footers = getFooterData(opts, footerTableData);
				footers.forEach((row: any) => {
					xml += `<Row>${columns
						.map((column: any) => `<Cell><Data ss:Type="String">${getFooterCellValue(opts, row, column)}</Data></Cell>`)
						.join('')}</Row>`;
				});
			}
			return `${xml}</Table></Worksheet></Workbook>`;
		};

		const getContent = (opts: any, columns: any, datas: any) => {
			if (columns.length) {
				switch (opts.type) {
					case 'csv':
						return toCsv(opts, columns, datas);
					case 'txt':
						return toTxt(opts, columns, datas);
					case 'html':
						return toHtml(opts, columns, datas);
					case 'xml':
						return toXML(opts, columns, datas);
				}
			}
			return '';
		};

		const downloadFile = (opts: any, content: any) => {
			const { filename, type, download } = opts;
			if (!download) {
				const blob = getExportBlobByContent(content, opts);
				return Promise.resolve({ type, content, blob });
			}
			if (VxeUI.saveFile) {
				VxeUI.saveFile({ filename, type, content }).then(() => {
					if (opts.message !== false) {
						if (VxeUI.modal) {
							VxeUI.modal.message({ content: getI18n('vxe.table.expSuccess'), status: 'success' });
						}
					}
				});
			}
		};

		const handleExport = (opts: any) => {
			const { remote, columns, colgroups, exportMethod, afterExportMethod } = opts;
			return new Promise(resolve => {
				if (remote) {
					const params = { options: opts, $table: $xeTable, $grid: $xeGrid };
					resolve(exportMethod ? exportMethod(params) : params);
				} else {
					const datas = getExportData(opts);
					resolve(
						$xeTable.preventEvent(null, 'event.export', { options: opts, columns, colgroups, datas }, () => {
							return downloadFile(opts, getContent(opts, columns, datas));
						}),
					);
				}
			})
				.then((params: any) => {
					clearColumnConvert(columns);
					if (!opts.print) {
						if (afterExportMethod) {
							afterExportMethod({ status: true, options: opts, $table: $xeTable, $grid: $xeGrid });
						}
					}
					return Object.assign({ status: true }, params);
				})
				.catch(() => {
					clearColumnConvert(columns);
					if (!opts.print) {
						if (afterExportMethod) {
							afterExportMethod({ status: false, options: opts, $table: $xeTable, $grid: $xeGrid });
						}
					}
					const params = { status: false };
					return Promise.reject(params);
				});
		};

		const handleImport = (content: any, opts: any) => {
			const { tableFullColumn, _importResolve, _importReject } = internalData;
			let rest: {
				fields: string[];
				rows: any[];
			} = { fields: [], rows: [] };
			switch (opts.type) {
				case 'csv':
					rest = parseCsv(tableFullColumn, content);
					break;
				case 'txt':
					rest = parseTxt(tableFullColumn, content);
					break;
				case 'html':
					rest = parseHTML(tableFullColumn, content);
					break;
				case 'xml':
					rest = parseXML(tableFullColumn, content);
					break;
			}
			const { fields, rows } = rest;
			const status = checkImportData(tableFullColumn, fields);
			if (status) {
				$xeTable.createData(rows).then((data: any) => {
					let loadRest;
					if (opts.mode === 'insert' || opts.mode === 'insertBottom') {
						loadRest = $xeTable.insertAt(data, -1);
					}
					if (opts.mode === 'insertTop') {
						loadRest = $xeTable.insert(data);
					} else {
						loadRest = $xeTable.reloadData(data);
					}
					if (opts.message !== false) {
						if (VxeUI.modal) {
							VxeUI.modal.message({ content: getI18n('vxe.table.impSuccess', [rows.length]), status: 'success' });
						}
					}
					return loadRest.then(() => {
						if (_importResolve) {
							_importResolve({ status: true });
						}
					});
				});
			} else if (opts.message !== false) {
				if (VxeUI.modal) {
					VxeUI.modal.message({ content: getI18n('vxe.error.impFields'), status: 'error' });
				}
				if (_importReject) {
					_importReject({ status: false });
				}
			}
		};

		const handleFileImport = (file: File, opts: any) => {
			const { importMethod, afterImportMethod } = opts;
			const { type, filename } = parseFile(file);
			const importOpts = computeImportOpts.value;

			// 检查类型，如果为自定义导出，则不需要校验类型
			if (!importMethod && !XEUtils.includes(XEUtils.keys(importOpts._typeMaps), type)) {
				if (opts.message !== false) {
					if (VxeUI.modal) {
						VxeUI.modal.message({ content: getI18n('vxe.error.notType', [type]), status: 'error' });
					}
				}
				const params = { status: false };
				return Promise.reject(params);
			}

			const rest = new Promise((resolve, reject) => {
				const _importResolve = (params?: any) => {
					resolve(params);
					internalData._importResolve = null;
					internalData._importReject = null;
				};
				const _importReject = (params?: any) => {
					reject(params);
					internalData._importResolve = null;
					internalData._importReject = null;
				};
				internalData._importResolve = _importResolve;
				internalData._importReject = _importReject;
				if (window.FileReader) {
					const options = Object.assign({ mode: 'insertTop' }, opts, { type, filename });
					if (options.remote) {
						if (importMethod) {
							Promise.resolve(importMethod({ file, options, $table: $xeTable }))
								.then(() => {
									_importResolve({ status: true });
								})
								.catch(() => {
									_importResolve({ status: true });
								});
						} else {
							_importResolve({ status: true });
						}
					} else {
						const { tableFullColumn } = internalData;
						$xeTable.preventEvent(null, 'event.import', { file, options, columns: tableFullColumn }, () => {
							const reader = new FileReader();
							reader.onerror = () => {
								errLog('vxe.error.notType', [type]);
								_importReject({ status: false });
							};
							reader.onload = (e: any) => {
								handleImport(e.target.result, options);
							};
							reader.readAsText(file, options.encoding || 'UTF-8');
						});
					}
				} else {
					// 不支持的浏览器
					// if (true) {
					// 	errLog('vxe.error.notExp')
					// }
					_importResolve({ status: true });
				}
			});

			return rest
				.then(() => {
					if (afterImportMethod) {
						afterImportMethod({ status: true, options: opts, $table: $xeTable });
					}
				})
				.catch(e => {
					if (afterImportMethod) {
						afterImportMethod({ status: false, options: opts, $table: $xeTable });
					}
					return Promise.reject(e);
				});
		};

		const handleExportAndPrint = (options: any, isPrint?: boolean) => {
			const { treeConfig, showHeader, showFooter } = props;
			const { initStore, mergeList, isGroup, footerTableData, exportStore, exportParams } = reactData;
			const { collectColumn } = internalData;
			const exportOpts = computeExportOpts.value;
			const hasTree = treeConfig;
			const customOpts = computeCustomOpts.value;
			const selectRecords = $xeTable.getCheckboxRecords();
			const proxyOpts = $xeGrid ? $xeGrid.getComputeMaps().computeProxyOpts.value : ({} as VxeGridPropTypes.ProxyOpts);
			const hasFooter = !!footerTableData.length;
			const hasMerge = !hasTree && mergeList.length;
			const defOpts = Object.assign(
				{
					message: true,
					isHeader: showHeader,
					isFooter: showFooter,
					current: 'current',
					modes: ['current', 'selected'].concat(proxyOpts.ajax && proxyOpts.ajax.queryAll ? ['all'] : []),
				},
				options,
			);
			const types: string[] = defOpts.types || XEUtils.keys(exportOpts._typeMaps);
			const modes: string[] = defOpts.modes || [];
			const checkMethod = customOpts.checkMethod;
			const exportColumns = collectColumn.slice(0);
			const { columns } = defOpts;
			// 处理类型
			const typeList = types.map(value => {
				return {
					value,
					label: getI18n(`vxe.export.types.${value}`),
				};
			});
			const modeList = modes.map((item: any) => {
				if (item && item.value) {
					return {
						value: item.value,
						label: item.label || item.value,
					};
				}
				return {
					value: item,
					label: getI18n(`vxe.export.modes.${item}`),
				};
			});
			// 默认选中
			XEUtils.eachTree(exportColumns, (column: any, index, items, path, parent) => {
				const isColGroup = column.children && column.children.length;
				if (isColGroup || defaultFilterExportColumn(column)) {
					column.checked = columns
						? columns.some((item: any) => {
								if (isColumnInfo(item)) {
									return column === item;
								} else if (XEUtils.isString(item)) {
									return column.field === item;
								} else {
									const colid = item.id || item.colId;
									const type = item.type;
									const field = item.property || item.field;
									if (colid) {
										return column.id === colid;
									} else if (field && type) {
										return column.property === field && column.type === type;
									} else if (field) {
										return column.property === field;
									} else if (type) {
										return column.type === type;
									}
								}
								return false;
						  })
						: column.visible;
					column.halfChecked = false;
					column.disabled = (parent && parent.disabled) || (checkMethod ? !checkMethod({ column }) : false);
				}
			});
			// 更新条件
			Object.assign(exportStore, {
				columns: exportColumns,
				typeList,
				modeList,
				hasFooter,
				hasMerge,
				hasTree,
				isPrint,
				hasColgroup: isGroup,
				visible: true,
			});
			// 默认参数
			Object.assign(
				exportParams,
				{
					mode: selectRecords.length ? 'selected' : 'current',
				},
				defOpts,
			);
			if (!modeList.some(item => item.value === exportParams.mode)) {
				exportParams.mode = modeList[0].value;
			}
			if (!typeList.some(item => item.value === exportParams.type)) {
				exportParams.type = typeList[0].value;
			}
			initStore.export = true;
			return nextTick();
		};

		const exportMethods: TableExportMethods = {
			/**
			 * 导出文件，支持 csv/html/xml/txt
			 * 如果是树表格，则默认是导出所有节点
			 * 如果是启用了虚拟滚动，则只能导出数据源，可以配合 dataFilterMethod 函数自行转换数据
			 * @param {Object} options 参数
			 */
			exportData(options) {
				const { treeConfig } = props;
				const { isGroup, tableGroupColumn } = reactData;
				const { tableFullColumn, afterFullData } = internalData;
				const exportOpts = computeExportOpts.value;
				const treeOpts = computeTreeOpts.value;
				const opts: any = Object.assign(
					{
						// filename: '',
						// sheetName: '',
						// original: false,
						// message: false,
						isHeader: true,
						isFooter: true,
						isColgroup: true,
						// isMerge: false,
						// isAllExpand: false,
						download: true,
						type: 'csv',
						mode: 'current',
						// data: null,
						// remote: false,
						// dataFilterMethod: null,
						// footerFilterMethod: null,
						// exportMethod: null,
						// columnFilterMethod: null,
						// beforeExportMethod: null,
						// afterExportMethod: null
					},
					exportOpts,
					{
						print: false,
					},
					options,
				);
				const { type, mode, columns, original, beforeExportMethod } = opts;
				let groups: any[] = [];
				const customCols = columns && columns.length ? columns : null;
				let columnFilterMethod = opts.columnFilterMethod;
				// 如果设置源数据，则默认导出设置了字段的列
				if (!customCols && !columnFilterMethod) {
					columnFilterMethod = original ? ({ column }: any) => column.property : ({ column }: any) => defaultFilterExportColumn(column);
				}
				if (customCols) {
					opts._isCustomColumn = true;
					groups = XEUtils.searchTree(
						XEUtils.mapTree(
							customCols,
							(item: any) => {
								let targetColumn;
								if (item) {
									if (isColumnInfo(item)) {
										targetColumn = item;
									} else if (XEUtils.isString(item)) {
										targetColumn = $xeTable.getColumnByField(item);
									} else {
										const colid = item.id || item.colId;
										const type = item.type;
										const field = item.property || item.field;
										if (colid) {
											targetColumn = $xeTable.getColumnById(colid);
										} else if (field && type) {
											targetColumn = tableFullColumn.find((column: any) => column.property === field && column.type === type);
										} else if (field) {
											targetColumn = $xeTable.getColumnByField(field);
										} else if (type) {
											targetColumn = tableFullColumn.find((column: any) => column.type === type);
										}
									}
									return targetColumn || {};
								}
							},
							{
								children: 'childNodes',
								mapChildren: '_children',
							},
						),
						(column, index) => isColumnInfo(column) && (!columnFilterMethod || columnFilterMethod({ column: column as any, $columnIndex: index })),
						{
							children: '_children',
							mapChildren: 'childNodes',
							original: true,
						},
					);
				} else {
					groups = XEUtils.searchTree(
						isGroup ? tableGroupColumn : tableFullColumn,
						(column: any, index) => column.visible && (!columnFilterMethod || columnFilterMethod({ column, $columnIndex: index })),
						{ children: 'children', mapChildren: 'childNodes', original: true },
					);
				}
				// 获取所有列
				const cols: any = [];
				XEUtils.eachTree(
					groups,
					column => {
						const isColGroup = column.children && column.children.length;
						if (!isColGroup) {
							cols.push(column);
						}
					},
					{ children: 'childNodes' },
				);
				// 构建分组层级
				opts.columns = cols;
				opts.colgroups = convertToRows(groups);
				if (!opts.filename) {
					opts.filename = getI18n(opts.original ? 'vxe.table.expOriginFilename' : 'vxe.table.expFilename', [
						XEUtils.toDateString(Date.now(), 'yyyyMMddHHmmss'),
					]);
				}
				if (!opts.sheetName) {
					opts.sheetName = document.title;
				}

				// 检查类型，如果为自定义导出，则不需要校验类型
				if (!opts.exportMethod && !XEUtils.includes(XEUtils.keys(exportOpts._typeMaps), type)) {
					// if (true) {
					// 	errLog('vxe.error.notType', [type])
					// }
					const params = { status: false };
					return Promise.reject(params);
				}

				if (!opts.print) {
					if (beforeExportMethod) {
						beforeExportMethod({ options: opts, $table: $xeTable, $grid: $xeGrid });
					}
				}
				if (!opts.data) {
					opts.data = [];
					if (mode === 'selected') {
						const selectRecords = $xeTable.getCheckboxRecords();
						if (['html', 'pdf'].includes(type) && treeConfig) {
							opts.data = XEUtils.searchTree(
								$xeTable.getTableData().fullData,
								item => $xeTable.findRowIndexOf(selectRecords, item) > -1,
								Object.assign({}, treeOpts, { data: '_row' }),
							);
						} else {
							opts.data = selectRecords;
						}
					} else if (mode === 'all') {
						// if (true) {
						// 	if (!$xeGrid) {
						// 		warnLog('vxe.error.errProp', ['all', 'mode=current,selected'])
						// 	}
						// }

						if ($xeGrid && !opts.remote) {
							const { reactData: gridReactData } = $xeGrid;
							const { computeProxyOpts } = $xeGrid.getComputeMaps();
							const { sortData } = gridReactData;
							const proxyOpts = computeProxyOpts.value;
							const { beforeQueryAll, afterQueryAll, ajax = {}, props = {} } = proxyOpts;
							const ajaxMethods = ajax.queryAll;
							const queryAllSuccessMethods = ajax.queryAllSuccess;
							const queryAllErrorMethods = ajax.queryAllError;

							// if (true) {
							// 	if (!ajaxMethods) {
							// 		warnLog('vxe.error.notFunc', ['proxy-config.ajax.queryAll'])
							// 	}
							// }

							if (ajaxMethods) {
								const params = {
									$table: $xeTable,
									$grid: $xeGrid,
									sort: sortData.length ? sortData[0] : ({} as any),
									sorts: sortData as any[],
									filters: gridReactData.filterData,
									form: gridReactData.formData,
									options: opts,
								};
								return Promise.resolve((beforeQueryAll || ajaxMethods)(params))
									.then(rest => {
										opts.data = (props.list ? XEUtils.get(rest, props.list) : rest) || [];
										if (afterQueryAll) {
											afterQueryAll(params);
										}
										if (queryAllSuccessMethods) {
											queryAllSuccessMethods({ ...params, response: rest });
										}
										return handleExport(opts);
									})
									.catch(rest => {
										if (queryAllErrorMethods) {
											queryAllErrorMethods({ ...params, response: rest });
										}
									});
							}
						}
					} else if (mode === 'current') {
						opts.data = afterFullData;
					}
				}
				return handleExport(opts);
			},
			importByFile(file, options) {
				const opts = Object.assign({}, options);
				const { beforeImportMethod } = opts;
				if (beforeImportMethod) {
					beforeImportMethod({ options: opts, $table: $xeTable });
				}
				return handleFileImport(file, opts);
			},
			importData(options) {
				const importOpts = computeImportOpts.value;
				const opts = Object.assign(
					{
						types: XEUtils.keys(importOpts._typeMaps),
						// beforeImportMethod: null,
						// afterImportMethod: null
					},
					importOpts,
					options,
				);
				const { beforeImportMethod, afterImportMethod } = opts;
				if (beforeImportMethod) {
					beforeImportMethod({ options: opts, $table: $xeTable });
				}
				return VxeUI.readFile(opts)
					.catch(e => {
						if (afterImportMethod) {
							afterImportMethod({ status: false, options: opts, $table: $xeTable });
						}
						return Promise.reject(e);
					})
					.then(params => {
						const { file } = params;
						return handleFileImport(file, opts);
					});
			},
			saveFile(options) {
				return VxeUI.saveFile(options);
			},
			readFile(options) {
				return VxeUI.readFile(options);
			},
			print(options) {
				const printOpts = computePrintOpts.value;
				const opts = Object.assign(
					{
						original: false,
						// beforePrintMethod
					},
					printOpts,
					options,
					{
						type: 'html',
						download: false,
						remote: false,
						print: true,
					},
				);
				if (!opts.sheetName) {
					opts.sheetName = document.title;
				}
				const beforePrintMethod = opts.beforePrintMethod;
				const tableHtml = opts.html;
				return new Promise((resolve, reject) => {
					if (VxeUI.print) {
						if (tableHtml) {
							resolve(
								VxeUI.print({
									title: opts.sheetName,
									html: tableHtml,
									customStyle: opts.style,
									beforeMethod: beforePrintMethod
										? ({ html }) => {
												return beforePrintMethod({
													html,
													options: opts,
													$table: $xeTable,
												});
										  }
										: undefined,
								}),
							);
						} else {
							resolve(
								exportMethods.exportData(opts).then(({ content }: any) => {
									return VxeUI.print({
										title: opts.sheetName,
										html: content,
										customStyle: opts.style,
										beforeMethod: beforePrintMethod
											? ({ html }) => {
													return beforePrintMethod({
														html,
														options: opts,
														$table: $xeTable,
													});
											  }
											: undefined,
									});
								}),
							);
						}
					} else {
						const e = { status: false };
						reject(e);
					}
				});
			},
			getPrintHtml(options) {
				const printOpts = computePrintOpts.value;
				const opts = Object.assign(
					{
						original: false,
						// beforePrintMethod
					},
					printOpts,
					options,
					{
						type: 'html',
						download: false,
						remote: false,
						print: true,
					},
				);
				return exportMethods.exportData(opts).then(({ content }) => {
					return {
						html: content,
					};
				});
			},
			openImport(options) {
				const { treeConfig, importConfig } = props;
				const { initStore, importStore, importParams } = reactData;
				const importOpts = computeImportOpts.value;
				const defOpts = Object.assign(
					{
						mode: 'insertTop',
						message: true,
						types: XEUtils.keys(importOpts._typeMaps),
						modes: ['insertTop', 'covering'],
					},
					importOpts,
					options,
				);
				const types = defOpts.types || [];
				const modes = defOpts.modes || [];
				const isTree = !!treeConfig;
				if (isTree) {
					if (defOpts.message) {
						if (VxeUI.modal) {
							VxeUI.modal.message({ content: getI18n('vxe.error.treeNotImp'), status: 'error' });
						}
					}
					return;
				}
				if (!importConfig) {
					errLog('vxe.error.reqProp', ['import-config']);
				}
				// 处理类型
				const typeList = types.map(value => {
					return {
						value,
						label: getI18n(`vxe.export.types.${value}`),
					};
				});
				const modeList = modes.map((item: any) => {
					if (item && item.value) {
						return {
							value: item.value,
							label: item.label || item.value,
						};
					}
					return {
						value: item,
						label: getI18n(`vxe.import.modes.${item}`),
					};
				});
				Object.assign(importStore, {
					file: null,
					type: '',
					filename: '',
					modeList,
					typeList,
					visible: true,
				});
				Object.assign(importParams, defOpts);
				if (!modeList.some(item => item.value === importParams.mode)) {
					importParams.mode = modeList[0].value;
				}
				initStore.import = true;
			},
			openExport(options: any) {
				const exportOpts = computeExportOpts.value;
				const defOpts = Object.assign(
					{
						message: true,
						types: XEUtils.keys(exportOpts._typeMaps),
					},
					exportOpts,
					options,
				);
				handleExportAndPrint(defOpts);
			},
			openPrint(options: any) {
				const printOpts = computePrintOpts.value;
				const defOpts = Object.assign(
					{
						message: true,
					},
					printOpts,
					options,
				);
				handleExportAndPrint(defOpts, true);
			},
		};

		return exportMethods;
	},
	setupGrid($xeGrid) {
		return $xeGrid.extendTableMethods(tableExportMethodKeys);
	},
});
