import _IconRelation from './icon-relation.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconRelation = Object.assign(_IconRelation, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconRelation.name, _IconRelation);
	},
});

export default IconRelation;
