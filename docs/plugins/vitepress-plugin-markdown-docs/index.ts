import { createPlugin } from './markdown-parse';
import type { Plugin } from 'vite';

export default function inlineSFCPlugin(): Plugin {
	const { virtualSFCModuleMap, fileIncludes, parseFile } = createPlugin();

	return {
		name: 'vitepres-inline-sfc',
		enforce: 'pre',
		resolveId(id: string) {
			// console.log('resolveId >> ', id);
			if (virtualSFCModuleMap.has(id)) {
				return id;
			}
		},
		load(id: string) {
			// console.log('load >> ', id);
			if (virtualSFCModuleMap.has(id)) {
				return {
					code: virtualSFCModuleMap.get(id) as string,
				};
			}
		},
		transform(source: string, id: string) {
			// console.log('transform >> ', id);
			if (!/\.md$/.test(id)) {
				return;
			}

			return parseFile(source, id);
		},

		async handleHotUpdate(ctx) {
			const id = ctx.file;
			if (!/\.md$/.test(id)) {
				return;
			}
			const { file, read, timestamp, server, modules } = ctx;
			console.log('handleHotUpdate >>>', id);
			if (fileIncludes.has(id)) {
				const content = await read();
				parseFile(content, id);
			} else {
				for (const fileMap of fileIncludes) {
					if (fileMap[1].includes(id)) {
						ctx.modules.push(server.moduleGraph.getModuleById(fileMap[0])!);
						break;
					}
				}
			}
		},
	};
}
