import _IconBarChart from './icon-bar-chart.vue';
import type { App } from 'vue';
import type { IconOptions } from '../../utils/types';

const IconBarChart = Object.assign(_IconBarChart, {
	install: (app: App, options?: IconOptions) => {
		const iconPrefix = options?.iconPrefix ?? '';
		app.component(iconPrefix + _IconBarChart.name, _IconBarChart);
	},
});

export default IconBarChart;
