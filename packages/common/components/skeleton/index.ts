import { getComponentPrefix, setGlobalConfig } from '../_utils/global-config';
import _Skeleton from './skeleton.vue';
import _SkeletonLine from './line.vue';
import _SkeletonShape from './shape.vue';
import type { GlobalOptions } from '../_utils/types';
import type { App } from 'vue';

const Skeleton = Object.assign(_Skeleton, {
	Line: _SkeletonLine,
	Shape: _SkeletonShape,
	install: (app: App, options?: GlobalOptions) => {
		setGlobalConfig(app, options);
		const componentPrefix = getComponentPrefix(options);

		app.component(componentPrefix + _Skeleton.name, _Skeleton);
		app.component(componentPrefix + _SkeletonLine.name, _SkeletonLine);
		app.component(componentPrefix + _SkeletonShape.name, _SkeletonShape);
	},
});

export type SkeletonInstance = InstanceType<typeof _Skeleton>;
export type SkeletonLineInstance = InstanceType<typeof _SkeletonLine>;
export type SkeletonShapeInstance = InstanceType<typeof _SkeletonShape>;

export { _SkeletonLine as SkeletonLine, _SkeletonShape as SkeletonShape };

export default Skeleton;
