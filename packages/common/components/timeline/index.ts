import { getComponentPrefix, setGlobalConfig } from '../_utils/global-config';
import _Timeline from './timeline';
import _TimelineItem from './item.vue';
import type { GlobalOptions } from '../_utils/types';
import type { App } from 'vue';

const Timeline = Object.assign(_Timeline, {
	Item: _TimelineItem,
	install: (app: App, options?: GlobalOptions) => {
		setGlobalConfig(app, options);
		const componentPrefix = getComponentPrefix(options);

		app.component(componentPrefix + _Timeline.name, _Timeline);
		app.component(componentPrefix + _TimelineItem.name, _TimelineItem);
	},
});

export type TimelineInstance = InstanceType<typeof _Timeline>;
export type TimelineItemInstance = InstanceType<typeof _TimelineItem>;

export { _TimelineItem as TimelineItem };

export default Timeline;
