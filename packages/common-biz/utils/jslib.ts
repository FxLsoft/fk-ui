// 第三方管理库

import { loadCss, loadScript } from './common';
import { AssetsServer } from './constants';

/**
 * 初始化video插件
 * https://muiplayer.js.org/zh/guide/api.html
 */
export function initVideoPlugin() {
	const libs = [
		{
			src: `${AssetsServer}/js/mui-player.min.js`,
			type: 'script',
		},
		{
			src: `${AssetsServer}/js/mui-player-desktop-plugin.min.js`,
			type: 'script',
		},
		{
			src: `${AssetsServer}/css/mui-player.min.css`,
			type: 'css',
		},
	];
	const loadResources = [];
	libs.forEach(el => {
		if (el.type === 'script') {
			loadResources.push(loadScript(el.src));
		} else if (el.type === 'css') {
			loadResources.push(loadCss(el.src));
		}
	});
	return Promise.all(loadResources);
}
