/* eslint-disable no-await-in-loop */
import path from 'path';
import fs from 'fs-extra';
import glob from 'glob';
import { parse as parseComponent } from 'vue-docgen-api';
import chalk from 'chalk';
import print from './utils/print';
import templates from './templates';
import parseInterface from './utils/parse-interface';
import { getTemplate, toKebabCase } from './utils';
import parseMaterial from './utils/parse-material';
import { slotTagHandler } from './slot-tag-handler';
import type { ComponentDoc } from 'vue-docgen-api';

const MD_TEMPLATE = 'TEMPLATE.md';
const MD_TARGET = 'README.md';
// const MD_TARGET_DIR = '../../docs/src/components';
const MD_TARGET_DIR = 'components';
const MD_MATERIAL_README = 'docs/README.md';
const TEMPLATE_GLOB = `components/*/${MD_TEMPLATE}`;

type ComponentDocType = ComponentDoc | ComponentDoc[];
type ApiType = 'component' | 'interface';

const getApiTmpl = (componentDoc: ComponentDocType, type: ApiType, lang: string) => {
	const componentDocList = Array.isArray(componentDoc) ? componentDoc : [componentDoc];

	const res: string[] = [];

	componentDocList.forEach(item => {
		const { displayName, props, events, methods, slots, tags } = item;

		const getTmpl = (suffix: string, content: string) => {
			if (!content) return '';
			let title = displayName;

			if (type === 'component') {
				title = tags?.noBrackets ? displayName : `<${toKebabCase(displayName)}>`;
				title = `\`${title}\` ${suffix}`;
			}

			if (tags?.version) {
				const version = (tags.version[0] as any)?.description;
				version && (title += ` (${version})`);
			}

			let description = '';
			if (suffix === 'Props' && tags?.[lang]) {
				description = (tags[lang][0] as any)?.description;
			}

			return `### ${title}${description ? `\n${description}` : ''}\n${content}`;
		};

		const propsTmpl = getTmpl('Props', templates.props(props || [], { isInterface: type === 'interface' }, lang));
		const eventsTmpl = getTmpl('Events', templates.events(events || [], lang));
		const methodsTmpl = getTmpl('Methods', templates.methods(methods || [], lang));
		const slotsTmpl = getTmpl('Slots', templates.slots(slots || [], lang));

		res.push(`\n${propsTmpl}${eventsTmpl}${methodsTmpl}${slotsTmpl}\n`);
	});

	return res.join('\n');
};

const getComponentNameFormDir = (dir: string) => {
	const matchRes = dir.match(/[^/]+$/g);
	return matchRes ? matchRes[0] : '';
};

// 占位符替换
const replacePlaceholderToDoc = async ({
	dir,
	template,
	placeholderMatchers,
	parser,
	type,
	lang,
}: {
	dir: string;
	template: string;
	placeholderMatchers: RegExp;
	parser: (filePath: string) => Promise<ComponentDocType> | ComponentDocType;
	type: ApiType;
	lang: string;
}) => {
	let result = template;
	const matches = Array.from(result.matchAll(placeholderMatchers));
	for (const item of matches) {
		try {
			// @ts-ignore
			const componentDoc = await parser(path.resolve(dir, item[1]), {
				addScriptHandlers: [slotTagHandler],
			});
			result = result.replace(item[0], getApiTmpl(componentDoc, type, lang));
		} catch (err) {
			// eslint-disable-next-line no-console
			console.log(err, dir);
		}
	}
	return result;
};

const docgen = async ({ input, components, targetDir }: { input?: string; components?: string[]; targetDir?: string }) => {
	const files: string[] = [];

	if (input) {
		const filename = path.resolve(process.cwd(), input);
		console.log('filename >>', filename);
		try {
			await fs.ensureFile(filename);
			files.push(filename);
		} catch {
			return;
		}
	} else {
		// 读取组件列表
		const templates = glob.sync(TEMPLATE_GLOB, { absolute: true });
		if (components && components.length > 0) {
			const reg = new RegExp(components.join('|'));
			for (const template of templates) {
				if (reg.test(template)) {
					files.push(template);
				}
			}
		} else {
			files.push(...templates);
		}
	}

	print.info('Start to generate document...');

	for (const filename of files) {
		const dirname = path.dirname(filename);
		const result = fs.readFileSync(filename, 'utf8');
		let zhResult = getTemplate(result, 'zh');
		// API占位符替换
		zhResult = await replacePlaceholderToDoc({
			dir: dirname,
			template: zhResult,
			placeholderMatchers: /%%API\((.+?)\)%%/g,
			parser: parseComponent,
			type: 'component',
			lang: 'zh',
		});

		// INTERFACE 占位符替换
		zhResult = await replacePlaceholderToDoc({
			dir: dirname,
			template: zhResult,
			placeholderMatchers: /%%INTERFACE\((.+?)\)%%/g,
			parser: parseInterface,
			type: 'interface',
			lang: 'zh',
		});

		zhResult = await parseMaterial(zhResult, {
			matcher: /%%MATERIAL\((.+?)\)%%/,
			dirname,
		});

		try {
			const componentName = getComponentNameFormDir(dirname);
			const target = path.join(process.cwd(), targetDir || MD_TARGET_DIR, componentName, MD_TARGET);
			const outputPath = input ? path.resolve(process.cwd(), MD_MATERIAL_README) : target;

			await fs.outputFile(outputPath, zhResult);

			if (!input) {
				print.success(`${chalk.black.bgGreen.bold(`Generate README of component ${componentName} Success!`)} \n [${outputPath}]`);
			}
		} catch (err) {
			print.error(err);
		}
	}
};

export default docgen;
