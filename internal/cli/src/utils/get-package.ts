import path from 'path';
import fs from 'fs-extra';

let cache: Record<string, any>;

export const getPackage = async () => {
	if (!cache) {
		const content = await fs.readFile(path.resolve(process.cwd(), 'package.json'), 'utf8');
		try {
			cache = JSON.parse(content);
		} catch {}
	}

	return cache ?? {};
};
