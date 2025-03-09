import { h, resolveComponent } from 'vue';
import XEUtils, { debounce, get, isBoolean, isEmpty, set } from 'xe-utils';
import { VxeUI } from '../../ui';
import { getCellValue, setCellValue } from '../../table/src/util';
import { formatText, getFuncText, isEmptyValue } from '../../ui/src/utils';
import { getOnName } from '../../ui/src/vn';
import { getComponent } from '../../core';
import type { ComponentOptions } from 'vue';

import type { VxeColumnPropTypes, VxeGlobalRendererHandles } from '../../types';

const { renderer, getI18n } = VxeUI;

const componentDefaultModelProp = 'modelValue';

const defaultCompProps = { transfer: true };

function getModelEvent(renderOpts: any) {
	switch (renderOpts.name) {
		case 'input':
		case 'textarea':
			return 'input';
	}
	return 'update:modelValue';
}

function getChangeEvent(renderOpts: any) {
	switch (renderOpts.name) {
		case 'input':
		case 'textarea':
		case 'VxeInput':
		case 'VxeNumberInput':
		case 'VxeTextarea':
		case '$input':
		case '$textarea':
			return 'input';
	}
	return 'change';
}

function parseDate(value: any, props: any) {
	return value && props.valueFormat ? XEUtils.toStringDate(value, props.valueFormat) : value;
}

function getFormatDate(value: any, props: any, defaultFormat: string) {
	const { dateConfig = {} } = props;
	return XEUtils.toDateString(parseDate(value, props), dateConfig.labelFormat || defaultFormat);
}

function getLabelFormatDate(value: any, props: any) {
	return getFormatDate(value, props, getI18n(`vxe.input.date.labelFormat.${props.type}`));
}

function getDefaultComponent({ name }: any) {
	return (getComponent(name) || resolveComponent(name)) as ComponentOptions;
}

function handleConfirmFilter(params: any, checked: any, option: any) {
	const { $panel } = params;
	$panel.changeOption({}, checked, option);
}

function getNativeAttrs(renderOpts: any) {
	let { name, attrs } = renderOpts;
	if (name === 'input') {
		attrs = Object.assign({ type: 'text' }, attrs);
	}
	return attrs;
}

function getInputImmediateModel(renderOpts: VxeColumnPropTypes.EditRender) {
	const { name, immediate, props } = renderOpts;
	if (isBoolean(immediate)) {
		return immediate;
	}
	if (!immediate) {
		if (name === 'VxeInput' || name === '$input') {
			const { type } = props || {};
			return !(!type || type === 'text' || type === 'number' || type === 'integer' || type === 'float');
		}
		if (name === 'input' || name === 'textarea' || name === '$textarea') {
			return false;
		}
		return true;
	}
	return immediate;
}

function getCellEditProps(renderOpts: VxeColumnPropTypes.EditRender, params: VxeGlobalRendererHandles.RenderTableEditParams, value: any, defaultProps?: any) {
	return XEUtils.assign({ immediate: getInputImmediateModel(renderOpts) }, defaultCompProps, defaultProps, renderOpts.props, {
		[componentDefaultModelProp]: value,
	});
}

function getCellEditFilterProps(renderOpts: any, params: any, value: any, defaultProps?: any) {
	return XEUtils.assign({}, defaultCompProps, defaultProps, renderOpts.props, { [componentDefaultModelProp]: value });
}

function isImmediateCell(renderOpts: VxeColumnPropTypes.EditRender, params: any) {
	return params.$type === 'cell' || getInputImmediateModel(renderOpts);
}

function getCellLabelVNs(renderOpts: any, params: any, cellLabel: any) {
	const { placeholder } = renderOpts;
	return [
		h(
			'span',
			{
				class: 'vxe-cell--label',
			},
			placeholder && isEmptyValue(cellLabel)
				? [
						h(
							'span',
							{
								class: 'vxe-cell--placeholder',
							},
							formatText(getFuncText(placeholder), 1),
						),
				  ]
				: formatText(cellLabel, 1),
		),
	];
}

