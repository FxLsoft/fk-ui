# 右键菜单

```vue { "component": true }
<template>
	<fk-space>
		<div class="contextmenu-wrap" @contextmenu="handleContextmenu">右键点击区域</div>
        <!-- <div class="hover-wrap" @mouseenter="handleMouseEnter">Hover区域</div> -->
	</fk-space>
	<p>数据模型</p>
	<fk-row>
		<JsonViewer :data="selected" />
	</fk-row>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { pop } from '@erp/biz';
import { IconClose, IconCloseCircle, IconPushpin, IconRefresh, IconSync, IconToLeft, IconToRight } from '@erp/common';
import ContextMenu from '/biz/contextmenu/contextmenu.vue';

const selected = reactive({
	contextmenu: '',
    hovermenu: '',
});

const menus = [
	{
		label: '固定标签',
		value: 'collect',
		icon: IconPushpin,
	},
	{
		label: '取消固定',
		value: 'cancel-collect',
		icon: IconPushpin,
	},
	{
		label: '刷新页面',
		value: 'refresh',
		icon: IconRefresh,
	},
	{
		label: '刷新应用',
		value: 'reset',
		icon: IconSync,
	},
	{
		label: '关闭标签',
		value: 'close',
		icon: IconCloseCircle,
	},
	{
		label: '关闭右侧',
		value: 'close-right',
		icon: IconToRight,
	},
	{
		label: '关闭左侧',
		value: 'close-left',
		icon: IconToLeft,
	},
	{
		label: '关闭其他',
		value: 'close-other',
		icon: IconClose,
	},
];

const handleContextmenu = (evt: MouseEvent) => {
	evt.stopPropagation();
	evt.preventDefault();
	const { clientX, clientY } = evt;

	pop.createPage(ContextMenu, {
		popupContainer: document.body,
		pageX: clientX,
		pageY: clientY,
		menus,
	}).then((item: any) => {
		pop.info(`【${item.label}】菜单点击了`);
		item.command && item.command();
		selected.contextmenu = item.label;
	});
};

const handleMouseEnter = (evt: MouseEvent) => {
	evt.stopPropagation();
	evt.preventDefault();
	const { clientX, clientY } = evt;
    const id = '123';
	pop.createPage(ContextMenu, {
        id,
		popupContainer: document.body,
		pageX: clientX,
		pageY: clientY,
		menus,
	}).then((item: any) => {
		pop.info(`【${item.label}】菜单点击了`);
		item.command && item.command();
		selected.hovermenu = item.label;
	});
};
</script>
<style lang="less">
.contextmenu-wrap {
	width: 300px;
	height: 300px;
	background: #f5f6f7;
	display: flex;
	justify-content: center;
	align-items: center;
}

.hover-wrap {
    width: 300px;
	height: 300px;
	background: #f5f6f7;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
```
