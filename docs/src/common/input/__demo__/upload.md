## 上传文件输入

上传文件

```vue
<ErpInput type="upload" v-model="value" />
```

```vue { "component": true }
<template>
	<div class="erp-input-demo">
		<h5>单选</h5>
		<ErpInput v-model="vm.value" type="upload" />
		<h5>多选</h5>
		<ErpInput v-model="vm.values" accept="图片" type="upload" multiple />
		<h5>视频</h5>
		<ErpInput v-model="vm.video" accept="视频" drag-text="也可拖拽视频文件到此处" button-text="点击选择视频" type="upload" :pasted="false" />
		<h5>图片</h5>
		<ErpInput v-model="vm.value" class="picture-48" :show-picture-name="false" type="upload" />
	</div>
	<fk-row>
		<JsonViewer :data="vm" />
	</fk-row>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { Input as ErpInput } from '@erp/biz';

const vm = reactive({
	video: null,
	value: {
		uid: '-2',
		name: '103937.png',
		url: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
	},
	values: [
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
	],
});
</script>

<style lang="scss" scoped>
.erp-input-demo {
	h5 {
		font-size: 14px;
		margin: 12px 0 6px;
	}
	:deep(.fk-upload-drag-wrapper) {
		width: 400px;
	}
	:deep(.picture-48) {
		.fk-upload-list-picture {
			--picture-width: 48px;
		}
	}
}
pre {
	overflow: auto;
}
</style>
```