/**
 * 原生事件处理
 * @param renderOpts
 * @param params
 * @param modelFunc
 * @param changeFunc
 */
function getElementOns(renderOpts: any, params: any, modelFunc?: any, changeFunc?: any) {
	const { events } = renderOpts;
	const modelEvent = getModelEvent(renderOpts);
	const changeEvent = getChangeEvent(renderOpts);
	const isSameEvent = changeEvent === modelEvent;
	const ons: any = {};
	if (events) {
		XEUtils.objectEach(events, (func, key: any) => {
			ons[getOnName(key)] = function (...args: any[]) {
				func(params, ...args);
			};
		});
	}
	if (modelFunc) {
		ons[getOnName(modelEvent)] = function (targetEvnt: any) {
			modelFunc(targetEvnt);
			if (isSameEvent && changeFunc) {
				changeFunc(targetEvnt);
			}
			if (events && events[modelEvent]) {
				events[modelEvent](params, targetEvnt);
			}
		};
	}
	if (!isSameEvent && changeFunc) {
		ons[getOnName(changeEvent)] = function (...args: any[]) {
			changeFunc(...args);
			if (events && events[changeEvent]) {
				events[changeEvent](params, ...args);
			}
		};
	}
	return ons;
}

/**
 * 组件事件处理
 * @param renderOpts
 * @param params
 * @param modelFunc
 * @param changeFunc
 */
function getComponentOns(renderOpts: any, params: any, modelFunc?: any, changeFunc?: any) {
	const { events } = renderOpts;
	const modelEvent = getModelEvent(renderOpts);
	const changeEvent = getChangeEvent(renderOpts);
	const ons: any = {};
	XEUtils.objectEach(events, (func, key: any) => {
		ons[getOnName(key)] = function (...args: any[]) {
			func(params, ...args);
		};
	});
	if (modelFunc) {
		ons[getOnName(modelEvent)] = function (targetEvnt: any) {
			modelFunc(targetEvnt);
			if (events && events[modelEvent]) {
				events[modelEvent](params, targetEvnt);
			}
		};
	}
	if (changeFunc) {
		ons[getOnName(changeEvent)] = function (...args: any[]) {
			changeFunc(...args);
			if (events && events[changeEvent]) {
				events[changeEvent](params, ...args);
			}
		};
	}
	return ons;
}

function getEditOns(renderOpts: any, params: any) {
	const { $table, row, column } = params;
	const { name } = renderOpts;
	const { model } = column;
	const isImmediate = isImmediateCell(renderOpts, params);
	return getComponentOns(
		renderOpts,
		params,
		(cellValue: any) => {
			// 处理 model 值双向绑定
			model.update = true;
			model.value = cellValue;
			if (isImmediate) {
				setCellValue(row, column, cellValue);
			}
		},
		(eventParams: any) => {
			// 处理 change 事件相关逻辑
			if (!isImmediate && ['VxeInput', 'VxeNumberInput', 'VxeTextarea', '$input', '$textarea'].includes(name)) {
				const cellValue = eventParams.value;
				model.update = true;
				model.value = cellValue;
				$table.updateStatus(params, cellValue);
			} else {
				$table.updateStatus(params);
			}
		},
	);
}

function getFilterOns(renderOpts: any, params: any, option: any) {
	return getComponentOns(
		renderOpts,
		params,
		(value: any) => {
			// 处理 model 值双向绑定
			option.data = value;
		},
		() => {
			handleConfirmFilter(params, !XEUtils.eqNull(option.data), option);
		},
	);
}

