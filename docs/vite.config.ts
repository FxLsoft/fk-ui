import { defineConfig } from 'vite';
import vueJsx from '@vitejs/plugin-vue-jsx';
import markdownDocs from './plugins/vitepress-plugin-markdown-docs';

export default defineConfig({
	plugins: [vueJsx(), markdownDocs()],
	resolve: {
		dedupe: ['vue', '@erp/common', '@erp/biz'],
		extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json'],
	},
	server: {
		host: '0.0.0.0',
		port: 3000,
		//配置代理
		proxy: {
			'^/api/': {
				target: 'https://test.fukerp.com/api', //test环境
				secure: false,
				changeOrigin: true,
				rewrite: path => path.replace(/^\/api/, ''),
			},
		},
	},
	build: {
		emptyOutDir: false,
	},
});
