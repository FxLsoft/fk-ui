# 自定义粘贴

```vue { "component": true }
<template>
	<fk-space>
		<div ref="pastedRef" class="active-wrap" @mouseenter="handleMouseEnter">
            <fk-space direction="vertical">
                <span>粘贴文件</span>
                <fk-input v-model="vm.input" placeholder="input/textarea 聚焦时无法复制" />
            </fk-space>
        </div>
        <div ref="dragRef" class="active-wrap" draggable @mouseenter="handleMouseEnter">
            <fk-space direction="vertical">
                <span>拖拽文件 draggable</span>
            </fk-space>
        </div>
	</fk-space>
	<p>数据模型</p>
	<fk-row>
		<JsonViewer :data="vm" />
	</fk-row>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, reactive, useTemplateRef } from 'vue';
import { pop } from '@erp/biz';
import { PastedFile } from '@erp/common';

const vm = reactive({
    files: [],
    input: ''
});

const pastedRef = useTemplateRef('pastedRef')
const dragRef = useTemplateRef('dragRef')

const onFiles = (files: File[]) => {
	vm.files.push(files.map(v => {
        return {
            name: v.name,
            size: v.size,
            type: v.type,
            webkitRelativePath: v.webkitRelativePath,
            lastModified: v.lastModified,
        }
    }));
    pop.success('粘贴成功')
};

onMounted(() => {
	handleMouseEnter();
});

onUnmounted(() => {
	PastedFile.removeEventListener(onFiles);
});

const handleMouseEnter = () => {
	pastedRef.value?.focus();
	PastedFile.addEventListener(onFiles, pastedRef.value);
    PastedFile.addEventListener(onFiles, dragRef.value);
};
</script>
<style lang="less">
.active-wrap {
	width: 300px;
	height: 300px;
	background: #f5f6f7;
	display: flex;
	justify-content: center;
	align-items: center;
    &:hover {
        background: #e5e6e7;
    }

    &.drag-active {
        background: #d5d6d7;
    }
}
</style>
```