function getNativeEditOns(renderOpts: any, params: any) {
	const { $table, row, column } = params;
	const { model } = column;
	return getElementOns(
		renderOpts,
		params,
		(evnt: any) => {
			// 处理 model 值双向绑定
			const cellValue = evnt.target.value;
			if (isImmediateCell(renderOpts, params)) {
				setCellValue(row, column, cellValue);
			} else {
				model.update = true;
				model.value = cellValue;
			}
		},
		(evnt: any) => {
			// 处理 change 事件相关逻辑
			const cellValue = evnt.target.value;
			$table.updateStatus(params, cellValue);
		},
	);
}

function getNativeFilterOns(renderOpts: any, params: any, option: any) {
	return getElementOns(
		renderOpts,
		params,
		(evnt: any) => {
			// 处理 model 值双向绑定
			option.data = evnt.target.value;
		},
		() => {
			handleConfirmFilter(params, !XEUtils.eqNull(option.data), option);
		},
	);
}

/**
 * 单元格可编辑渲染-原生的标签
 * input、textarea、select
 */
function nativeEditRender(renderOpts: any, params: any) {
	const { row, column } = params;
	const { name } = renderOpts;
	const cellValue = isImmediateCell(renderOpts, params) ? getCellValue(row, column) : column.model.value;
	return [
		h(name, {
			class: `vxe-default-${name}`,
			...getNativeAttrs(renderOpts),
			value: cellValue,
			...getNativeEditOns(renderOpts, params),
		}),
	];
}

function buttonCellRender(renderOpts: any, params: any) {
	return [
		h(getDefaultComponent(renderOpts), {
			...getCellEditProps(renderOpts, params, null),
			...getComponentOns(renderOpts, params),
		}),
	];
}

function defaultEditRender(renderOpts: VxeGlobalRendererHandles.RenderTableEditOptions, params: VxeGlobalRendererHandles.RenderTableEditParams) {
	const { row, column } = params;
	const cellValue = getCellValue(row, column);
	return [
		h(getDefaultComponent(renderOpts), {
			...getCellEditProps(renderOpts, params, cellValue),
			...getEditOns(renderOpts, params),
		}),
	];
}

function radioAndCheckboxEditRender(renderOpts: VxeGlobalRendererHandles.RenderTableEditOptions, params: VxeGlobalRendererHandles.RenderTableEditParams) {
	const { options } = renderOpts;
	const { row, column } = params;
	const cellValue = getCellValue(row, column);
	return [
		h(getDefaultComponent(renderOpts), {
			options,
			...getCellEditProps(renderOpts, params, cellValue),
			...getEditOns(renderOpts, params),
		}),
	];
}

function renderNativeOptgroups(renderOpts: any, params: any, renderOptionsMethods: any) {
	const { optionGroups, optionGroupProps = {} } = renderOpts;
	const groupOptions = optionGroupProps.options || 'options';
	const groupLabel = optionGroupProps.label || 'label';
	return optionGroups.map((group: any, gIndex: any) => {
		return h(
			'optgroup',
			{
				key: gIndex,
				label: group[groupLabel],
			},
			renderOptionsMethods(group[groupOptions], renderOpts, params),
		);
	});
}

/**
 * 渲染原生的 option 标签
 */
function renderNativeOptions(options: any, renderOpts: any, params: any) {
	const { optionProps = {} } = renderOpts;
	const { row, column } = params;
	const labelProp = optionProps.label || 'label';
	const valueProp = optionProps.value || 'value';
	const disabledProp = optionProps.disabled || 'disabled';
	const cellValue = isImmediateCell(renderOpts, params) ? getCellValue(row, column) : column.model.value;
	return options.map((option: any, oIndex: any) => {
		return h(
			'option',
			{
				key: oIndex,
				value: option[valueProp],
				disabled: option[disabledProp],
				selected: option[valueProp] == cellValue,
			},
			option[labelProp],
		);
	});
}

