import { getComponentPrefix, setGlobalConfig } from '../_utils/global-config';
import _Avatar from './avatar.vue';
import _AvatarGroup from './avatar-group';
import type { GlobalOptions } from '../_utils/types';
import type { App } from 'vue';

const Avatar = Object.assign(_Avatar, {
	Group: _AvatarGroup,
	install: (app: App, options?: GlobalOptions) => {
		setGlobalConfig(app, options);
		const componentPrefix = getComponentPrefix(options);

		app.component(componentPrefix + _Avatar.name, _Avatar);
		app.component(componentPrefix + _AvatarGroup.name, _AvatarGroup);
	},
});

export type AvatarInstance = InstanceType<typeof _Avatar>;
export type AvatarGroupInstance = InstanceType<typeof _AvatarGroup>;

export { _AvatarGroup as AvatarGroup };

export default Avatar;
