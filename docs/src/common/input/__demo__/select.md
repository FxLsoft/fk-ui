## 选择器输入

选择器

```vue
<ErpInput type="select" v-model="value" :options="options" />
```

```vue { "component": true }
<template>
	<div class="erp-input-demo">
		<h5>单选</h5>
		<ErpInput ref="input" v-model="vm.value" type="select" :options="options" />

		<h5>多选</h5>
		<ErpInput v-model="vm.values" type="select" :options="options" multiple />
		<h5>多选(全选) <code>check-all </code> 属性</h5>
		<ErpInput v-model="vm.values1" check-all type="select" :options="options" multiple />
		<h5>超大数据</h5>
		<ErpInput v-model="vm.largeValues" type="select" :options="multipleOptions" multiple />
	</div>
	<fk-row style="margin-top: 12px">
		<fk-space>
			<fk-button type="primary" @click="handleFocus">聚焦事件</fk-button>
			<fk-button type="primary" @click="handleBlur">失焦事件</fk-button>
		</fk-space>
	</fk-row>
	<fk-row>
		<JsonViewer :data="vm" />
	</fk-row>
</template>

<script lang="ts" setup>
import { reactive, useTemplateRef } from 'vue';
import { Input as ErpInput } from '@erp/biz';

const input = useTemplateRef('input');

const handleFocus = () => {
	input.value?.focus();
};

const handleBlur = () => {
	input.value?.blur();
};

const vm = reactive({
	value: '',
	values: ['1', 2, 5],
	values1: [],
	largeValues: [],
});

const options = [
	{
		label: '未选中项',
		value: 1,
	},
	{
		label: '未选悬停项',
		value: '2',
	},
	{
		label: '选中项',
		value: 3,
	},
	{
		label: '未选禁用项',
		value: 4,
	},
	{
		label: '选中禁用项',
		value: 5,
		disabled: true,
	},
];

const multipleOptions = [];

for (let i = 0; i < 1000; i++) {
	multipleOptions.push({
		label: `选项--${i + 1}`,
		value: i,
	});
}
</script>

<style lang="scss" scoped>
.erp-input-demo {
	width: 240px;
	h5 {
		font-size: 14px;
		margin: 12px 0 6px;
	}
}
</style>
```
