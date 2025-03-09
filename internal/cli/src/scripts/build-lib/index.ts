import path from 'path';
import fs from 'fs-extra';
import { build } from 'vite';
import getLibConfig from '../../configs/vite.prod.lib';

async function run(tag) {
	await fs.emptyDir(path.resolve(process.cwd(), 'dist'));
	await build(getLibConfig(tag));
}

export default run;
