import path from 'path';
import fs from 'fs-extra';
import { build } from 'vite';
import config from '../../configs/vite.prod';
import getUmdConfig from '../../configs/vite.prod.umd';
import getLibConfig from '../../configs/vite.prod.lib';

async function run({ umd = false }) {
	await fs.emptyDir(path.resolve(process.cwd(), 'es'));
	await fs.emptyDir(path.resolve(process.cwd(), 'lib'));
	console.log(' >>>>>>>>>>>>>>>>> config', process.cwd());
	await build(config);
	console.log(' >>>>>>>>>>>>>>>>> copy');
	await fs.copy(path.resolve(process.cwd(), 'components/icon/@types/icon'), path.resolve(process.cwd(), 'es/icon'), {
		overwrite: true,
	});
	await fs.emptyDir(path.resolve(process.cwd(), 'dist'));
	if (umd) {
		// console.log(' >>>>>>>>>>>>>>>>> umd')
		// console.log(' >>>>>>>>>>>>>>>>> umd component')
		// await build(getUmdConfig('component'));
		// console.log(' >>>>>>>>>>>>>>>>> umd icon')
		// await build(getUmdConfig('icon'));
	}
	console.log(' >>>>>>>>>>>>>>>>> common');
	await build(getLibConfig());
}

export default run;
