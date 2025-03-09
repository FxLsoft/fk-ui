import type { GridItemData } from '../interface';

export function resolveItemData(cols: number, props: GridItemData): GridItemData {
	const originSpan = props.span ?? 1;
	const originOffset = props.offset ?? 0;
	const offset = Math.min(originOffset, cols);
	const span = Math.min(offset > 0 ? originSpan + originOffset : originSpan, cols);
	return {
		span,
		offset,
		suffix: 'suffix' in props ? props.suffix !== false : false,
		index: props.index,
	};
}

export function setItemVisible({
	cols,
	collapsed,
	collapsedRows,
	itemDataList,
}: {
	cols: number;
	collapsed: boolean;
	collapsedRows: number;
	itemDataList: GridItemData[];
}) {
	let overflow = false;
	let canCollapse = false;
	let displayIndexList: number[] = [];

	function isOverflow(span: number) {
		return Math.ceil(span / cols) > collapsedRows;
	}

	if (collapsed) {
		let spanSum = 0;

		for (let i = 0; i < itemDataList.length; i++) {
			if (!itemDataList[i]) {
				continue;
			}
			if (itemDataList[i].suffix) {
				spanSum += itemDataList[i].span;
				displayIndexList.push(i);
			}
		}

		if (!isOverflow(spanSum)) {
			let current = 0;
			while (current < itemDataList.length) {
				const item = itemDataList[current];
				if (!item) {
					current++;
					continue;
				}
				if (!item.suffix) {
					spanSum += item.span;

					if (isOverflow(spanSum)) {
						canCollapse = true;
						break;
					}

					displayIndexList.push(current);
				}

				current++;
			}
		} else {
			canCollapse = false;
		}

		overflow = itemDataList.some((item, index) => !item.suffix && !displayIndexList.includes(index));
	} else {
		displayIndexList = itemDataList.map((_, index) => index);
		let spanSum = 0;

		for (let i = 0; i < itemDataList.length; i++) {
			if (!itemDataList[i]) {
				continue;
			}
			spanSum += itemDataList[i].span;
		}
		if (isOverflow(spanSum)) {
			canCollapse = true;
		}
	}
	console.log(overflow, canCollapse, displayIndexList, collapsedRows);
	return {
		overflow,
		canCollapse,
		displayIndexList,
	};
}
