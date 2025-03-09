export const getIconVue = ({ name, componentName, svgHtml }: { name: string; componentName: string; svgHtml: string }) =>
	// language=Vue
	// prettier-ignore
	`<template>
	${svgHtml}
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { getPrefixCls } from '../../utils/global-config';
import { isNumberSize } from '../../utils/is';
import type { CSSProperties } from 'vue';

defineOptions({
	name: '${componentName}',
});

const props = withDefaults(
	defineProps<{
		size?: string | number;
		strokeWidth?: number;
		strokeLinecap?: 'butt' | 'round' | 'square' | 'inherit';
		strokeLinejoin?: 'round' | 'inherit' | 'bevel' | 'miter';
		rotate?: number;
		spin?: boolean;
	}>(),
	{
		strokeWidth: 4,
		strokeLinecap: 'butt',
		strokeLinejoin: 'miter',
	},
);

const emit = defineEmits<{
	click: [evt: MouseEvent];
}>();

const prefixCls = getPrefixCls('icon');
const cls = computed(() => [prefixCls, \`\${prefixCls}-${name.replace('icon-', '')}\`, { [\`\${prefixCls}-spin\`]: props.spin }]);
const innerStyle = computed(() => {
	const styles: CSSProperties = {};
	if (props.size) {
		styles.fontSize = isNumberSize(props.size) ? \`\${props.size}px\` : props.size;
	}
	if (props.rotate) {
		styles.transform = \`rotate(\${props.rotate}deg)\`;
	}
	return styles;
});
const onClick = (ev: MouseEvent) => {
	emit('click', ev);
};
</script>
`;

export const getComponentIndex = ({ name, componentName }: { name: string; componentName: string }) =>
	// language=TypeScript
	// prettier-ignore
	`import _${componentName} from './${name}.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const ${componentName} = Object.assign(_${componentName}, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _${componentName}.name, _${componentName});
	},
});

export default ${componentName};
`;

export const getVueIcon = ({ imports, components }: { imports: string[]; components: string[] }) =>
	// language=TypeScript
	// prettier-ignore
	`${imports.join('\n')}
import type { App, Plugin } from 'vue';
import type { IconOptions } from '../utils/types';

const icons: Record<string, Plugin> = {
${components.map(v => `	${v},`).join('\n')}
};

const install = (app: App, options?: IconOptions) => {
	for (const key of Object.keys(icons)) {
		app.use(icons[key], options);
	}
};

const Icon = {
	...icons,
	install,
};

export default Icon;
`;

export const getIndex = ({ exports }: { exports: string[] }) =>
	// language=TypeScript
	// prettier-ignore
	`export { default } from './vue-icon';
${exports.join('\n')}
export type {} from './icon-components';
`;

export const getType = ({ exports }: { exports: string[] }) =>
	`// @ts-nocheck

declare module 'vue' {
	export interface GlobalComponents {
${exports.map(item => `		${item}`).join('\n')}
	}
}

export {};
`;
