import consola from 'consola';
import type { Plugin } from 'vite';

interface Options {
	fileName?: string;
	version?: string | number;
}

function generateVersion(options: Options): Plugin {
	const { fileName = 'version', version = Date.now() } = options;
	consola.log('生成版本号为：', version);
	return {
		name: 'GenerateVersion',
		generateBundle() {
			const ctx = this;
			try {
				ctx.emitFile({
					type: 'asset',
					fileName,
					source: JSON.stringify(version),
				});
			} catch (error) {
				consola.error(error);
			}
		},
	};
}

export { generateVersion as default };
