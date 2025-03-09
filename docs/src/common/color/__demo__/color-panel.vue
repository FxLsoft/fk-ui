<template>
	<div class="color-panel">
		<div v-for="card in colors" class="color-card">
			<h3 class="color-card-label">{{ card.label }}</h3>
			<div class="color-list">
				<div class="color-item" v-for="c in card.colors" :style="{ 'background-color': c.bgColor, color: c.textColor }" @click="handleCopy(c)">
					<span class="color-label">{{ c.colorKey }}</span>
					<span class="color-value">{{ c.color }}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { clipboard, Message } from '@erp/common';
type ColorItemType = {
	colorKey: string;
	color: string;
	bgColor: string;
	textColor: string;
};
const colors: {
	key: string;
	label: string;
	colors?: ColorItemType[];
}[] = reactive([
	{
		key: 'fkblue',
		label: 'Blue / 品牌蓝',
	},
	{
		key: 'gray',
		label: 'Gray / 高级灰',
	},
	{
		key: 'red',
		label: 'Red / 浪漫红',
	},
	{
		key: 'orangered',
		label: 'Orange Red / 晚秋红',
	},
	{
		key: 'orange',
		label: 'Orange / 活力橙',
	},
	{
		key: 'gold',
		label: 'Gold / 黄昏',
	},
	{
		key: 'yellow',
		label: 'Yellow / 柠檬黄',
	},
	{
		key: 'lime',
		label: 'Lime / 新生绿',
	},
	{
		key: 'green',
		label: 'Green / 仙野绿',
	},
	{
		key: 'cyan',
		label: 'Cyan / 碧涛青',
	},
	{
		key: 'blue',
		label: 'Blue / 海蔚蓝',
	},
	{
		key: 'purple',
		label: 'Purple / 暗夜紫',
	},
	{
		key: 'pinkpurple',
		label: 'Pink Purple / 青春紫',
	},
	{
		key: 'magenta',
		label: 'Magenta / 品红',
	},
]);

const handleCopy = (color: ColorItemType) => {
	const value = `rgb(var(${color.colorKey}))`;
	clipboard(value).then(() => {
		Message.success(`复制成功【${value}】`);
	});
};

onMounted(() => {
	const style = getComputedStyle(document.body);
	colors.forEach(color => {
		color.colors = [];
		for (let i = 1; i <= 10; i++) {
			const colorKey = `--${color.key}-${i}`;
			const colorValue = style.getPropertyValue(colorKey);
			color.colors.push({
				colorKey: colorKey,
				color: colorValue,
				bgColor: `rgb(${colorValue})`,
				textColor: i >= 7 ? '#fff' : '#000',
			});
		}
	});
});
</script>

<style lang="scss" scoped>
.color-panel {
	width: 100%;
	display: inline-flex;
	flex-wrap: wrap;
}

.color-card {
	width: 50%;
	padding: 16px;
}

.color-list {
}

.color-card-label {
	text-align: center;
	margin: 12px;
}

.color-item {
	height: 46px;
	display: inline-flex;
	align-items: center;
	width: 100%;
	justify-content: space-between;
	transition: all linear 200ms;
	cursor: pointer;
	padding: 6px 12px;

	&:first-child {
		border-top-left-radius: var(--border-radius-medium);
		border-top-right-radius: var(--border-radius-medium);
	}

	&:last-child {
		border-bottom-left-radius: var(--border-radius-medium);
		border-bottom-right-radius: var(--border-radius-medium);
	}

	&:hover {
		transform: scale(1.05);

		.color-value {
			opacity: 1;
		}
	}
}

.color-value {
	opacity: 0.3;
	transition: all linear 200ms;
}
</style>
