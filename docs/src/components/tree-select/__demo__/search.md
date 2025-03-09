```yaml
title:
    zh-CN: 搜索
    en-US: Search
```

1、设置 `:allow-search="true"` 启用搜索功能。动态加载时候只能在已加载数据中进行搜索。默认的关键字搜索是从`value`字段匹配。也可以传入 `filterTreeNode`自定义过滤方式。

2、设置 `:allow-search="{ retainInputValue: true }"` 启用搜索功能，并保留输入框的值。

---

```vue { "component": true }
<template>
	<fk-space direction="vertical">
		<fk-space>
			<fk-tree-select :allow-search="true" :allow-clear="true" :data="treeData" placeholder="Please select ..." style="width: 300px" />
			<fk-tree-select
				:allow-search="true"
				:allow-clear="true"
				:data="treeData"
				:filter-tree-node="filterTreeNode"
				placeholder="Please select ..."
				style="width: 300px"
			/>
		</fk-space>
		<fk-space>
			<fk-tree-select
				v-model:inputValue="inputValue"
				:disable-filter="false"
				:allow-search="{ retainInputValue: true }"
				:allow-clear="true"
				:tree-checkable="true"
                :multiple="true"
                :tree-props="{
					defaultExpandAll: false,
					virtualListProps: {
						height: 200,
					},
				}"
                tree-checked-strategy="child"
				:data="treeData"
				placeholder="Please select ..."
				style="width: 300px"
			/>
			<fk-tree-select
				:allow-search="true"
				:allow-clear="true"
				:tree-checkable="true"
				:data="treeData"
				:filter-tree-node="filterTreeNode"
				placeholder="Please select ..."
				style="width: 300px"
			/>
		</fk-space>
	</fk-space>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const inputValue = ref('');

function filterTreeNode(searchValue, nodeData) {
	return nodeData.title.toLowerCase().includes(searchValue.toLowerCase());
}

const treeData = [
	{
		title: 'Trunk 0-0',
		key: '0-0',
		children: [
			{
				title: 'Branch 0-0-1',
				key: '0-0-1',
				children: [
					{
						title: 'Leaf 0-0-1-1',
						key: '0-0-1-1',
					},
					{
						title: 'Leaf 0-0-1-2',
						key: '0-0-1-2',
					},
				],
			},
		],
	},
	{
		title: 'Trunk 0-1',
		key: '0-1',
		children: [
			{
				title: 'Branch 0-1-1',
				key: '0-1-1',
				children: [
					{
						title: 'Leaf 0-1-1-0',
						key: '0-1-1-0',
					},
				],
			},
			{
				title: 'Branch 0-1-2',
				key: '0-1-2',
				children: [
					{
						title: 'Leaf 0-1-2-0',
						key: '0-1-2-0',
					},
				],
			},
		],
	},
];
</script>
```
