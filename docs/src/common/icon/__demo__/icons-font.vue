<template>
	<p>
		字体地址： <a :href="url" target="_blank">{{ url }}</a>
	</p>
	<div class="icon-demo-2">
		<fk-tooltip v-for="icon in icons" :key="icon" :content="icon">
			<div class="icon" @click="handleCopy(icon)">
				<i class="erpfont" :class="icon" />
				<span class="icon-name">{{ icon.replace('icon-', '') }}</span>
			</div>
		</fk-tooltip>
	</div>
	<p>总共 {{ icons.length }} 个</p>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { loadCss } from '@erp/biz';
import { Message, clipboard } from '@erp/common';

const icons = reactive([]);

const url = '//static.erp.91spyc.com/assets/css/icon.min.css';

loadCss(`${url}?_=${Date.now()}`).then(res => {
	console.log('业务字体文件加载完成...');
});

function formatIconfont(text) {
	const regex = /\.([^:]+):before/g;
	let matcher;
	while ((matcher = regex.exec(text))) {
		console.log(matcher[1]);
		icons.push(matcher[1]);
	}
}

onMounted(() => {
	fetch(url)
		.then(res => res.text())
		.then(res => {
			formatIconfont(res);
		});
});

const handleCopy = (name: string) => {
	const value = `<i class="erpfont ${name}" />`;
	clipboard(value).then(() => {
		Message.success(`复制成功【${value}】`);
	});
};
</script>

<style lang="scss" scoped>
.icon-demo-2 {
	display: grid;
	grid-template-columns: repeat(auto-fill, 60px);
	gap: 8px;
	place-items: center;

	.icon {
		border: 1px solid var(--color-border-1);
		border-radius: var(--border-radius-large);
		background-color: var(--color-fill-1);
		width: 60px;
		height: 60px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: 24px;
		cursor: pointer;
		transition: all 200ms linear;
		color: var(--color-text-1);
		position: relative;

		&:hover {
			// font-size: 30px;
			transform: scale(1.1);
			background-color: var(--color-fill-3);

			.icon-name {
				// color: var(--color-text-2);
			}
		}

		.erpfont {
			font-size: 1em;
		}

		.icon-name {
			position: absolute;
			font-size: 11px;
			display: inline-block;
			width: 100%;
			overflow: hidden;
			line-height: 1;
			margin-top: 6px;
			text-align: center;
			color: transparent;
			bottom: 6px;
		}
	}
}
</style>
