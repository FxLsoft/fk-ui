#!/usr/bin/env node

import path from 'path';
import fs from 'fs-extra';
import { Command } from 'commander';
import icongen from './scripts/icongen';
import lessgen from './scripts/lessgen';
import docgen from './scripts/docgen';
import dtsgen from './scripts/dtsgen';
import devComponent from './scripts/dev-component';
import buildComponent from './scripts/build-component';
import buildStyle from './scripts/build-style';

import jsongen from './scripts/jsongen';
import pubLib from './scripts/publish-lib';
import buildLib from './scripts/build-lib';

const program = new Command();

const packageContent = fs.readFileSync(path.resolve(__dirname, '../package.json'), 'utf8');
const packageData: any = JSON.parse(packageContent);

program.version(packageData.version).name('erp-cli').usage('command [options]');

program
	.command('docgen')
	.description('generate document of component. e.g. erp-cli docgen --components menu,affix,button')
	.option('-i, --input <filename>', 'specified input file')
	.option('-c, --components <names>', 'component name(s) joined by comma(,)')
	.option('-t, --target <target>', 'generate target dir')
	.action(({ input, components, target }) => {
		components = typeof components === 'string' ? components.split(',') : [];
		docgen({ input, components, targetDir: target });
	});

program
	.command('icongen')
	.description('generate icon components.')
	.action(() => {
		icongen();
	});

program
	.command('lessgen')
	.description('generate index less file.')
	.action(() => {
		lessgen();
	});

program
	.command('dtsgen <files>')
	.description('emit .d.ts files for vue files.')
	.option('-o, --outDir <direname>', 'Specify an output folder for all emitted files')
	.action((files, options) => {
		dtsgen(files, options);
	});

program
	.command('dev:component')
	.description('build components with watch mode.')
	.action(async () => {
		await devComponent();
	});

program
	.command('build:component')
	.description('build production files.')
	.option('-u, --umd', 'build with UMD file')
	.action(async ({ umd }) => {
		await buildComponent({ umd });
	});

program
	.command('build:style')
	.description('build style related files.')
	.option('-M, --material', 'generate style for material')
	.action(async ({ material }) => {
		await buildStyle({ material });
	});

program
	.command('jsongen')
	.description('generate vetur and web-types json files')
	.action(async () => {
		await jsongen();
	});

program
	.command('pub')
	.description('publish lib')
	.option('-T, --tag <tag>', 'publish with Tag')
	.action(({ tag }) => {
		pubLib(tag);
	});

program
	.command('lib')
	.description('build lib')
	.option('-T, --tag', 'publish with Tag')
	.action(({ tag }) => {
		buildLib(tag);
	});

program.parse(process.argv);
