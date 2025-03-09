import { get, merge } from 'lodash-es';
import { Message, getFiles, isFunction, isImage, isString, uploadRequest } from '@erp/common';
import { getToken } from '../../http';
import { pop } from '../pop';
import { FileSuffixMap } from '../input/options';
import type { FileItem, MessageReturn, RequestOption } from '@erp/common';

/**
 * base64转File文件对象
 * @param base64
 * @param mine
 * @param filename
 * @returns
 */
export const base64ToFile = (base64, mine?: string, filename?: string) => {
	const arr = base64.split(',');
	const type = mine || arr[0].match(/:(.*?);/)[1];
	const suffix = type.split('/')[1];
	const fileName = filename || `image.${suffix}`;
	const bstr = atob(arr[1]);
	let n = bstr.length;
	const u8arr = new Uint8Array(n);
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new File([u8arr], fileName, { type });
};

/**
 * 上传base64
 * @param str
 * @param callback
 * @param props
 */
export function uploadBase64(file: string | File, callback: (str: string) => void, props?: SelectFileProps) {
	props = merge(
		{
			action: '/api/system/upload',
			name: 'files',
			autoUpload: true,
			responseUrlKey: 'data.path',
			async: false,
		},
		props,
	);
	const fileItem: FileItem = {
		uid: `${Date.now()}`,
		file: file instanceof File ? file : base64ToFile(file),
	};
	const option: RequestOption = {
		fileItem,
		action: props.action,
		name: props.name,
		async: props.async,
		onProgress(percent, event) {
			console.log(percent, event);
			fileItem.percent = percent;
			props.change?.(fileItem);
		},
		onSuccess(response) {
			fileItem.response = response;
			props.change?.(fileItem);
			return callback(get(response, props.responseUrlKey));
		},
		onError(response) {
			fileItem.response = response;
			props.change?.(fileItem);
			console.error(response);
		},
		headers: {
			get Authorization() {
				return `Bearer ${getToken()}`;
			},
		},
	};

	fileItem.status = 'uploading';
	fileItem.percent = 0;

	// 保存请求
	uploadRequest(option);
}

/**
 * 上传文件入参
 */
export interface SelectFileProps {
	/**
	 * 上传名称
	 */
	name?: string;
	/**
	 * 上传地址
	 */
	action?: string;
	/**
	 * word excel ppt pdf image audio video
	 */
	accept?: string | string[];
	/**
	 * maxSize M为单位
	 */
	maxSize?: number;
	multiple?: boolean;
	directory?: boolean;
	autoUpload?: boolean;
	change?: (file: FileItem) => void;
	afterSelect?: (files: File[]) => File[];
	beforeUpload?: (file: FileItem) => boolean | Promise<boolean>;
	formatResponse?: <T extends Record<string, any>>(res: T) => T;
	responseUrlKey?: string;
	async?: boolean;
	/**
	 * 附加的请求信息
	 */
	data?: Record<string, string | Blob> | ((fileItem: FileItem) => Record<string, string | Blob>);
}

/**
 * 选择文件进行上传
 * @param props
 * @returns
 */
