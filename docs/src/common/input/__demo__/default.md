## 实例

```vue { "component": true }
<template>
	<div class="input-demo">
		<div class="erp-input-demo">
			<h4>复选框</h4>
			<ErpInput v-model="vm.checkbox" type="checkbox" :options="checkboxOptions" />
			<h4>单选</h4>
			<ErpInput v-model="vm.radio" type="radio" :options="checkboxOptions" />
			<h4>文本域</h4>
			<ErpInput v-model="vm.textarea" type="textarea" />
			<h4>简单输入框</h4>
			<ErpInput v-model="vm.text" type="text" placeholder="请输入" />
			<h4>数字输入框</h4>
			<ErpInput v-model="vm.number" type="number" placeholder="请输入" />
			<h4>日期选择</h4>
			<ErpInput v-model="vm.date" type="date" placeholder="请选择" />
			<h4>日期范围选择</h4>
			<ErpInput v-model="vm.rangedate" type="rangedate" />
			<h4>自动补全输入框</h4>
			<ErpInput v-model="vm.autocomplete" type="autocomplete" :options="options" @change="handleSearch" />

			<h4>选择器-单选</h4>
			<ErpInput v-model="vm.select" type="select" :options="selectOptions" />
			<h4>选择器-多选</h4>
			<ErpInput v-model="vm.multipleSelect" type="select" multiple :options="selectOptions" />
			<h4>级联选择-单选</h4>
			<ErpInput v-model="vm.cascader" type="cascader" :options="cascaderOptions" />
			<h4>级联选择-多选</h4>
			<ErpInput v-model="vm.multipleCascader" type="cascader" multiple :options="cascaderOptions" />
			<h4>树形选择-单选</h4>
			<ErpInput v-model="vm.tree" type="tree" :options="treeData" />
			<h4>树形选择-多选</h4>
			<ErpInput v-model="vm.multipleTree" type="tree" multiple :options="treeData" />
		</div>
		<h4>上传-多选</h4>
		<ErpInput v-model="vm.multipleUpload" type="upload" multiple />
		<h4>上传-单选</h4>
		<ErpInput v-model="vm.upload" type="upload" />
		<h4>数据模型</h4>
		<fk-row>
            <JsonViewer :data="vm" />
        </fk-row>
	</div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { Input as ErpInput } from '@erp/biz';

const vm = reactive({
	text: '',
	textarea: '',
	number: '',
	date: '',
	rangedate: [],
	autocomplete: '',
	checkbox: [3, 5],
	radio: 2,
	select: '',
	multipleSelect: [],
	cascader: '',
	multipleCascader: [],
	tree: '',
	multipleTree: [],
	upload: {
		uid: '-2',
		name: '103937.png',
		url: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
	},
	multipleUpload: [
		{
			uid: '-2',
			name: '103937.png',
			url: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
		},
		{
			uid: '-1',
			name: 'hahhahahahaha.png',
			url: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp',
		},
		{
			uid: '1',
			name: '103937.png',
			url: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
		},
		{
			uid: '2',
			name: 'hahhahahahaha.png',
			url: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp',
		},
	],
});

const options = ref([]);
const checkboxOptions = [
	{
		label: '未选中项',
		value: 1,
	},
	{
		label: '未选悬停项',
		value: 2,
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
const selectOptions = [
	{
		label: '未选中项',
		value: 1,
	},
	{
		label: '未选悬停项',
		value: 2,
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

for (let i = 0; i < 10; i++) {
	selectOptions.push({
		label: String(i * 10),
		value: String(i * 10),
	});
}

const handleSearch = value => {
	if (value) {
		options.value = [...Array.from({ length: 5 })].map((_, index) => `${value}-${index}`);
		console.log(options.value);
	} else {
		options.value = [];
	}
};

const cascaderOptions = [
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

const treeData = [
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
				label: '六级树',
			},
		],
	},
];
</script>

<style lang="scss" scoped>
.erp-input-demo {
	width: 240px;
	h4 {
		font-size: 16px;
		margin: 12px 0 6px;
	}
	:deep(.fk-picker) {
		width: 100%;
	}
	:deep(.fk-upload-wrapper) {
		width: 400px;
	}
	pre {
		word-break: break-all;
	}
}
</style>
```
