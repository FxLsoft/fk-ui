## 树形选择输入

树形选择

```vue
<ErpInput type="tree" v-model="value" :options="options" />
```

```vue { "component": true }
<template>
	<div class="erp-input-demo">
		<h5>单选</h5>
		<ErpInput ref="input" v-model="vm.value" type="tree" :options="options" @blur="onBlur"/>
		<h5>多选</h5>
		<ErpInput v-model="vm.values" type="tree" :options="options" multiple @blur="onBlur"/>
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

const onBlur = (e) => {
    console.log('blur', vm.value, e);
}

const vm = reactive({
	value: '',
	values: [],
});

const options = [
	{
		value: 'node1',
		label: '一级树',
		children: [
			{
				value: 'node2',
				label: '二级树',
				disabled: true,
			},
		],
	},
	{
		value: 'node3',
		label: '三级树',
		children: [
			{
				value: 'node4',
				label: '四级树',
			},
			{
				value: 'node5',
				label: '五级树',
			},
			{
				value: 'node6',
				label: '六级树',
			},
			{
				value: 'node7',
				label: '七级树',
			},
		],
	},
];
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
