import { getComponentPrefix, setGlobalConfig } from '../_utils/global-config';
import _Upload from './upload';
import type { App } from 'vue';
import type { GlobalOptions } from '../_utils/types';

const Upload = Object.assign(_Upload, {
	install: (app: App, options?: GlobalOptions) => {
		setGlobalConfig(app, options);
		const componentPrefix = getComponentPrefix(options);

		app.component(componentPrefix + _Upload.name, _Upload);
	},
});

export type UploadInstance = InstanceType<typeof _Upload>;

export type { FileStatus, FileItem, CustomIcon, RequestOption, UploadRequest } from './interfaces';

export default Upload;

export { PastedFile } from './pasted';