function nativeFilterRender(renderOpts: any, params: any) {
	const { column } = params;
	const { name } = renderOpts;
	const attrs = getNativeAttrs(renderOpts);
	return column.filters.map((option: any, oIndex: any) => {
		return h(name, {
			key: oIndex,
			class: `vxe-default-${name}`,
			...attrs,
			value: option.data,
			...getNativeFilterOns(renderOpts, params, option),
		});
	});
}

function defaultFilterRender(renderOpts: any, params: any) {
	const { column } = params;
	return column.filters.map((option: any, oIndex: any) => {
		const optionValue = option.data;
		return h(getDefaultComponent(renderOpts), {
			key: oIndex,
			...getCellEditFilterProps(renderOpts, renderOpts, optionValue),
			...getFilterOns(renderOpts, params, option),
		});
	});
}

function defaultInputFilterRender(renderOpts: any, params: any) {
	const { column, $table } = params;
	const { model } = $table.reactData.filterStore;
	let value = get(model, column.field);
	if (value === undefined && column.filterMultiple) {
		value = [];
	}
	return h(getDefaultComponent(renderOpts), {
		key: column.field,
		options: column.filters,
		multiple: column.filterMultiple,
		modelValue: value,
		'onUpdate:modelValue': value => {
			return set(model, column.field, value);
		},
		onChange: (value, evt) => {
			handleInputFilterChange(params, value);
		},
		...renderOpts?.props,
	});
}

const handleInputFilterChange = debounce((params: any, value) => {
	params.$table.reactData.filterStore.column = params.column;
	params.$table.confirmFilterEvent(value);
}, 300);

function handleFilterMethod({ option, row, column }: any) {
	const { data } = option;
	const cellValue = XEUtils.get(row, column.field);
	return cellValue == data;
}

function handleInputFilterMethod({ option, row, column }: any) {
	const { data } = option;
	const cellValue = XEUtils.get(row, column.field);
	return XEUtils.toValueString(cellValue).includes(data);
}

function handleHeaderInputFilterMethod({ row, column, value }: VxeGlobalRendererHandles.TableFilterMethodParams<any>) {
	const { compareKey = column.field, compareOperator = 'include' } = column.filterRender;
	const cellValue = XEUtils.get(row, compareKey);
	if (compareOperator === 'include') {
		return XEUtils.toValueString(cellValue).includes(value);
	} else if (compareOperator === 'eq') {
		return cellValue === value;
	} else if (compareOperator === 'like') {
		return XEUtils.toValueString(cellValue).toLocaleLowerCase().includes(XEUtils.toValueString(value).toLocaleLowerCase());
	} else if (compareOperator === 'between') {
		if (!Array.isArray(value)) {
			if (isEmptyValue(value)) {
				value = [];
			} else {
				value = [value];
			}
		}
		return !(cellValue < value[0]) && !(cellValue > value[1]);
	} else if (compareOperator === 'in') {
		if (Array.isArray(value) && value.length) {
			return value.includes(cellValue);
		} else {
			return true;
		}
	}
	return XEUtils.toValueString(cellValue).includes(value);
}

function nativeSelectEditRender(renderOpts: any, params: any) {
	return [
		h(
			'select',
			{
				class: 'vxe-default-select',
				...getNativeAttrs(renderOpts),
				...getNativeEditOns(renderOpts, params),
			},
			renderOpts.optionGroups
				? renderNativeOptgroups(renderOpts, params, renderNativeOptions)
				: renderNativeOptions(renderOpts.options, renderOpts, params),
		),
	];
}

function defaultSelectEditRender(renderOpts: any, params: any) {
	const { row, column } = params;
	const { options, optionProps, optionGroups, optionGroupProps } = renderOpts;
	const cellValue = getCellValue(row, column);
	return [
		h(getDefaultComponent(renderOpts), {
			...getCellEditProps(renderOpts, params, cellValue, { options, optionProps, optionGroups, optionGroupProps }),
			...getEditOns(renderOpts, params),
		}),
	];
}

