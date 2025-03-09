import { isObject, isString } from 'node:util';
import yaml from 'js-yaml';

export function parseFrontMatter(source: string, prefix = '#') {
	const rule = /^```yaml\n+(.+?)\n+```(?:\n|$)/s;

	const content = source.replace(rule, (_, $1) => {
		const attributes: {
			meta?: {
				type: string;
				category: string;
			};
			title?:
				| string
				| {
						'zh-CN': string;
						'en-US': string;
				  };
			description?: string;
		} = yaml.load($1);
		const tpl = `${
			attributes.title && `${prefix} ${isString(attributes.title) ? attributes.title : isObject(attributes.title) ? attributes.title['zh-CN'] : ''}`
		}
${attributes.description || ''}
`;
		return tpl;
	});
	return content;
}
