<template>
	<Dropdown
		v-model:popup-visible="visible"
		dropdown-class="contextmenu"
		trigger="click"
		:popup-container="popupContainer"
		position="bl"
		@popup-visible-change="handleVisibleChange"
		@select="handleSelect"
	>
		<div class="anchor" :style="style" />
		<template #content>
			<Dropdown.Option v-for="el in menus" :key="el.value" :value="el" class="dropdown-item">
				{{ el.label }}
				<template v-if="el.icon" #icon>
					<i v-if="isString(el.icon)" :class="el.icon" />
					<component :is="el.icon" v-else />
				</template>
			</Dropdown.Option>
		</template>
	</Dropdown>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { Dropdown, isString } from '@erp/common';
import type { Component } from 'vue';

const props = defineProps<{
	popupContainer?: string | HTMLElement;
	pageX?: number;
	pageY?: number;
	menus: {
		label: string;
		value: string;
		icon?: string | Component;
	}[];
	onClose: Function;
	onOk: Function;
}>();

const visible = ref(false);

const style = computed(() => {
	if (props.pageX && props.pageY) {
		return {
			left: `${props.pageX}px`,
			top: `${props.pageY}px`,
		};
	} else {
		return {};
	}
});

const handleVisibleChange = (visible: boolean) => {
	if (!visible) {
		props.onClose && props.onClose();
	}
};

const handleSelect = (value: any) => {
	props.onOk && props.onOk(value);
};

onMounted(() => {
	visible.value = true;
});
</script>

<style lang="less" scoped>
.anchor {
	position: fixed;
	width: 0px;
	height: 0px;
	user-select: none;
	pointer-events: none;
}
.dropdown-item {
	width: 120px;
	line-height: 32px;
}
</style>
<style lang="less">
.contextmenu {
	.fk-dropdown-list-wrapper {
		max-height: 260px;
	}
}
</style>