export function openSelectFile(props: SelectFileProps): Promise<FileItem | FileItem[]> {
	props.action = props.action ?? '/api/system/upload';
	props.name = props.name ?? 'files';
	props.responseUrlKey = props.responseUrlKey ?? 'data.path';
	props.autoUpload = props.autoUpload ?? true;
	const input = document.createElement('input');
	const filterAccept = FileSuffixMap.filter(v => {
		if (Array.isArray(props.accept)) {
			return props.accept.includes(v.label) || props.accept.includes(v.key);
		} else {
			return v.label === props.accept || v.key === props.accept;
		}
	});
	let accept = '';
	if (!filterAccept.length) {
		if (props.accept) {
			accept = props.accept as string;
		} else {
			accept = FileSuffixMap.flatMap(v => v.accept)
				.map(v => `.${v}`)
				.join(',');
		}
	} else {
		accept = filterAccept
			.flatMap(v => v.accept)
			.map(v => `.${v}`)
			.join(',');
	}
	input.type = 'file';
	input.style.display = 'none';
	input.accept = accept;
	input.multiple = !!props.multiple;
	if (props.directory) {
		input.setAttribute('webkitdirectory', 'webkitdirectory');
	}
	document.body.appendChild(input);
	input.click();

	return new Promise((resolve, reject) => {
		let loading: MessageReturn;
		const fileMap = new Map<string, FileItem>();
		const fileLists: FileItem[] = [];
		const handleChange = async (evt: MouseEvent) => {
			console.log('event', evt);
			if (props.autoUpload) {
				loading = pop.loading();
			}
			const target = evt.target as HTMLInputElement;
			if (target.files) {
				let preFiles = getFiles(target.files);
				if (props.afterSelect) {
					preFiles = props.afterSelect(preFiles);
				}
				if (preFiles.length === 0) {
					loading?.close();
					reject([]);
				} else {
					for (let i = 0; i < preFiles.length; i++) {
						const file = preFiles[i];
						await initUpload(file, i);
					}
					for (let i = 0; i < fileLists.length; i++) {
						const file = fileLists[i];
						updateFileList(file);
					}
				}
			} else {
				loading?.close();
			}
			input.remove();
		};
		input.onchange = handleChange;

		const initUpload = async (file: File, index: number) => {
			const uid = `${Date.now()}-${index}`;

			const dataURL = isImage(file) ? URL.createObjectURL(file) : undefined;

			const fileItem: FileItem = {
				uid,
				file,
				url: dataURL,
				name: file.name,
				status: props.autoUpload ? 'init' : 'done',
				percent: 0,
			};
			let flag = true;
			if (isFunction(props.beforeUpload)) {
				flag = await props.beforeUpload(fileItem);
			} else {
				const maxSize = props.maxSize ?? filterAccept.length ? Math.max(...filterAccept.map(v => v.maxSize || 5)) : 5;
				if (file.size / 1024 / 1024 > maxSize) {
					flag = false;
					Message.error(`上传文件不能超过${maxSize}M`);
				}
			}
			if (flag) {
				fileMap.set(uid, fileItem);
				fileLists.push(fileItem);
				if (props.autoUpload) {
					uploadFile(fileItem);
				}
			} else {
				fileItem.status = 'error';
				fileLists.push(fileItem);
			}
		};

		const uploadFile = (fileItem: FileItem) => {
			const handleProgress = (percent: number, event?: ProgressEvent) => {
				const file = fileMap.get(fileItem.uid);
				if (file) {
					file.status = 'uploading';
					file.percent = percent;
					updateFileList(file);
				}
			};

			const handleSuccess = (response: any) => {
				const file = fileMap.get(fileItem.uid);
				if (file) {
					file.status = 'done';
					file.percent = 1;
					if (isFunction(props.formatResponse)) {
						response = props.formatResponse(response);
					}
					file.response = response;
					if (props.responseUrlKey) {
						file.url = get(response, props.responseUrlKey);
					}
					updateFileList(file);
				}
			};

			const handleError = (response: any) => {
				const file = fileMap.get(fileItem.uid);
				if (file) {
					file.status = 'error';
					file.percent = 0;
					file.response = response;
					updateFileList(file);
				}
			};

			const option: RequestOption = {
				fileItem,
				action: props.action,
				name: props.name,
				data: props.data,
				onProgress: handleProgress,
				onSuccess: handleSuccess,
				onError: handleError,
				headers: {
					get Authorization() {
						return `Bearer ${getToken()}`;
					},
				},
			};

			fileItem.status = 'uploading';
			fileItem.percent = 0;

			// 保存请求
			uploadRequest(option);
			updateFileList(fileItem);
		};

		const updateFileList = async (file: FileItem) => {
			props.change?.(file);
			if (props.autoUpload) {
				let find = fileLists.find(v => ['uploading', 'init'].includes(v.status));
				if (find) {
					return;
				}
				find = fileLists.find(v => v.status === 'error');
				if (find) {
					reject(fileLists);
				} else {
					if (props.multiple) {
						resolve(fileLists);
					} else {
						resolve(fileLists[0] || null);
					}
				}
				loading?.close();
			} else {
				if (props.multiple) {
					resolve(fileLists);
				} else {
					resolve(fileLists[0] || null);
				}
			}
		};
	});
}
