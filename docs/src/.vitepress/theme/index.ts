// https://vitepress.dev/guide/custom-theme
import { h } from 'vue';
import DefaultTheme from 'vitepress/theme';
import './style.css';
import './page.css';
import VueJsonPretty from 'vue-json-pretty';
import * as FkCommon from '@erp/common';
import { getToken, getUrlParam, loadCss, setToken } from '@erp/biz';
import type { Theme } from 'vitepress';

import 'vue-json-pretty/lib/styles.css';

export default {
	extends: DefaultTheme,
	Layout: () => {
		return h(DefaultTheme.Layout, null, {
			// https://vitepress.dev/guide/extending-default-theme#layout-slots
		});
	},
	async enhanceApp({ app, router, siteData }) {
		const FkComponents = FkCommon.FkComponents;
		const FkIcon = FkCommon.FkIcon;
		app.use(FkComponents as any);
		app.use(FkIcon as any);
		app.component('JsonViewer', VueJsonPretty);
		if (typeof window !== 'undefined') {
			let token = getToken();
			if (!token) {
				token =
					getUrlParam('token') ||
					'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xL2FwaS9jYXRlZ29yeS9pbmRleCIsImlhdCI6MTcyODQ1MTkzOCwiZXhwIjoxNzI4NzE2NDI5LCJuYmYiOjE3Mjg2MzAwMjksImp0aSI6IkxHZXlUcUprTER1M3NTSkEiLCJzdWIiOiIxIiwicHJ2IjoiYmI4NDc5NmUzYmQyZjY4Yzk4MzU4MjFjZjNlYWUyZDI4Mzk4YjRlNCJ9.3WxK8CUpAf7_VZ4_X8ympRHrr7TTifXsUp_e5NN3r-U';
				setToken(token);
			}
			await import('../../core/http');

			loadCss('//static.erp.91spyc.com/assets/css/icon.min.css');
		}
	},
} satisfies Theme;
