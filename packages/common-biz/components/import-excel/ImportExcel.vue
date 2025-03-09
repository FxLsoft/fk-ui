<template>
	<div class="import-dialog-pop">
		<div v-if="tips" class="import-tips">
			<i class="erpfont icon-exclamation-circle" />
			<span>{{ tips }}</span>
		</div>

		<div class="model-item">
			<div class="title">1.请下载模板，填写{{ bizName }}</div>
			<div class="model-content" @click="handleDownload">
				<i class="erpfont icon-excel" />
				点击下载模版
			</div>
		</div>

		<div class="upload-item">
			<div class="title">2.请写完成后，将文件上传至此处</div>
			<div class="upload-content">
				<Input v-model="uploadExcel" type="upload" accept="excel" list-type="text" tooltip="粘贴excel至此处" drag-text="也可以拖拽或粘贴excel至此处" />
			</div>
		</div>
		<div v-if="uploadTips" class="notice-text">
			{{ uploadTips }}
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';
import Input from '../input';
import { pop } from '../pop';
import type { FileItem } from '@erp/common';
import type { PageExpose } from '../pop/interface';
import type { ImportExcelProps } from './interface';

const props = defineProps<ImportExcelProps>();

const emit = defineEmits<{
	(event: 'close', param?: any): void;
	(event: 'ok', param?: any): void;
}>();
const uploadExcel = ref<FileItem>();

defineExpose<PageExpose>({
	getModel() {
		if (!uploadExcel.value?.url) {
			pop.error('请先上传文件');
			return false;
		}
		if (props.beforeConfirm) {
			return props.beforeConfirm(uploadExcel.value);
		}
		return uploadExcel.value as any;
	},
});
const handleDownload = () => {
	if (!props.downloadUrl) {
		pop.warning('暂无文件下载，请先配置');
		return;
	}
	window.open(props.downloadUrl);
};
</script>
