import { computed, defineComponent, onMounted, onUnmounted, provide, reactive, ref, shallowRef, toRefs, watch } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import { isBoolean, isFunction, isObject } from '../_utils/is';
import { ImagePreviewGroup } from '../image';
import { useFormItem } from '../_hooks/use-form-item';
import { getFiles, isImage, uploadRequest } from './utils';
import UploadButton from './upload-button';
import UploadList from './upload-list';
import { uploadInjectionKey } from './context';
import { PastedFile } from './pasted';
import type { CustomIcon, FileItem, ListType, RequestOption, UploadRequest } from './interfaces';
import type { PropType } from 'vue';

export default defineComponent({
	name: 'Upload',
	props: {
		/**
		 * @zh 文件列表
		 * @en File List
		 * @vModel
		 */
		fileList: {
			type: Array as PropType<FileItem[]>,
			default: undefined,
		},
		/**
		 * @zh 默认的文件列表（非受控状态）
		 * @en Default file list (uncontrolled state)
		 */
		defaultFileList: {
			type: Array as PropType<FileItem[]>,
			default: () => [],
		},
		/**
		 * @zh 接收的上传文件类型，具体参考 [HTML标准](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#htmlattrdefaccept "_blank")
		 * @en For the received upload file type, please refer to [HTML standard](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#htmlattrdefaccept "_blank")
		 */
		accept: String,
		/**
		 * @zh 上传的URL
		 * @en Uploaded URL
		 */
		action: String,
		/**
		 * @zh 是否禁用
		 * @en Whether to disable
		 */
		disabled: {
			type: Boolean,
			default: false,
		},
		/**
		 * @zh 是否支持多文件上传
		 * @en Whether to support multiple file upload
		 */
		multiple: {
			type: Boolean,
			default: false,
		},
		/**
		 * @zh 是否支持文件夹上传（需要浏览器支持）
		 * @en Whether to support folder upload (requires browser support)
		 */
		directory: {
			type: Boolean,
			default: false,
		},
		/**
		 * @zh 是否支持拖拽上传
		 * @en Whether to support drag and drop upload
		 */
		draggable: {
			type: Boolean,
			default: false,
		},
		/**
		 * @zh 拖拽提示文字
		 */
		dragText: String,
		/**
		 * @zh 提示文字
		 * @en Prompt text
		 */
		tip: [String, Boolean],

		/**
		 * @zh Hover 提示文字
		 * @en Hover Prompt text
		 */
		tooltip: String,

		/**
		 * @zh 上传请求附加的头信息
		 * @en Additional header information for upload request
		 */
		headers: {
			type: Object as PropType<Record<string, string>>,
		},
		/**
		 * @zh 上传请求附加的数据
		 * @en Upload request additional data
		 */
		data: {
			type: [Object, Function] as PropType<Record<string, string | Blob> | ((fileItem: FileItem) => Record<string, string | Blob>)>,
		},
		/**
		 * @zh 上传的文件名
		 * @en Uploaded file name
		 */
		name: {
			type: [String, Function] as PropType<string | ((fileItem: FileItem) => string)>,
		},
		/**
		 * @zh 上传请求是否携带 cookie
		 * @en Whether the upload request carries cookies
		 */
		withCredentials: {
			type: Boolean,
			default: false,
		},
		/**
		 * @zh 自定义上传行为
		 * @en Custom upload behavior
		 */
		customRequest: {
			type: Function as PropType<(option: RequestOption) => UploadRequest>,
		},
		/**
		 * @zh 限制上传文件的数量。`0`表示不限制
		 * @en Limit the number of uploaded files. `0` means no limit
		 */
		limit: {
			type: Number,
			default: 0,
		},
		/**
		 * @zh 是否自动上传文件
		 * @en Whether to upload files automatically
		 */
		autoUpload: {
			type: Boolean,
			default: true,
		},
		/**
		 * @zh 是否显示文件列表
		 * @en Whether to display the file list
		 */
		showFileList: {
			type: Boolean,
			default: true,
		},
		/**
		 * @zh 是否显示删除按钮
		 * @en Whether to display the remove button
		 * @version 1.0.0
		 */
		showRemoveButton: {
			type: Boolean,
			default: true,
		},
		/**
		 * @zh 是否显示重试按钮
		 * @en Whether to display the retry button
		 * @version 1.0.0
		 */
		showRetryButton: {
			type: Boolean,
			default: true,
		},
		/**
		 * @zh 是否显示重新上传按钮
		 * @en Whether to display the retry button
		 * @version 1.0.0
		 */
		showReuploadButton: {
			type: Boolean,
			default: true,
		},
		/**
		 * @zh 是否显示取消按钮
		 * @en Whether to display the cancel button
		 * @version 1.0.0
		 */
		showCancelButton: {
			type: Boolean,
			default: true,
		},
		/**
		 * @zh 是否显示上传按钮。
		 * @version 1.0.0
		 */
		showUploadButton: {
			type: [Boolean, Object] as PropType<boolean | { showOnExceedLimit: boolean }>,
			default: true,
		},
		/**
		 * @zh 照片墙是否显示预览按钮
		 * @en Whether to display the preview button in picture-card
		 * @version 1.0.0
		 */
		showPreviewButton: {
			type: Boolean,
			default: true,
		},
		/**
		 * @zh 是否显示图片名称
		 */
		showPictureName: {
			type: Boolean,
			default: true,
		},
		/**
		 * @zh 是否在 `<a>` 链接上添加 download 属性
		 * @en Whether to add download attribute to `<a>` link
		 * @version 1.0.0
		 */
		download: {
			type: Boolean,
			default: false,
		},
		/**
		 * @zh 在列表模式下，如果上传的文件存在 URL 则展示链接。如果关闭仅展示文字并且点击可以触发 `preview` 事件。
		 * @en In the list mode, if the uploaded file has a URL, the link will be displayed. If you turn off only display text and click to trigger the `preview` event.
		 * @version 1.0.0
		 */
		showLink: {
			type: Boolean,
			default: true,
		},
		/**
		 * @zh `<img>` 的原生 HTML 属性，需要浏览器支持
		 * @en Native HTML attributes of `<img>`, browser support is required
		 * @version 1.0.0
		 */
		imageLoading: {
			type: String as PropType<'eager' | 'lazy'>,
		},
		/**
		 * @zh 图片列表类型
		 * @en Picture list type
		 * @values 'text','picture','picture-card'
		 */
		listType: {
			type: String as PropType<ListType>,
			default: 'text',
		},
		/**
		 * @zh Response中获取图片URL的key，开启后会用上传的图片替换预加载的图片
		 * @en Get the key of the image URL in the Response. After opening, it will replace the pre-load image with the uploaded image
		 */
		responseUrlKey: {
			type: [String, Function] as PropType<string | ((fileItem: FileItem) => string)>,
		},
		/**
		 * @zh 自定义图标
		 * @en Custom icon
		 */
		customIcon: {
			type: Object as PropType<CustomIcon>,
		},
		/**
		 * @zh 是否使用 ImagePreview 组件进行预览
		 * @version 1.0.0
		 */
		imagePreview: {
			type: Boolean,
			default: false,
		},
		/**
		 * @zh 上传文件前触发
		 * @en Trigger before uploading a file
		 */
		onBeforeUpload: {
			type: Function as PropType<(file: File) => boolean | Promise<boolean | File>>,
		},
		/**
		 * @zh 上传文件后触发
		 * @en Trigger before uploading a file
		 */
		onAfterUpload: {
			type: Function as PropType<(file: FileItem) => void>,
		},
		/**
		 * @zh 移除文件前触发
		 * @en Triggered before removing the file
		 */
		onBeforeRemove: {
			type: Function as PropType<(fileItem: FileItem) => Promise<boolean>>,
		},
		/**
		 * @zh 点击上传按钮触发（如果返回 Promise 则会关闭默认 input 上传）
		 * @en Click the upload button to trigger (if the Promise is returned, the default input upload will be closed)
		 */
		onButtonClick: {
			type: Function as PropType<(event: Event) => Promise<FileList> | void>,
		},
		/**
		 * @zh 上传按钮上展示的文字
		 */
		buttonText: {
			type: String,
		},
		/**
		 * @zh 是否支持复制粘贴
		 */
		pasted: {
			type: Boolean,
			default: true,
		},
	},
	emits: {
		'update:fileList': (fileList: FileItem[]) => true,
		/**
		 * @zh 上传的文件超出限制后触发
		 * @en Triggered when the uploaded file exceeds the limit
		 * @param {FileItem[]} fileList
		 * @param {File[]} files
		 */
		exceedLimit: (fileList: FileItem[], files: File[]) => true,
		/**
		 * @zh 上传的文件状态发生改变时触发
		 * @en Triggered when the status of the uploaded file changes
		 * @param {FileItem[]} fileList
		 * @param {fileItem} fileItem
		 */
		change: (fileList: FileItem[], fileItem: FileItem) => true,
		/**
		 * @zh 上传中的文件进度改变时触发
		 * @en Triggered when the uploading file progress changes
		 * @param {fileItem} fileItem
		 * @param {ProgressEvent} ev
		 */
		progress: (fileItem: FileItem, ev?: ProgressEvent) => true,
		/**
		 * @zh 点击图片预览时的触发
		 * @en Trigger when the image preview is clicked
		 * @param {FileItem} fileItem
		 */
		preview: (fileItem: FileItem) => true,
		/**
		 * @zh 上传成功时触发
		 * @en Triggered when upload is successful
		 * @param {FileItem} fileItem
		 */
		success: (fileItem: FileItem) => true,
		/**
		 * @zh 上传失败时触发
		 * @en Triggered when upload fails
		 * @param {FileItem} fileItem
		 */
		error: (fileItem: FileItem) => true,
	},
	/**
	 * @zh 上传列表的项目
	 * @en Upload list item
	 * @slot upload-item
	 * @binding {FileItem} fileItem
	 * @binding {number} index
	 */
	/**
	 * @zh 上传按钮
	 * @en Upload button
	 * @slot upload-button
	 */
	/**
	 * @zh 重试图标
	 * @en Retry icon
	 * @slot retry-icon
	 * @version 1.0.0
	 */
	/**
	 * @zh 成功图标
	 * @en Success icon
	 * @slot success-icon
	 * @version 1.0.0
	 */
	/**
	 * @zh 失败图标
	 * @en Error icon
	 * @slot error-icon
	 * @version 1.0.0
	 */
	/**
	 * @zh 开始图标
	 * @en Start icon
	 * @slot start-icon
	 * @version 1.0.0
	 */
	/**
	 * @zh 取消图标
	 * @en Cancel icon
	 * @slot cancel-icon
	 * @version 1.0.0
	 */
	/**
	 * @zh 预览图标
	 * @en Preview icon
	 * @slot preview-icon
	 * @version 1.0.0
	 */
	/**
	 * @zh 删除图标
	 * @en Remove icon
	 * @slot remove-icon
	 * @version 1.0.0
	 */
	/**
	 * @zh 文件图标
	 * @en File icon
	 * @slot file-icon
	 * @version 1.0.0
	 */
	/**
	 * @zh 文件名称
	 * @en File name
	 * @slot file-name
	 * @version 1.0.0
	 */
	/**
	 * @zh 自定义图片
	 * @en Image
	 * @slot image
	 * @binding {FileItem} fileItem
	 * @version 1.0.0
	 */
	/**
	 * @zh 上传列表额外按钮
	 * @en Extra button
	 * @slot extra-button
	 * @binding {FileItem} fileItem
	 * @version 1.0.0
	 */
	setup(props, { emit, slots }) {
		const {
			fileList,
			disabled,
			listType,
			customIcon,
			showRetryButton,
			showReuploadButton,
			showCancelButton,
			showRemoveButton,
			showPreviewButton,
			showPictureName,
			imageLoading,
			download,
			showLink,
		} = toRefs(props);
		const uploadRef = shallowRef<HTMLElement>(null);
		const prefixCls = getPrefixCls('upload');
		const { mergedDisabled, eventHandlers } = useFormItem({ disabled });

		// Internally maintained picture list
		const _fileList = ref<FileItem[]>([]);
		const fileMap = new Map<string, FileItem>();
		const requestMap = new Map<string, UploadRequest>();

		const isMax = computed(() => {
			return props.limit > 0 && _fileList.value.length >= props.limit;
		});

		const checkFileList = (fileList?: FileItem[]) => {
			fileMap.clear();
			const newFileList = fileList?.map((data, index) => {
				const status = data.status ?? 'done';
				const fileItem = reactive({
					...data,
					uid: data.uid ?? `${Date.now()}${index}`,
					status,
					percent: data.percent ?? (['error', 'init'].includes(status) ? 0 : 1),
				});
				fileMap.set(fileItem.uid, fileItem);
				return fileItem;
			});
			_fileList.value = newFileList ?? [];
		};

		checkFileList(props.defaultFileList);
		watch(
			fileList,
			fileList => {
				if (fileList) {
					checkFileList(fileList);
				}
			},
			{ immediate: true, deep: true },
		);

		const updateFileList = (file: FileItem) => {
			emit('update:fileList', _fileList.value);
			emit('change', _fileList.value, file);
			eventHandlers.value?.onChange?.();
		};

		const updateFile = (id: string, file: File) => {
			for (const item of _fileList.value) {
				if (item.uid === id) {
					item.file = file;
					updateFileList(item);
					break;
				}
			}
		};

		/**
		 * 重新上传
		 * @param fileItem
		 */
		const reupload = (fileItem: FileItem) => {
			const input = document.createElement('input');
			input.type = 'file';
			input.style.display = 'none';
			input.accept = mergedAccept.value;
			input.multiple = false;
			document.body.appendChild(input);
			input.click();
			input.onchange = (e: Event) => {
				const target = e.target as HTMLInputElement;
				if (target.files) {
					const files = getFiles(target.files);
					if (files.length) {
						const pureFile = files[0];
						const doInitUpload = (file: File) => {
							const dataURL = isImage(file) ? URL.createObjectURL(file) : undefined;
							fileItem.uid = fileItem.uid || `${Date.now()}`;
							fileItem.name = file.name;
							fileItem.file = file;
							fileItem.url = dataURL;
							fileItem.status = 'init';
							fileItem.percent = 0;
							updateFileList(fileItem);
							if (props.autoUpload) {
								uploadFile(fileItem);
							}
						};
						if (isFunction(props.onBeforeUpload)) {
							fileItem.status = 'uploading';
							Promise.resolve(props.onBeforeUpload(pureFile))
								.then((result: boolean | File) => {
									if (result) {
										doInitUpload(isBoolean(result) ? pureFile : result);
									}
								})
								.catch(err => {
									console.error(err);
								});
						} else {
							doInitUpload(pureFile);
						}
					}
				}
				input.remove();
			};
		};

		const uploadFile = (fileItem: FileItem) => {
			const handleProgress = (percent: number, event?: ProgressEvent) => {
				const file = fileMap.get(fileItem.uid);
				if (file) {
					file.status = 'uploading';
					file.percent = percent;

					emit('progress', file, event);
					updateFileList(file);
				}
			};

			const handleSuccess = (response: any) => {
				const file = fileMap.get(fileItem.uid);
				if (file) {
					file.status = 'done';
					file.percent = 1;
					file.response = response;
					if (props.responseUrlKey) {
						if (isFunction(props.responseUrlKey)) {
							file.url = props.responseUrlKey(file);
						} else if (response[props.responseUrlKey]) {
							file.url = response[props.responseUrlKey];
						}
					}
					requestMap.delete(file.uid);
					if (isFunction(props.onAfterUpload)) {
						props.onAfterUpload(file);
					}
					emit('success', file);
					updateFileList(file);
				}
			};

			const handleError = (response: any) => {
				const file = fileMap.get(fileItem.uid);
				if (file) {
					file.status = 'error';
					file.percent = 0;
					file.response = response;

					requestMap.delete(file.uid);
					emit('error', file);
					updateFileList(file);
				}
			};

			const option: RequestOption = {
				fileItem,
				action: props.action,
				name: props.name,
				data: props.data,
				headers: props.headers,
				withCredentials: props.withCredentials,
				onProgress: handleProgress,
				onSuccess: handleSuccess,
				onError: handleError,
			};

			fileItem.status = 'uploading';
			fileItem.percent = 0;

			// 保存请求
			const request = isFunction(props.customRequest) ? props.customRequest(option) : uploadRequest(option);

			requestMap.set(fileItem.uid, request);
			updateFileList(fileItem);
		};

		const abort = (fileItem: FileItem) => {
			const req = requestMap.get(fileItem.uid);
			if (req) {
				req.abort?.();
				requestMap.delete(fileItem.uid);
				const file = fileMap.get(fileItem.uid);
				if (file) {
					file.status = 'error';
					file.percent = 0;

					updateFileList(file);
				}
			}
		};

		const submit = (fileItem?: FileItem) => {
			if (fileItem) {
				const file = fileMap.get(fileItem.uid);
				if (file) {
					uploadFile(file);
				}
			} else {
				for (const item of _fileList.value) {
					if (item.status === 'init') {
						uploadFile(item);
					}
				}
			}
		};

		const initUpload = async (file: File, index: number) => {
			const uid = `${Date.now()}-${index}`;

			const dataURL = isImage(file) ? URL.createObjectURL(file) : undefined;

			const fileItem: FileItem = reactive({
				uid,
				file,
				url: dataURL,
				name: file.name,
				status: 'init',
				percent: 0,
			});

			fileMap.set(uid, fileItem);
			_fileList.value = [..._fileList.value, fileItem];
			updateFileList(fileItem);

			if (props.autoUpload) {
				uploadFile(fileItem);
			}
		};

		const uploadFiles = (files: File[]) => {
			if (props.limit > 0 && _fileList.value.length + files.length > props.limit) {
				emit('exceedLimit', _fileList.value, files);
				return;
			}

			for (let i = 0; i < files.length; i++) {
				const file = files[i];
				if (isFunction(props.onBeforeUpload)) {
					Promise.resolve(props.onBeforeUpload(file))
						.then((result: boolean | File) => {
							if (result) {
								initUpload(isBoolean(result) ? file : result, i);
							}
						})
						.catch(err => {
							console.error(err);
						});
				} else {
					initUpload(file, i);
				}
			}
		};

		const removeFile = (fileItem: FileItem) => {
			_fileList.value = _fileList.value.filter(item => {
				return item.uid !== fileItem.uid;
			});
			updateFileList(fileItem);
		};

		const handleRemove = (fileItem: FileItem) => {
			if (isFunction(props.onBeforeRemove)) {
				Promise.resolve(props.onBeforeRemove(fileItem))
					.then((result: boolean) => {
						if (result) {
							removeFile(fileItem);
						}
					})
					.catch(err => {
						// eslint-disable-next-line no-console
						console.error(err);
					});
			} else {
				removeFile(fileItem);
			}
		};

		const handlePreview = (fileItem: FileItem) => {
			if (props.imagePreview && fileItem.url) {
				const current = imageList.value.indexOf(fileItem.url);
				if (current > -1) {
					imagePreviewCurrent.value = current;
					imagePreviewVisible.value = true;
				}
			}

			emit('preview', fileItem);
		};

		provide(
			uploadInjectionKey,
			reactive({
				disabled: mergedDisabled,
				listType,
				iconCls: `${prefixCls}-icon`,
				showRemoveButton,
				showRetryButton,
				showReuploadButton,
				showCancelButton,
				showPreviewButton,
				showPictureName,
				showLink,
				imageLoading,
				download,
				customIcon,
				slots,
				onUpload: uploadFile,
				onAbort: abort,
				onRemove: handleRemove,
				onPreview: handlePreview,
				onReupload: reupload,
			}),
		);

		const mergedAccept = computed(() => {
			if (props.accept) {
				return props.accept;
			}
			if (props.listType === 'picture' || props.listType === 'picture-card') {
				return 'image/*';
			}
			return undefined;
		});

		const buttonClass = computed(() => {
			return {
				[`${prefixCls}-drag-wrapper`]: props.draggable,
			};
		});

		const isHideButton = computed(() => {
			return !props.showUploadButton || (isMax.value && !(isObject(props.showUploadButton) && props.showUploadButton.showOnExceedLimit));
		});

		const handlePasted = (files: FileList) => {
			const preUploadFiles = getFiles(files, props.accept);
			uploadFiles(preUploadFiles);
		};
		onMounted(() => {
			handleMouseEnter();
		});

		onUnmounted(() => {
			PastedFile.removeEventListener(handlePasted);
		});

		const handleMouseEnter = () => {
			uploadRef.value?.focus();
			if (!props.disabled && props.pasted) {
				PastedFile.addEventListener(handlePasted, uploadRef.value);
			}
		};

		const renderButton = () => {
			const button = (
				<UploadButton
					key="upload-button"
					v-slots={{
						default: slots['upload-button'],
					}}
					disabled={mergedDisabled.value}
					draggable={props.draggable}
					listType={props.listType}
					uploadFiles={uploadFiles}
					multiple={props.multiple}
					directory={props.directory}
					dragText={props.dragText}
					tip={props.tip}
					tooltip={props.tooltip}
					hide={isHideButton.value}
					accept={mergedAccept.value}
					onButtonClick={props.onButtonClick}
					buttonText={props.buttonText}
					pasted={props.pasted}
				/>
			);

			if (props.tip && !isHideButton.value) {
				return (
					<span class={buttonClass.value}>
						{button}
						<div class={`${prefixCls}-tip`}>{props.tip}</div>
					</span>
				);
			}

			return button;
		};

		const imagePreviewVisible = ref(false);

		const imagePreviewCurrent = ref(0);

		const handleImagePreviewChange = (current: number) => {
			imagePreviewCurrent.value = current;
		};

		const handleImagePreviewVisibleChange = (visible: boolean) => {
			imagePreviewVisible.value = visible;
		};

		const imageList = computed(() => _fileList.value.filter(item => Boolean(item.url)).map(item => item.url as string));

		const render = () => {
			if (!props.showFileList) {
				return (
					<div ref={uploadRef} onMouseenter={handleMouseEnter} class={[`${prefixCls}-wrapper`]}>
						{props.showUploadButton && renderButton()}
					</div>
				);
			}

			return (
				<div ref={uploadRef} onMouseenter={handleMouseEnter} class={[`${prefixCls}-wrapper`, `${prefixCls}-wrapper-type-${props.listType}`]}>
					{props.imagePreview && imageList.value.length > 0 && (
						<ImagePreviewGroup
							srcList={imageList.value}
							visible={imagePreviewVisible.value}
							current={imagePreviewCurrent.value}
							onChange={handleImagePreviewChange}
							onVisibleChange={handleImagePreviewVisibleChange}
						/>
					)}
					{props.listType !== 'picture-card' && props.showUploadButton && renderButton()}
					<UploadList
						v-slots={{
							'upload-button': renderButton,
							'upload-item': slots['upload-item'],
						}}
						fileList={_fileList.value}
						listType={props.listType}
					/>
				</div>
			);
		};

		return {
			prefixCls,
			render,
			innerSubmit: submit,
			innerAbort: abort,
			innerUpdateFile: updateFile,
			innerUpload: uploadFiles,
		};
	},
	methods: {
		/**
		 * @zh 上传文件（已经初始化完成的文件）
		 * @en Upload file (file that has been initialized)
		 * @public
		 * @param {FileItem} fileItem
		 */
		submit(fileItem?: FileItem) {
			return this.innerSubmit(fileItem);
		},
		/**
		 * @zh 中止上传
		 * @en Abort upload
		 * @public
		 * @param {FileItem} fileItem
		 */
		abort(fileItem: FileItem) {
			return this.innerAbort(fileItem);
		},
		/**
		 * @zh 更新文件
		 * @en Update file
		 * @public
		 * @param {string} id
		 * @param {File} file
		 */
		updateFile(id: string, file: File) {
			return this.innerUpdateFile(id, file);
		},
		/**
		 * @zh 上传文件
		 * @en Upload file
		 * @public
		 * @param {File[]} files
		 * @version 1.0.0
		 */
		upload(files: File[]) {
			return this.innerUpload(files);
		},
	},
	render() {
		return this.render();
	},
});
