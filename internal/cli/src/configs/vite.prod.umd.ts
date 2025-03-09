import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import type { InlineConfig } from 'vite';

export default (type: 'component' | 'icon'): InlineConfig => {
	const entry = type === 'component' ? 'components/fk-components.ts' : 'components/icon/fk-vue-icon.ts';
	const entryFileName = type === 'component' ? 'fk-components' : 'fk-icon';
	const name = type === 'component' ? 'FkComponent' : 'FkIcon';

	return {
		mode: 'production',
		build: {
			target: 'modules',
			outDir: 'dist',
			emptyOutDir: false,
			sourcemap: true,
			minify: 'terser',
			rollupOptions: {
				external: 'vue',
				output: [
					{
						name,
						format: 'umd',
						entryFileNames: `${entryFileName}.js`,
						globals: {
							vue: 'Vue',
						},
					},
				],
			},
			// 开启lib模式
			lib: {
				entry,
				formats: ['umd'],
				name,
			},
		},
		// @ts-ignore vite内部类型错误
		plugins: [vue(), vueJsx()],
	};
};
