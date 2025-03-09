<template>
	<div ref="rootRef" class="vue-quill-editor">
		<QuillEditor ref="editorRef" v-model:content="contentHtml" :options="options" content-type="html" @update:content="handlerContentChange" />
	</div>
</template>

<script setup lang="ts">
import { computed, useTemplateRef } from 'vue';
import { Quill, QuillEditor } from '@vueup/vue-quill';
import ImageDropAndPaste from 'quill-image-drop-and-paste';

import { openSelectFile, uploadBase64 } from '../rich-text/utils';
import type { FileItem } from '@erp/common';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

Quill.register('modules/imageDropAndPaste', ImageDropAndPaste);

const editorRef = useTemplateRef<InstanceType<typeof QuillEditor>>('editorRef');
const rootRef = useTemplateRef<HTMLElement>('rootRef');
const props = defineProps({
	modelValue: {
		type: String,
		default: '',
	},
	toolbar: {
		type: Array,
		default: () => {
			return [
				['bold', 'italic', 'underline', 'strike'], // toggled buttons
				['blockquote', 'code-block'],
				[{ header: 1 }, { header: 2 }], // custom button values
				[{ list: 'ordered' }, { list: 'bullet' }],
				[{ script: 'sub' }, { script: 'super' }], // superscript/subscript
				[{ indent: '-1' }, { indent: '+1' }], // outdent/indent
				[{ direction: 'rtl' }], // text direction
				[{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
				[{ header: [1, 2, 3, 4, 5, 6, false] }],
				[{ color: [] }, { background: [] }], // dropdown with defaults from theme
				[{ font: [] }],
				[{ align: [] }],
				['clean'],
				['image'],
			];
		},
	},
	theme: {
		type: String,
		default: 'snow',
	},
	disabled: {
		type: Boolean,
		default: false,
	},
	placeholder: {
		type: String,
		default: '',
	},
	accept: {
		type: String,
		default: 'image/jpeg, image/jpg, image/png',
	},
	multiple: {
		type: Boolean,
		default: true,
	},
	contentType: {
		type: String,
		default: 'html',
	},
});
const emits = defineEmits(['update:modelValue', 'change']);
const options = computed(() => {
	return {
		debug: 'error',
		modules: {
			toolbar: {
				container: props.toolbar,
				handlers: {
					image(value) {
						if (props.disabled) return;
						if (value) {
							openSelectFile({
								accept: props.accept,
								multiple: props.multiple,
								change: (file: FileItem) => {
									if (file.status === 'done') {
										const quill = editorRef.value.getQuill();
										const length = quill.getSelection()?.index || quill.getLength();
										quill.insertEmbed(length, 'image', file.url);
										quill.setSelection(length + 1, 1);
									}
								},
							});
						} else {
							editorRef.value?.getQuill()?.format('image', false);
						}
					},
				},
			},
			imageDropAndPaste: {
				handler: (dataUrl, type, imageData) => {
					if (!type.match(/^image\/(gif|jpe?g|a?png|bmp)/i)) {
						return;
					}
					// 上传服务器后返回URL
					uploadBase64(dataUrl, (url: string) => {
						const quill = editorRef.value.getQuill();
						const length = quill.getSelection()?.index || quill.getLength();
						quill.insertEmbed(length, 'image', url);
						quill.setSelection(length + 1, 1);
					});
				},
			},
		},
		placeholder: props.placeholder,
		readOnly: props.disabled,
		theme: props.theme,
		contentType: 'html',
		scrollingContainer: '.ql-container',
	};
});
const contentHtml = computed({
	get() {
		return props.modelValue;
	},
	set(newVal) {
		emits('update:modelValue', newVal);
	},
});
const handlerContentChange = () => {
	emits('change', editorRef.value.getHTML());
};

const clearContent = () => {
	const quill = editorRef.value.getQuill();
	quill.setText('');
};
defineExpose({
	editorRef,
	clearContent,
});
</script>
