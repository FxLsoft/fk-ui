<template>
	<div :ref="rootRef" data-component="paragraph">
		<component :is="slotRender()" />
	</div>
</template>
<script lang="ts" setup>
// 创建视图 Vue 段落组件
import { inject } from 'vue';
import { createVNode } from '@textbus/core';
import { AdapterInjectToken } from '../tokens';
import type { ViewComponentProps } from '../vue-adapter';
import type { ParagraphComponent } from './paragraph.component';

const props = defineProps<ViewComponentProps<ParagraphComponent>>();
const adapter = inject(AdapterInjectToken)!;

function slotRender() {
	const slot = props.component.state.slot;
	return adapter.slotRender(slot, children => {
		return createVNode('p', null, children);
	});
}
</script>
