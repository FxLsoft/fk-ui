import { computed, defineComponent, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue';
import { merge } from 'lodash-es';
import { IconPlayCircle, List, Popover, isBoolean, isString, vLazy } from '@erp/common';
import { downloadImageByUrl, getFileExtension, getVideoPoster, s8 } from '../../utils';
import { createImagePreviewPop } from '../pop/custom';
import { openSelectFile } from '../rich-text';
import { pop } from '../pop';
import { createVideoPlayerPop } from '../video-player';
import { ImageViewType } from './interface';
import type { ShopUploadItem } from './interface';
import type { DraggableProps, FileItem } from '@erp/common';
import type { PropType, WatchHandle } from 'vue';

/**
 * 商品上传组件
 */
const _Component = defineComponent({
	name: 'ShopUpload',
	directives: {
		lazy: vLazy,
	},
	props: {
		/**
		 * @zh 绑定值
		 */
		modelValue: {
			type: [Object, Array, String] as PropType<ShopUploadItem>,
		},
		/**
		 * 是否禁用
		 */
		disabled: {
			type: Boolean,
			default: false,
		},
		/**
		 * 文件类型
		 */
		accept: {
			type: String,
			default: 'image',
		},
		/**
		 * 是否可以多长图片上传
		 */
		multiple: {
			type: Boolean,
			default: false,
		},
		/**
		 * 上传图片宽度
		 */
		width: {
			type: Number,
			default: 120,
		},
		/**
		 * 上传图片高度
		 */
		height: {
			type: Number,
			default: 120,
		},
		/**
		 * 上传地址
		 */
		action: {
			type: String,
		},
		/**
		 * 最大上传大小
		 */
		maxSiz: {
			type: Number,
			default: 5,
		},
		/**
		 * 最大上传数量
		 */
		limit: {
			type: Number,
			default(props) {
				if (props.multiple) {
					return 5;
				} else {
					return 1;
				}
			},
		},
		/**
		 * 预览数量
		 */
		hoverPreview: {
			type: Boolean,
			default: true,
		},
		/**
		 * 预览图片宽度
		 */
		previewWidth: {
			type: Number,
			default: 240,
		},
		/**
		 * 图片地址格式化
		 */
		imageUrlFormatter: {
			type: Function as PropType<(item: ShopUploadItem, type: ImageViewType) => string>,
		},
		/**
		 * 是否可拖拽 DraggableProps
		 */
		draggable: {
			type: [Boolean, Object] as PropType<boolean | DraggableProps>,
			default: false,
		},
		/**
		 * 提示
		 */
		tip: {
			type: String,
		},
		/**
		 * 是否显示工具
		 */
		showTools: {
			type: Boolean,
			default(props) {
				return !props.disabled;
			},
		},
	},
	emits: {
		'update:modelValue': (value: ShopUploadItem | ShopUploadItem[]) => true,
	},
	/**
	 * @zh footer slot
	 * @slot name
	 * @binding {FileItem} fileItem
	 * @binding {Number} index
	 */
	setup(props, { emit, slots, attrs }) {
		const formatModelValue = () => {
			{
				let out: ShopUploadItem[] = [];
				if (Array.isArray(props.modelValue)) {
					out = props.modelValue;
				} else if (props.modelValue) {
					out = [props.modelValue];
				}
				const files = out.map(item => {
					let el: FileItem;
					if (isString(item)) {
						el = {
							url: item,
						} as FileItem;
					} else {
						el = item as FileItem;
					}
					el.uid = el.uid || s8();
					el.fileType = getFileType(el);
					return el;
				});

				return files;
			}
		};

		const getFileType = (item: FileItem) => {
			let type = '';
			const extension = item.url ? getFileExtension(item.url) : item.name ? getFileExtension(item.name) : '';
			if (['png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp'].includes(extension)) {
				type = 'image';
			} else if (['mp4', 'm2v', 'mkv', 'm4v', 'mov'].includes(extension)) {
				type = 'video';
			} else if (['mp3', 'wav', 'wmv', 'm4a', 'acc', 'flac'].includes(extension)) {
				type = 'audio';
			}
			return type;
		};

		const innerModel = ref<FileItem[]>(formatModelValue());

		const draggable = computed(() => {
			if (props.draggable) {
				const baseDraggable = {
					itemKey: 'uid',
					handle: '.draggable-handle',
				};
				if (isBoolean(props.draggable)) {
					return baseDraggable;
				}
				return merge(baseDraggable, props.draggable);
			}
			return false;
		});

		const imageStyle = computed(() => {
			return {
				width: `${props.width}px`,
				height: `${props.height}px`,
			};
		});

		const imageWidth = computed(() => {
			return {
				width: `${props.width}px`,
			};
		});

		/**
		 * 预览
		 * @param index
		 */
		const handlePreview = (item: FileItem, index: number) => {
			const fileType = getFileType(item);
			if (fileType === 'image') {
				createImagePreviewPop(
					innerModel.value.map(v => formatSrc(v, ImageViewType.preview)),
					index,
				);
			} else if (fileType === 'video') {
				const props = {
					title: item.name,
					src: formatSrc(item, ImageViewType.preview),
					poster: getVideoPoster(item.url),
				};
				createVideoPlayerPop(props);
			} else {
				pop.warning('暂不支持该文件类型预览');
			}
		};

		/**
		 * 文件下载
		 * @param item
		 */
		const handleDownload = (item: FileItem, index: number) => {
			downloadImageByUrl(item.url);
		};

		/**
		 * 获取需要上传的数量
		 */
		const needEmptyUpload = computed(() => {
			return props.limit - innerModel.value.length;
		});

		/**
		 * 上传
		 * @param item
		 */
		const handleUpload = (item?: FileItem, index?: number) => {
			openSelectFile({
				accept: props.accept,
				maxSize: props.maxSiz,
				multiple: !item,
				action: props.action,
				afterSelect(files) {
					return !item ? files.slice(0, needEmptyUpload.value) : files;
				},
				async beforeUpload(file) {
					return true;
				},
			}).then((res: FileItem | FileItem[]) => {
				if (!res) return;
				if (item && !Array.isArray(res)) {
					item.uid = res.uid;
					item.url = res.url;
					item.name = res.name;
					item.fileType = getFileType(item);
				} else {
					res = Array.isArray(res) ? res : [res];
					for (const el of res) {
						const item = reactive<FileItem>({
							uid: el.uid,
							url: el.url,
							name: el.name,
						});
						item.fileType = getFileType(item);
						innerModel.value.push(item);
					}
				}
				console.log(innerModel.value);
			});
		};

		/**
		 * 删除
		 * @param item
		 * @param index
		 */
		const handleDelete = (item: FileItem, index: number) => {
			pop.confirm('确认要删除该张图片吗？').then(res => {
				innerModel.value.splice(index, 1);
			});
		};

		/**
		 * 处理图片地址
		 * @param item
		 * @returns
		 */
		const formatSrc = (item: FileItem, type: ImageViewType) => {
			const fileType = item.fileType;
			if (props.imageUrlFormatter) {
				return props.imageUrlFormatter(item, type);
			} else if (fileType === 'video') {
				// 处理背景
				return getVideoPoster(item.url);
			} else {
				return item.url;
			}
		};

		const renderEmpty = (item?: FileItem, index?: number) => {
			return (
				<div key="empty" class="upload-img-item upload-img-list-empty" style={imageStyle.value} onClick={e => handleUpload(item, index)}>
					<div class="upload-img-list-empty-icon">
						<i class="erpfont icon-plus" />
						<div class="upload-img-list-empty-tip">{props.tip ?? '点击上传图片'}</div>
					</div>
				</div>
			);
		};
		const renderImage = (item: FileItem, index: number) => {
			const fileType = item.fileType;
			const img = (
				<img
					key="image"
					class="upload-img-item-content-img draggable-handle"
					v-lazy={formatSrc(item, ImageViewType.view)}
					onClick={e => handlePreview(item, index)}
					height={props.height}
					width={props.width}
				/>
			);
			const vns = [];
			if (props.hoverPreview) {
				vns.push(
					<Popover key="popover" contentClass="shop-upload-popover" position="rt" show-arrow={false} mouseEnterDelay={500}>
						{{
							default: () => img,
							content: () => <img v-lazy={formatSrc(item, ImageViewType.hover)} height={props.previewWidth} width={props.previewWidth}></img>,
						}}
					</Popover>,
				);
			} else {
				vns.push(img);
			}
			if (fileType === 'video') {
				vns.push(
					<i class="upload-img-item-content-icon">
						<IconPlayCircle key="icon" />
					</i>,
				);
			}
			return vns;
		};

		const renderItem = (item: FileItem, index: number) => {
			return (
				<div class={{ 'has-footer': !!item.name, 'upload-img-item': true }} style={imageWidth.value} key={item.url || item.uid}>
					<div class="upload-img-item-content">
						{item.url ? (
							<div key="image" class="upload-img-item-content-wrapper" style={imageStyle.value}>
								{renderImage(item, index)}
								{props.showTools ? (
									<div key="mask" class="upload-img-item-mask">
										{props.disabled ? null : (
											<div key="reupload" class="icon-btn" title="重新上传" onClick={e => handleUpload(item, index)}>
												<i class="erpfont icon-sync" />
											</div>
										)}
										<div key="preview" class="icon-btn" title="预览" onClick={e => handlePreview(item, index)}>
											<i class="erpfont icon-eye" />
										</div>
										<div key="download" class="icon-btn" title="下载" onClick={e => handleDownload(item, index)}>
											<i class="erpfont icon-download" />
										</div>
									</div>
								) : null}
								{props.disabled ? null : (
									<div key="delete" class="icon-btn delete-icon-btn" title="删除" onClick={e => handleDelete(item, index)}>
										<i class="erpfont icon-delete" />
									</div>
								)}
							</div>
						) : (
							renderEmpty(item, index)
						)}
					</div>
					{item.name || slots.name ? <div class="upload-img-item-footer">{slots.name ? slots.name?.(item, index) : item.name}</div> : null}
				</div>
			);
		};

		/**
		 * List 的 slot
		 */
		const listSlots = {
			item: ({ item, index }) => renderItem(item, index),
		};

		const isShowEmpty = computed(() => {
			return !props.disabled && !innerModel.value.some(item => !item.url) && needEmptyUpload.value > 0;
		});

		let stop: WatchHandle;
		function doWatchModelValue() {
			return watch(
				() => props.modelValue,
				value => {
					innerModel.value = formatModelValue();
				},
			);
		}

		onBeforeUnmount(() => {
			stop();
		});

		onMounted(() => {
			stop = doWatchModelValue();
		});

		watch(
			innerModel,
			() => {
				stop();
				emit('update:modelValue', props.multiple ? innerModel.value : innerModel.value[0] ?? null);
				stop = doWatchModelValue();
			},
			{
				deep: true,
				flush: 'post',
			},
		);
		const render = () => {
			return (
				<div class="shop-upload">
					{innerModel.value.length ? (
						draggable.value ? (
							<List
								key="list"
								class="upload-img-list"
								data={innerModel.value}
								bordered={false}
								split={false}
								scrollbar={false}
								draggable={draggable.value}
							>
								{listSlots}
							</List>
						) : (
							innerModel.value.map((item, index) => {
								return renderItem(item, index);
							})
						)
					) : null}
					{isShowEmpty.value ? renderEmpty() : null}
				</div>
			);
		};
		return {
			render,
		};
	},
	render() {
		return this.render();
	},
});

export default _Component;
