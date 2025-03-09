<template>
	<div class="color-biz">
		<div v-for="el in colors" class="color-category">
			<h3 class="category-label">{{ el.label }}</h3>
			<div v-if="el.type === 'color'" class="category-card category-card-color">
				<div v-for="c in el.children" class="category-item" :style="{ 'background-color': c.value }" @click="handleCopy(c)">
					<span class="color-label">{{ c.propertyKey }}</span>
					<span class="color-value">{{ c.value }}</span>
				</div>
			</div>
			<div v-else-if="el.type === 'border-radius'" class="category-card category-card-radius">
				<div v-for="c in el.children" class="category-item" :style="{ backgroundColor: 'rgb(var(--gray-1))' }" @click="handleCopy(c)">
					{{ c.propertyKey }}
					<div style="display: inline-flex">
						<div v-for="i in 9" :style="{ 'border-radius': c.value, backgroundColor: `var(--color-neutral-${i})` }" class="block-item" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { Message, clipboard } from '@erp/common';

type ItemType = {
	label: string;
	type: 'color' | 'border-radius';
	children?: Item[];
};

type Item = {
	key?: string;
	value?: any;
	desc?: string;
	propertyKey?: string;
	propertyValue?: string;
};

const handleCopy = (color: Item) => {
	const value = `var(${color.propertyKey})`;
	clipboard(value).then(() => {
		Message.success(`复制成功【${value}】`);
	});
};

const colors: Partial<ItemType>[] = reactive([
	{
		label: '基础色',
		type: 'color',
		children: [
			{
				key: 'color-white',
				desc: '白色',
				value: '',
			},
			{
				key: 'color-black',
				desc: '黑色',
			},
			{
				key: 'color-border',
				desc: '边框色',
			},
			{
				key: 'color-bg-popup',
				desc: '弹窗背景色',
			},
		],
	},
	{
		label: '背景色',
		type: 'color',
		children: [
			{
				key: 'color-bg-1',
				desc: '背景色1',
			},
			{
				key: 'color-bg-2',
				desc: '背景色2',
			},
			{
				key: 'color-bg-3',
				desc: '背景色3',
			},
			{
				key: 'color-bg-4',
				desc: '背景色4',
			},
			{
				key: 'color-bg-5',
				desc: '背景色5',
			},
			{
				key: 'color-bg-white',
				desc: '白色背景',
			},
		],
	},
	{
		label: '自然色',
		type: 'color',
		children: [
			{
				key: 'color-neutral-1',
			},
			{
				key: 'color-neutral-2',
			},
			{
				key: 'color-neutral-3',
			},
			{
				key: 'color-neutral-4',
			},
			{
				key: 'color-neutral-5',
			},
			{
				key: 'color-neutral-6',
			},
			{
				key: 'color-neutral-7',
			},
			{
				key: 'color-neutral-8',
			},
			{
				key: 'color-neutral-9',
			},
			{
				key: 'color-neutral-10',
			},
		],
	},
	{
		label: '文本颜色',
		type: 'color',
		children: [
			{
				key: 'color-text-1',
			},
			{
				key: 'color-text-2',
			},
			{
				key: 'color-text-3',
			},
			{
				key: 'color-text-4',
			},
		],
	},
	{
		label: '边框颜色',
		type: 'color',
		children: [
			{
				key: 'color-border-1',
			},
			{
				key: 'color-border-2',
			},
			{
				key: 'color-border-3',
			},
			{
				key: 'color-border-4',
			},
		],
	},
	{
		label: '填充颜色',
		type: 'color',
		children: [
			{
				key: 'color-fill-1',
			},
			{
				key: 'color-fill-2',
			},
			{
				key: 'color-fill-3',
			},
			{
				key: 'color-fill-4',
			},
		],
	},
	{
		label: '主题颜色',
		type: 'color',
		children: [
			{
				key: 'color-primary-light-1',
			},
			{
				key: 'color-primary-light-2',
			},
			{
				key: 'color-primary-light-3',
			},
			{
				key: 'color-primary-light-4',
			},
		],
	},
	{
		label: '连接颜色',
		type: 'color',
		children: [
			{
				key: 'color-link-light-1',
			},
			{
				key: 'color-link-light-2',
			},
			{
				key: 'color-link-light-3',
			},
			{
				key: 'color-link-light-4',
			},
		],
	},
	{
		label: '第二主题颜色',
		type: 'color',
		children: [
			{
				key: 'color-secondary',
				desc: '默认颜色',
			},
			{
				key: 'color-secondary-hover',
				desc: 'Hover 颜色',
			},
			{
				key: 'color-secondary-active',
				desc: 'Active 颜色',
			},
			{
				key: 'color-secondary-disabled',
				desc: '禁用颜色',
			},
		],
	},
	{
		label: '错误颜色',
		type: 'color',
		children: [
			{
				key: 'color-danger-light-1',
			},
			{
				key: 'color-danger-light-2',
			},
			{
				key: 'color-danger-light-3',
			},
			{
				key: 'color-danger-light-4',
			},
		],
	},
	{
		label: '成功颜色',
		type: 'color',
		children: [
			{
				key: 'color-success-light-1',
			},
			{
				key: 'color-success-light-2',
			},
			{
				key: 'color-success-light-3',
			},
			{
				key: 'color-success-light-4',
			},
		],
	},
	{
		label: '警告颜色',
		type: 'color',
		children: [
			{
				key: 'color-warning-light-1',
			},
			{
				key: 'color-warning-light-2',
			},
			{
				key: 'color-warning-light-3',
			},
			{
				key: 'color-warning-light-4',
			},
		],
	},
	{
		label: '边框角度',
		type: 'border-radius',
		children: [
			{
				key: 'border-radius-none',
			},
			{
				key: 'border-radius-small',
			},
			{
				key: 'border-radius-medium',
			},
			{
				key: 'border-radius-large',
			},
			{
				key: 'border-radius-circle',
			},
		],
	},
	{
		label: '组件颜色',
		type: 'color',
		children: [
			{
				key: 'color-tooltip-bg',
				desc: 'Tooltip 背景色',
			},
			{
				key: 'color-spin-layer-bg',
				desc: '加减器背景色',
			},
			{
				key: 'color-mask-bg',
				desc: '模糊层背景色',
			},
		],
	},
]);

