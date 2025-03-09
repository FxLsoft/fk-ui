import fs from 'fs';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import external from '../plugins/vite-plugin-external';
import vueExportHelper from '../plugins/vite-plugin-vue-export-helper';
import type { InlineConfig } from 'vite';

const root = process.cwd();

export default (tag?: string): InlineConfig => {
	let dependencies: string[] = [];
	const packageJsonPath = path.join(root, 'package.json');
	if (fs.existsSync(packageJsonPath)) {
		try {
			console.log('packageJsonPath >>', packageJsonPath);
			const packageStr = fs.readFileSync(packageJsonPath, 'utf-8');
			const pkg = JSON.parse(packageStr);
			dependencies = Object.keys(pkg.dependencies).concat(Object.keys(pkg.devDependencies));
		} catch (error) {
			console.error(error);
		}
	}
	console.log('dependencies >>', dependencies);
	return {
		resolve: {
			dedupe: dependencies,
		},
		build: {
			minify: 'terser',
			emptyOutDir: true,
			target: 'modules',
			sourcemap: true,
			cssCodeSplit: false,
			lib: {
				entry: 'index.ts',
				name: tag || 'lib',
				formats: ['es'],
			},
			rollupOptions: {
				output: {
					minifyInternalExports: true,
					esModule: true,
				},
				external: dependencies.map(v => new RegExp(`^${v}`)),
			},
		},
		plugins: [external(), vue(), vueJsx(), vueExportHelper()],
	};
};
