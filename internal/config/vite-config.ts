import path from 'path';
import { loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
// import legacy from '@vitejs/plugin-legacy';
// import { generateSW, injectManifest } from 'rollup-plugin-workbox';
import consola from 'consola';
import GenerateVersion from './vite-plugin-version';
import type { PluginOption, UserConfig } from 'vite';

const rootDir = process.cwd();

// function getRootDir(dir) {
// 	consola.log('dir', dir);
// 	const state = fs.statSync(dir);
// 	if (state.isFile()) {
// 		return getRootDir(path.join(dir, '../'));
// 	}
// 	const src = fs.readdirSync(dir).find(v => {
// 		// 根目录标识
// 		return v.endsWith('src') && fs.statSync(path.join(dir, v)).isDirectory();
// 	});
// 	if (src) {
// 		return dir;
// 	} else {
// 		return getRootDir(path.join(dir, '../'));
// 	}
// }

consola.log('rootDir', rootDir);

interface ProxyServer {
	path: string; // 需要代理的地址
	target: string; // 代理的目标服务
	rewrite?: boolean; // 是否重写目标地址
	ws?: boolean; // 是否是websocket服务
}

export function viteConfig(command, mode, proxyServer: Array<ProxyServer> = []) {
	const env = loadEnv(mode, path.join(rootDir, 'config')) || {};
	const version = Date.now();
	let activeMode = process.env.activeMode;
	if (!activeMode) {
		activeMode = 'local模式';
	}
	env.command = command;
	env.mode = mode;
	// 处理全局变量
	const defines = {
		__VERSION__: version,
		__ActiveMode__: JSON.stringify(activeMode),
	};
	Object.keys(env).forEach(key => {
		const envKey = `__${key.toLocaleUpperCase()}__`;
		const envValue = JSON.stringify(env[key]);
		defines[envKey] = envValue;
	});
	Object.keys(defines).forEach(key => {
		consola.log(`全局变量：[${key}] => [${defines[key]}]`);
	});
	// 处理开发代理服务转发
	const proxyServers = {};
	proxyServer.forEach(server => {
		proxyServers[server.path] = {
			target: server.target,
			changeOrigin: true,
			ws: server.ws,
			rewrite: url => {
				const regex = new RegExp(`^${server.path}/`);
				const target = url.replace(regex, '');
				consola.log(`Proxy [${new Date()}]`, target);
				return server.rewrite ? target : url;
			},
		};
	});
	const plugins: PluginOption[] = [vue({})];
	if (mode === 'production') {
		// plugins.push(
		// 	legacy({
		// 		targets: ['ie >= 11'],
		// 		additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
		// 	})
		// );
		// plugins.push(
		// 	generateSW({
		// 		swDest: `${env.VITE_OUT_DIR}sw.js`,
		// 		globDirectory: env.VITE_OUT_DIR,
		// 		sourcemap: false,
		// 		globIgnores: ['**/node_modules/**/*'],
		// 		globPatterns: ['**/*.{js,css,json,svg,png,html}'],
		// 	})
		// );
		plugins.push(GenerateVersion({ version }));
	}
	return {
		base: './',
		plugins,
		build: {
			outDir: env.VITE_OUT_DIR,
			emptyOutDir: false,
			assetsDir: './assets/',
			minify: 'terser',
			sourcemap: false,
			target: 'es2015',
			cssTarget: 'chrome80',
			rollupOptions: {
				output: {
					manualChunks: {
						'erp-biz': ['@erp/biz'],
						common: ['@erp/common'],
					},
				},
				plugins: [],
			},
		},
		resolve: {
			alias: {
				'@': path.join(rootDir, 'src'),
			},
		},
		server: {
			port: 3000,
			host: '0.0.0.0',
			https: true,
			proxy: proxyServers,
		},
		// 全局变量
		define: defines,
	} as UserConfig;
}
