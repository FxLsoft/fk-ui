import cp from 'child_process';
import fs from 'fs';
import path from 'path';
import consola from 'consola';

/**
 * 自动发布npm lib
 * @param tag
 */
const pub = (tag: string) => {
	const rootPath = process.cwd();
	const pkgPath = path.join(rootPath, 'package.json');
	const pkgStr = fs.readFileSync(pkgPath).toLocaleString();
	const pkg = JSON.parse(pkgStr);
	const publishPkg = JSON.parse(pkgStr);
	let version = pkg.version;
	if (tag) {
		publishPkg.version = `${pkg.version}-${tag}`;
	} else {
		version = addVersion(pkg.version);
		publishPkg.version = version;
	}
	if (pkg.publishConfig) {
		publishPkg.main = pkg.publishConfig.main;
		publishPkg.module = pkg.publishConfig.module;
		publishPkg.typings = pkg.publishConfig.typings;
		publishPkg.publishConfig.main = pkg.main;
		publishPkg.publishConfig.module = pkg.module;
	}

	fs.writeFileSync(pkgPath, stringify(publishPkg), 'utf-8');
	consola.log(`正在发布版本[${publishPkg.version}]`);
	let isSuccess = true;
	let cmd = 'npm publish';
	if (tag) {
		cmd += ` --tag=${tag}`;
	}
	cmd += ' --registry http://*.*.*.*:8080/';
	console.log('正在发布版本...', cmd);
	const worker = cp.exec(cmd, (error, stdout, stderr) => {
		consola.log(`stdout: ${stdout}`);
		if (error) {
			consola.log(error.stack);
			consola.log(`Error code: ${error.code}`);
			consola.log(`Signal received: ${error.signal}`);
			isSuccess = false;
		} else if (stderr) {
			consola.log(`stderr: ${stderr}`);
			isSuccess = false;
		} else {
			isSuccess = true;
		}
	});

	worker.on('exit', code => {
		if (isSuccess && code == 0) {
			consola.success(`发布成功！！！！！！`);
			pkg.version = version;
		} else {
			consola.error(`发布失败！！！！！！`);
		}
		consola.log('exit >>', code);
		consola.log(new Date());
		fs.writeFileSync(pkgPath, stringify(pkg), 'utf-8');
	});
};

// -----------------------------------------
function addVersion(version) {
	const vers = version.split('.');
	const last = Math.trunc(vers.pop()) + 1;
	vers.push(last);
	return vers.join('.');
}

function stringify(obj) {
	function replacer(key, value) {
		return value;
	}
	return `${JSON.stringify(obj, replacer, '\t')}\r\n`;
}

export default pub;
