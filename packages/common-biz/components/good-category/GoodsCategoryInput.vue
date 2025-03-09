<template>
	<TreeSelect
		v-model="model"
		class="goods-category-input"
		tag-nowrap
		allow-search
		:tree-checkable="treeCheckable"
		:field-names="{
			key: 'value',
			title: 'label',
			filterKey: 'label',
			children: 'children',
		}"
		:placeholder="placeholder"
		:allow-clear="allowClear"
		:multiple="multiple"
		:disabled="disabled"
		:data="options"
		:tree-props="{
			virtualListProps: {
				height: 200,
			},
		}"
	/>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { TreeSelect } from '@erp/common';
import { UPDATE_MODEL } from '../../utils/constants';
import { getGoodCategoryApi } from './api';
import type { BaseInputProps, OptionData } from '../input/interface';

const props = defineProps<BaseInputProps>();
const emit = defineEmits([UPDATE_MODEL]);

const loading = ref(true);
const options = ref<OptionData[]>([]);

const model = computed({
	get() {
		return props.modelValue as any;
	},
	set(value) {
		emit(UPDATE_MODEL, value);
	},
});

const treeCheckable = computed(() => {
	return props.multiple;
});

const init = () => {
	const params = {};
	getGoodCategoryApi(params)
		.then(res => {
			options.value = traverse(res || []);
		})
		.finally(() => {
			loading.value = false;
		});
};

function traverse(list) {
	if (Array.isArray(list)) {
		for (const el of list) {
			traverse(el);
		}
	} else if (list) {
		list.value = list.id;
		list.label = list.category_name;
		traverse(list.children);
	}
	return list;
}

onMounted(() => {
	init();
});
</script>

<style lang="less"></style>
