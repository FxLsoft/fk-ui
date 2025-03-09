# 富文本输入

```vue { "component": true }
<template>
	<h2>编辑状态</h2>
	<RichTextInput v-model="model.single" />
	<fk-row>
		<JsonViewer :data="model" />
	</fk-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { RichTextInput } from '@erp/biz';

const model = ref({
	single: `<div dir="auto" data-component="RootComponent" class="xnote-root"><div data-placeholder="" class="xnote-content"><div data-component="ParagraphComponent" class="xnote-paragraph"><div><br /></div></div></div></div>`,
	multiple: [],
});
</script>
```
