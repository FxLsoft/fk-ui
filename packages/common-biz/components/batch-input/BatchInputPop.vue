<template>
	<div class="batch-input-pop">
		<div class="describe">
			{{ viewDescribe }}
		</div>
		<DynamicForm ref="dynamicForm" :model-value="model" :config="config" />
	</div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue';
import DynamicForm from '../form';
import { pop } from '../pop';
import type { BatchInputProps } from './interface';
import type { DynamicFormConfig } from '../form';
import type { PageExpose } from '../pop/interface';

const props = withDefaults(defineProps<BatchInputProps>(), {
	limit: 50,
	bizName: '值',
});

/**
 * 触发事件
 */
const emit = defineEmits<{
	(event: 'close', param?: any): void;
	(event: 'ok', param?: any): void;
	(event: 'loading', l: boolean): void;
}>();

const config: DynamicFormConfig = {
	showSide: false,
	fields: [
		{
			type: 'textarea',
			key: 'input',
			placeholder: props.placeholder ?? '请输入',
			componentProps: {
				autoSize: {
					minRows: 10,
				},
			},
		},
	],
};

const model = reactive({
	input: '',
});

const viewDescribe = computed(() => {
	if (props.describe) {
		return props.describe;
	} else {
		return `一次最多可查询${props.limit}个${props.bizName}，多个${props.bizName}需换行输入或者使用逗号“，”分隔`;
	}
});

/**
 * 给Modal调用的
 */
defineExpose<PageExpose>({
	/**
	 * 返回给调用方
	 */
	async getModel() {
		const input = model.input.trim().replace(/([\s,，]+)/g, (a, b) => ',');
		if (!input) {
			pop.warning('请输入内容');
			return false;
		}
		return input;
	},
});
</script>

<style lang="scss">
.batch-input-pop {
	width: 640px;
	.form-fields-group {
		padding: 0;
	}
	.fk-form-item {
		margin-bottom: 0;
	}
	.describe {
		color: var(--color-text-3);
		font-size: 14px;
	}
}
</style>
