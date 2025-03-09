<template>
	<Select
		v-model="model"
		class="dic-input"
		tag-nowrap
		allow-search
		:placeholder="placeholder"
		:allow-clear="allowClear"
		:multiple="multiple"
		:disabled="disabled"
		:options="options"
		scrollbar
		v-bind="$attrs"
	/>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { Select } from '@erp/common';
import { UPDATE_MODEL } from '../../utils/constants';
import { getDicApi } from './api';
import type { OptionData } from '../input/interface';
import type { DicInputProps } from './interface';

const props = defineProps<DicInputProps>();

const emit = defineEmits([UPDATE_MODEL, 'change', 'init']);

const loading = ref(true);
const options = ref<OptionData[]>([]);

const model = computed({
	get() {
		return props.modelValue;
	},
	set(value) {
		if (props.multiple) {
			if (!Array.isArray(value) && value) {
				value = [value];
			}
			const filters = options.value.filter(v => (value as Array<string | number | boolean | Record<string, any>>).includes(v.value));
			emit(UPDATE_MODEL, value);
			emit('change', value, filters);
		} else {
			const find = options.value.find(v => v.value === value);
			emit(UPDATE_MODEL, value);
			emit('change', value, find);
		}
	},
});

const init = () => {
	getDicApi(props.code)
		.then(res => {
			const list = res || [];
			options.value = list;
			emit('init', list);
		})
		.finally(() => {
			loading.value = false;
		});
};

onMounted(() => {
	init();
});
</script>

<style lang="less"></style>