function defaultTreeSelectEditRender(renderOpts: any, params: any) {
	const { row, column } = params;
	const { options, optionProps } = renderOpts;
	const cellValue = getCellValue(row, column);
	return [
		h(getDefaultComponent(renderOpts), {
			...getCellEditProps(renderOpts, params, cellValue, { options, optionProps }),
			...getEditOns(renderOpts, params),
		}),
	];
}

function getSelectCellValue(renderOpts: any, { row, column }: any) {
	const { options, optionGroups, optionProps = {}, optionGroupProps = {} } = renderOpts;
	const cellValue = XEUtils.get(row, column.field);
	let selectItem: any;
	const labelProp = optionProps.label || 'label';
	const valueProp = optionProps.value || 'value';
	if (!(cellValue === null || cellValue === undefined)) {
		return XEUtils.map(
			XEUtils.isArray(cellValue) ? cellValue : [cellValue],
			optionGroups
				? value => {
						const groupOptions = optionGroupProps.options || 'options';
						for (let index = 0; index < optionGroups.length; index++) {
							selectItem = XEUtils.find(optionGroups[index][groupOptions], item => item[valueProp] == value);
							if (selectItem) {
								break;
							}
						}
						return selectItem ? selectItem[labelProp] : value;
				  }
				: value => {
						selectItem = XEUtils.find(options, item => item[valueProp] == value);
						return selectItem ? selectItem[labelProp] : value;
				  },
		).join(', ');
	}
	return '';
}

function handleExportSelectMethod(params: any) {
	const { row, column, options } = params;
	return options.original ? getCellValue(row, column) : getSelectCellValue(column.editRender || column.cellRender, params);
}

function getTreeSelectCellValue(renderOpts: any, { row, column }: any) {
	const { options, optionProps = {} } = renderOpts;
	const cellValue = XEUtils.get(row, column.field);
	const labelProp = optionProps.label || 'label';
	const valueProp = optionProps.value || 'value';
	const childrenProp = optionProps.children || 'children';
	if (!(cellValue === null || cellValue === undefined)) {
		const keyMaps: Record<string, any> = {};
		XEUtils.eachTree(
			options,
			item => {
				keyMaps[XEUtils.get(item, valueProp)] = item;
			},
			{ children: childrenProp },
		);
		return XEUtils.map(XEUtils.isArray(cellValue) ? cellValue : [cellValue], value => {
			const item = keyMaps[value];
			return item ? XEUtils.get(item, labelProp) : item;
		}).join(', ');
	}
	return '';
}

function handleExportTreeSelectMethod(params: any) {
	const { row, column, options } = params;
	return options.original ? getCellValue(row, column) : getTreeSelectCellValue(column.editRender || column.cellRender, params);
}

/**
 * 表格 - 渲染器
 */
