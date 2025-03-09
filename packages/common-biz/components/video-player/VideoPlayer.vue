<template>
	<div ref="rootRef" class="video-player" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { downloadFileByUrl } from '../../http';
import { initVideoPlugin } from '../../utils';
import type { VideoPlayerProps } from './interface';

const props = withDefaults(defineProps<VideoPlayerProps>(), { autoplay: true });

const emit = defineEmits(['close', 'resetPosition']);

const loading = ref(true);
const rootRef = ref<HTMLElement>();

const init = () => {
	const playerConfig = {
		container: rootRef.value,
		title: props.title || '视频',
		src: props.src,
		poster: props.poster,
		themeColor: '#165dff',
		width: props.width,
		height: props.height,
		autoplay: props.autoplay ?? true,
		videoAttribute: [
			{ attrKey: 'webkit-playsinline', attrValue: '' },
			{ attrKey: 'playsinline', attrValue: '' },
			{ attrKey: 'x5-playsinline', attrValue: '' },
			{ attrKey: 't7-video-player-type', attrValue: 'inline' },
			{ attrKey: 'x5-video-player-type', attrValue: 'h5-page' },
			{ attrKey: 'x-webkit-airplay', attrValue: 'allow' },
			{ attrKey: 'controlslist', attrValue: 'download' },
		],
		// custom: {
		// 	footerControls: [
		// 		{
		// 			slot: 'nextMedia', // 对应定义的 slot 值
		// 			position: 'left', // 显示的位置，可选 left、right
		// 			tooltip: '下一集', // 鼠标悬浮在控件上显示的文字提示
		// 			oftenShow: false, // 是否常显示。默认为false，在 mobile 环境下竖屏状态下隐藏，pc环境判下视频容器小于500px时隐藏
		// 			click(e) {
		// 				// 按钮点击事件回调
		// 				console.log('next media button click...');
		// 			},
		// 			style: {}, // 自定义添加控件样式
		// 		},
		// 	],
		// },
		plugins: [
			typeof (window as any).MuiPlayerDesktopPlugin == 'function'
				? new (window as any).MuiPlayerDesktopPlugin({
						contextmenu: [
							{
								name: 'download',
								context: '下载视频',
								zIndex: 0,
								show: true,
								click(close) {
									downloadFileByUrl(props.src);
									close();
								},
							},
						],
				  })
				: {},
		],
	};
	const mp = new (window as any).MuiPlayer(playerConfig);
	mp.on('back', () => {
		emit('close');
	});
	mp.on('ready', () => {
		const rightPart = rootRef.value.querySelector('#right-part');
		const button = document.createElement('button');
		button.classList.add('player-btn', 'keyboard-input', 'footer-control');
		button.setAttribute('tooltip', '下载');
		button.innerHTML = '<i class="erpfont icon-download" />';
		rightPart.insertBefore(button, rightPart.firstChild);
		button.addEventListener('click', () => {
			downloadFileByUrl(props.src);
		});
	});
	// 网页全屏改变的触发
	mp.on('pagefull-change', data => {
		console.log('pagefull-change >>', data.pagefull);
		emit('resetPosition');
	});
	loading.value = false;
};
if (!import.meta.env.SSR) {
	onMounted(async () => {
		await initVideoPlugin();
		init();
	});
}
</script>

<style lang="less">
.video-player {
	margin: auto;
	max-width: 80vw !important;
	max-height: 80vh !important;
	min-width: 600px;
	min-height: 260px;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
	svg {
		display: inline-block;
	}
	.icon-download {
		font-size: 20px;
		color: var(--color-bg-1);
	}
	.player-wrapper {
		overflow: hidden;
	}
	.mplayer-poster {
		img {
			object-fit: contain !important;
		}
	}
}

.video-player-pop {
	background-color: transparent;
	box-shadow: none;
	.fk-modal-header {
		border-bottom: none;
		justify-content: center;
	}
	.fk-icon-hover {
		color: var(--color-bg-1);
		padding: 6px;
		background-color: var(--color-black);
		border-radius: 50%;
		width: 28px;
		height: 28px;
		opacity: 0.5;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		&:hover {
			color: var(--color-bg-1);
			opacity: 1;
		}
		&::before {
			display: none;
		}
	}
	.video-wrapper video {
		height: 100%;
		max-height: 80vh !important;
		min-width: 500px;
		min-height: 500px;
	}
	.fk-modal-body {
		overflow: hidden;
	}
}
</style>
