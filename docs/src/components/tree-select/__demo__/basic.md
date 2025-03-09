```yaml
title:
    zh-CN: 基本用法
    en-US: Basic
```

最简单的用法。

---

```vue { "component": true }
<template>
	<fk-tree-select v-model="vm.selected" :data="treeData" tree-checked-strategy="child" placeholder="Please select ..." style="width: 300px" :tree-props="{onlyCheckLeaf: true}" />
</template>
<script setup>
import {reactive} from 'vue';

const vm = reactive({
    selected: ''
})
const treeData = [
	{
		key: 'node1',
		title: 'Trunk',
		disabled: true,
		children: [
			{
				key: 'node2',
				title: 'Leaf2',
			},
		],
	},
	{
		key: 'node3',
		title: 'Trunk2',
		children: [
			{
				key: 'node4',
				title: 'Leaf4',
			},
			{
				key: 'node5',
				title: 'Leaf5',
			},
		],
	},
];
</script>
```