onMounted(() => {
	const style = getComputedStyle(document.body);
	colors.forEach(category => {
		category.children.forEach(c => {
			const propertyKey = `--${c.key}`;
			const propertyValue = style.getPropertyValue(propertyKey);
			c.value = propertyValue;
			c.propertyKey = propertyKey;
		});
	});
});
</script>

<style lang="scss" scoped>
.category-label {
	text-align: center;
	margin: 6px;
}

.category-card-color {
}

.category-item {
	height: 46px;
	display: inline-flex;
	align-items: center;
	width: 100%;
	justify-content: space-between;
	transition: all linear 200ms;
	cursor: pointer;
	padding: 6px 12px;
	border-top: 1px solid var(--color-border-1);
	border-right: 1px solid var(--color-border-1);
	border-left: 1px solid var(--color-border-1);

	&:first-child {
		border-top-left-radius: var(--border-radius-medium);
		border-top-right-radius: var(--border-radius-medium);
	}

	&:last-child {
		border-bottom-left-radius: var(--border-radius-medium);
		border-bottom-right-radius: var(--border-radius-medium);
		border-bottom: 1px solid var(--color-border-1);
	}

	&:hover {
		transform: scale(1.05);

		.color-value {
			opacity: 1;
		}
	}
}

.color-label {
	// -webkit-text-stroke: 0.5px #fff;
	// font-size: 20px;
}

.category-card {
	// box-shadow: 0 0 1px rgba(0, 0, 0, 0.3);
	border-radius: var(--border-radius-medium);
}

.category-card-radius {
	.category-item {
		display: inline-flex;
		align-items: center;
		width: 100%;
		padding: 10px;
		margin: 3px 0;
		height: 60px;

		.block-item {
			background-color: var(--color-border);
			height: 40px;
			width: 40px;
			margin: 0 6px;
		}
	}
}
</style>
