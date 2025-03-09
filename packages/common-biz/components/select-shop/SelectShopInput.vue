<template>
	<InputTag v-model="model" :disabled="disabled" :placeholder="placeholder" @click="handleClick" />
</template>

<script lang="ts" setup>
import { computed, watch } from 'vue';
import { cloneDeep } from 'lodash-es';
import { InputTag, isObject } from '@erp/common';
import { UPDATE_MODEL } from '../../utils/constants';
import { getStoreApi, selectShopPop } from '.';
import type { TagData } from '@erp/common';

const props = withDefaults(
	defineProps<{
		modelValue: (TagData | number)[] | TagData | number;
		disabled?: boolean;
		placeholder?: string;
		multiple?: boolean;
	}>(),
	{
		multiple: true,
	},
);

const emit = defineEmits([UPDATE_MODEL]);

const model = computed({
	get() {
		if (Array.isArray(props.modelValue)) {
			return props.modelValue.map(v => {
				if (isObject(v)) {
					return v;
				} else {
					return {
						label: '',
						value: v,
					} as TagData;
				}
			});
		} else if (props.modelValue) {
			if (isObject(props.modelValue)) {
				return [props.modelValue];
			} else {
				return [
					{
						label: '',
						value: props.modelValue,
					} as TagData,
				];
			}
		}
		return [];
	},
	set(value) {
		if (props.multiple) {
			emit(UPDATE_MODEL, value);
		} else {
			emit(UPDATE_MODEL, value?.[0] ?? null);
		}
	},
});

const needEchoTags = computed(() => {
	return model.value.filter(v => !v.label);
});

const handleClick = () => {
	if (!props.disabled) {
		selectShopPop({
			ids: model.value.map(v => v.value!),
			multiple: props.multiple,
		}).then((res: any) => {
			const values = (res || []).map(v => {
				return {
					value: v.id,
					label: v.name,
				};
			});
			if (!props.multiple) {
				emit(UPDATE_MODEL, values[0] ?? null);
			} else {
				emit(UPDATE_MODEL, values);
			}
		});
	}
};

const shopMap = new Map<number, string>();

/**
 * 刷新label
 */
function freshEchoTag() {
	const value = cloneDeep(model.value);
	value.forEach(el => {
		el.label = (shopMap.get(el.value as number) ?? el.value) as string;
	});
	emit(UPDATE_MODEL, value);
}

// 处理回显
watch(
	() => needEchoTags.value.length,
	() => {
		if (needEchoTags.value.length > 0) {
			if (shopMap.size) {
				freshEchoTag();
			} else {
				return getStoreApi().then(res => {
					(res || []).forEach(el => {
						el.children.forEach(c => {
							shopMap.set(c.id, c.name);
						});
					});
					freshEchoTag();
				});
			}
		}
	},
	{
		flush: 'post',
		immediate: true,
	},
);
</script>
