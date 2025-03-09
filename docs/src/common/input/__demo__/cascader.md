## 级联选择输入

级联选择

```vue
<ErpInput type="cascader" v-model="value" :options="options" path-mode/>
```

```vue { "component": true }
<template>
	<div class="erp-input-demo">
		<h5>单选</h5>
		<ErpInput v-model="vm.value" type="cascader" :options="options" path-mode />
		<h5>多选</h5>
		<ErpInput v-model="vm.values" type="cascader" :options="options" multiple />
	</div>
	<fk-row>
        <JsonViewer :data="vm" />
    </fk-row>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { Input as ErpInput } from '@erp/biz';

const vm = reactive({
	value: '',
	values: [],
});

const options = [
	{
		value: 'beijing',
		label: 'Beijing',
		children: [
			{
				value: 'chaoyang',
				label: 'ChaoYang',
				children: [
					{
						value: 'datunli',
						label: 'Datunli',
					},
				],
			},
			{
				value: 'haidian',
				label: 'Haidian',
			},
			{
				value: 'dongcheng',
				label: 'Dongcheng',
			},
			{
				value: 'xicheng',
				label: 'Xicheng',
				children: [
					{
						value: 'jinrongjie',
						label: 'Jinrongjie',
					},
					{
						value: 'tianqiao',
						label: 'Tianqiao',
					},
				],
			},
		],
	},
	{
		value: 'shanghai',
		label: 'Shanghai',
		children: [
			{
				value: 'huangpu',
				label: 'Huangpu',
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
