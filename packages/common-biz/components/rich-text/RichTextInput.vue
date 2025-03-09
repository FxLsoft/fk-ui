<template>
	<div ref="rootRef" class="rich-text-input" :class="clazz" />
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watchEffect } from 'vue';
import { throttleByRaf } from '@erp/common';
import { UPDATE_MODEL } from '../../utils/constants';
import type { SelectFileProps } from './utils';
import type { Editor } from '@textbus/xnote';

const props = defineProps<{
	modelValue: string;
	disabled?: boolean;
	fileUpload?: SelectFileProps;
}>();
const emit = defineEmits([UPDATE_MODEL]);

const rootRef = ref<HTMLElement>();
const loading = ref(false);

const clazz = computed(() => {
	return {
		disabled: props.disabled,
	};
});
let editor: Editor;

const initEditor = () => {
	import('./editor')
		.then(({ createEditor }) => {
			return createEditor(rootRef.value, { content: props.modelValue || '', fileUpload: props.fileUpload });
		})
		.then(ed => {
			console.log('editor >>', ed);
			editor = ed;
			const onEditorChange = throttleByRaf(async () => {
				// const images = rootRef.value.querySelectorAll<HTMLImageElement>('img');
				// const uploadImages: HTMLImageElement[] = [];
				// for (let i = 0; i < images.length; i++) {
				// 	const image = images[i];
				// 	if (image.src.startsWith('data:')) {
				// 		uploadImages.push(image);
				// 	}
				// }
				// if (uploadImages.length) {
				// 	const loading = pop.loading('正在上传图片...');
				// 	for (const image of uploadImages) {
				// 		try {
				// 			image.src = await uploadBase64(image.src);
				// 		} catch {
				// 			image.src = '';
				// 		}
				// 	}
				// 	loading.close();
				// }
				emit(UPDATE_MODEL, editor.getHTML());
			});
			editor.onChange.subscribe(() => {
				onEditorChange();
			});
		})
		.finally(() => {
			loading.value = true;
		});
};

const destroyEditor = () => {
	editor?.destroy();
	editor = null;
};

const startEditor = () => {
	watchEffect(() => {
		if (props.disabled) {
			destroyEditor();
			rootRef.value.innerHTML = props.modelValue || '';
			rootRef.value.querySelectorAll('video').forEach(el => {
				el.setAttribute('controls', 'controls');
			});
		} else {
			initEditor();
		}
	});
};

onMounted(() => {
	startEditor();
});

onBeforeUnmount(() => {
	destroyEditor();
});
</script>

<style lang="less">
.rich-text-input {
	border: 1px solid var(--color-neutral-3);
	border-radius: var(--border-radius-small);
	--max-height: 600px;
	.toolbar {
		z-index: 999 !important;
	}
	.dropdown-menu {
		z-index: 999 !important;
	}
	.left-toolbar-btn {
		padding: 0 6px;
	}
	table {
		display: table;
		margin: initial;
		td {
			padding: initial;
			font-size: 1em;
		}
		tr {
			background-color: initial;
			border-top: initial;
			transition: initial;
		}
	}
	.action-bar table td {
		width: 13px;
	}
	.xnote-step-item.xnote-current .xnote-step-item-icon {
		background-color: #165dff;
	}
	.xnote-step-item.xnote-complete .xnote-step-item-icon {
		background-color: #165dff;
	}
	.xnote-step-item.xnote-complete .xnote-step-item-line {
		border-top-color: #165dff;
	}
	.xnote-todolist-icon {
		color: #165dff;
	}
	.xnote-highlight-box {
		background: #fff3e8;
		border: 1px solid #fcc59f;
	}
	.xnote-content {
		max-height: var(--max-height);
		overflow: auto;
		padding: 12px;
	}
}
</style>