renderer.mixin({
	input: {
		tableAutoFocus: 'input',
		renderTableEdit: nativeEditRender,
		renderTableDefault: nativeEditRender,
		renderTableFilter: nativeFilterRender,
		tableFilterDefaultMethod: handleInputFilterMethod,
	},
	textarea: {
		tableAutoFocus: 'textarea',
		renderTableEdit: nativeEditRender,
	},
	select: {
		renderTableEdit: nativeSelectEditRender,
		renderTableDefault: nativeSelectEditRender,
		renderTableCell(renderOpts, params) {
			return getCellLabelVNs(renderOpts, params, getSelectCellValue(renderOpts, params));
		},
		renderTableFilter(renderOpts, params) {
			const { column } = params;
			return column.filters.map((option, oIndex) => {
				return h(
					'select',
					{
						key: oIndex,
						class: 'vxe-default-select',
						...getNativeAttrs(renderOpts),
						...getNativeFilterOns(renderOpts, params, option),
					},
					renderOpts.optionGroups
						? renderNativeOptgroups(renderOpts, params, renderNativeOptions)
						: renderNativeOptions(renderOpts.options, renderOpts, params),
				);
			});
		},
		tableFilterDefaultMethod: handleFilterMethod,
		tableExportMethod: handleExportSelectMethod,
	},
	Input: {
		tableAutoFocus: 'input',
		renderTableEdit: defaultEditRender,
		renderTableCell(renderOpts, params) {
			const { props = {} } = renderOpts;
			const { row, column } = params;
			const cellValue = XEUtils.get(row, column.field);
			return getCellLabelVNs(renderOpts, params, cellValue);
		},
		renderTableDefault: defaultEditRender,
		renderTableFilter: defaultFilterRender,
		renderTableHeaderFilter: defaultInputFilterRender,
		tableFilterDefaultMethod: handleInputFilterMethod,
		tableHeaderFilterDefaultMethod: handleHeaderInputFilterMethod,
	},
	// VxeInput: {
	// 	tableAutoFocus: 'input',
	// 	renderTableEdit: defaultEditRender,
	// 	renderTableCell(renderOpts, params) {
	// 		const { props = {} } = renderOpts;
	// 		const { row, column } = params;
	// 		const digits = props.digits || 2;
	// 		let cellValue = XEUtils.get(row, column.field);
	// 		if (cellValue) {
	// 			switch (props.type) {
	// 				case 'date':
	// 				case 'week':
	// 				case 'month':
	// 				case 'quarter':
	// 				case 'year':
	// 					cellValue = getLabelFormatDate(cellValue, props);
	// 					break;
	// 				case 'float':
	// 					cellValue = XEUtils.toFixed(XEUtils.floor(cellValue, digits), digits);
	// 					break;
	// 			}
	// 		}
	// 		return getCellLabelVNs(renderOpts, params, cellValue);
	// 	},
	// 	renderTableDefault: defaultEditRender,
	// 	renderTableFilter: defaultFilterRender,
	// 	tableFilterDefaultMethod: handleInputFilterMethod,
	// },
	// VxeNumberInput: {
	// 	tableAutoFocus: 'input',
	// 	renderTableEdit: defaultEditRender,
	// 	renderTableCell(renderOpts, params) {
	// 		const { props = {} } = renderOpts;
	// 		const { row, column } = params;
	// 		const digits = props.digits || 2;
	// 		let cellValue = XEUtils.get(row, column.field);
	// 		if (cellValue) {
	// 			switch (props.type) {
	// 				case 'float':
	// 					cellValue = XEUtils.toFixed(XEUtils.floor(cellValue, digits), digits);
	// 					break;
	// 			}
	// 		}
	// 		return getCellLabelVNs(renderOpts, params, cellValue);
	// 	},
	// 	renderTableDefault: defaultEditRender,
	// 	renderTableFilter: defaultFilterRender,
	// 	tableFilterDefaultMethod: handleInputFilterMethod,
	// },
	// VxeDatePicker: {
	// 	tableAutoFocus: 'input',
	// 	renderTableEdit: defaultEditRender,
	// 	renderTableCell(renderOpts, params) {
	// 		const { props = {} } = renderOpts;
	// 		const { row, column } = params;
	// 		let cellValue = XEUtils.get(row, column.field);
	// 		if (cellValue) {
	// 			switch (props.type) {
	// 				case 'date':
	// 				case 'week':
	// 				case 'month':
	// 				case 'quarter':
	// 				case 'year':
	// 					cellValue = getLabelFormatDate(cellValue, props);
	// 					break;
	// 			}
	// 		}
	// 		return getCellLabelVNs(renderOpts, params, cellValue);
	// 	},
	// 	renderTableDefault: defaultEditRender,
	// 	renderTableFilter: defaultFilterRender,
	// 	tableFilterDefaultMethod: handleFilterMethod,
	// },
	// VxeTextarea: {
	// 	tableAutoFocus: 'VxeTextarea',
	// },
	// VxeButton: {
	// 	renderTableDefault: buttonCellRender,
	// },
	// VxeButtonGroup: {
	// 	renderTableDefault(renderOpts, params) {
	// 		const { options } = renderOpts;
	// 		return [
	// 			h(getDefaultComponent(renderOpts), {
	// 				options,
	// 				...getCellEditProps(renderOpts, params, null),
	// 				...getComponentOns(renderOpts, params),
	// 			}),
	// 		];
	// 	},
	// },
	// VxeSelect: {
	// 	tableAutoFocus: 'input',
	// 	renderTableEdit: defaultSelectEditRender,
	// 	renderTableDefault: defaultSelectEditRender,
	// 	renderTableCell(renderOpts, params) {
	// 		return getCellLabelVNs(renderOpts, params, getSelectCellValue(renderOpts, params));
	// 	},
	// 	renderTableFilter(renderOpts, params) {
	// 		const { column } = params;
	// 		const { options, optionProps, optionGroups, optionGroupProps } = renderOpts;
	// 		return column.filters.map((option, oIndex) => {
	// 			const optionValue = option.data;
	// 			return h(getDefaultComponent(renderOpts), {
	// 				key: oIndex,
	// 				...getCellEditFilterProps(renderOpts, params, optionValue, { options, optionProps, optionGroups, optionGroupProps }),
	// 				...getFilterOns(renderOpts, params, option),
	// 			});
	// 		});
	// 	},
	// 	tableFilterDefaultMethod: handleFilterMethod,
	// 	tableExportMethod: handleExportSelectMethod,
	// },
	// VxeTreeSelect: {
	// 	tableAutoFocus: 'input',
	// 	renderTableEdit: defaultTreeSelectEditRender,
	// 	renderTableCell(renderOpts, params) {
	// 		return getCellLabelVNs(renderOpts, params, getTreeSelectCellValue(renderOpts, params));
	// 	},
	// 	tableExportMethod: handleExportTreeSelectMethod,
	// },
	// VxeIconPicker: {
	// 	tableAutoFocus: 'input',
	// 	renderTableEdit: defaultEditRender,
	// 	renderTableCell(renderOpts, params) {
	// 		const { row, column } = params;
	// 		const cellValue = XEUtils.get(row, column.field);
	// 		return h('i', {
	// 			class: cellValue,
	// 		});
	// 	},
	// },
	// VxeRadioGroup: {
	// 	renderTableDefault: radioAndCheckboxEditRender,
	// },
	// VxeCheckboxGroup: {
	// 	renderTableDefault: radioAndCheckboxEditRender,
	// },
	// VxeSwitch: {
	// 	tableAutoFocus: 'button',
	// 	renderTableEdit: defaultEditRender,
	// 	renderTableDefault: defaultEditRender,
	// },
	// VxeUpload: {
	// 	renderTableEdit: defaultEditRender,
	// 	renderTableCell: defaultEditRender,
	// 	renderTableDefault: defaultEditRender,
	// },
	// VxeImage: {
	// 	renderTableDefault(renderOpts, params) {
	// 		const { row, column } = params;
	// 		const { props } = renderOpts;
	// 		const cellValue = getCellValue(row, column);
	// 		return [
	// 			h(getDefaultComponent(renderOpts), {
	// 				...props,
	// 				src: cellValue,
	// 				...getEditOns(renderOpts, params),
	// 			}),
	// 		];
	// 	},
	// },
	// VxeImageGroup: {
	// 	renderTableDefault(renderOpts, params) {
	// 		const { row, column } = params;
	// 		const { props } = renderOpts;
	// 		const cellValue = getCellValue(row, column);
	// 		return [
	// 			h(getDefaultComponent(renderOpts), {
	// 				...props,
	// 				urlList: cellValue,
	// 				...getEditOns(renderOpts, params),
	// 			}),
	// 		];
	// 	},
	// },
});
