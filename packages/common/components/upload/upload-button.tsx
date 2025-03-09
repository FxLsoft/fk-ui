import { computed, defineComponent, ref, shallowRef } from 'vue';
import { useI18n } from '../locale';
import { getPrefixCls } from '../_utils/global-config';
import IconPlus from '../icon/icon-plus';
import Button from '../button';
import Tooltip from '../tooltip';
import IconUpload from '../icon/icon-upload';
import { isFunction, isPromise } from '../_utils/is';
import { getFiles, loopDirectory } from './utils';
import type { PropType } from 'vue';

export default defineComponent({
	name: 'UploadButton',
	props: {
		disabled: {
			type: Boolean,
			default: false,
		},
		directory: {
			type: Boolean,
			default: false,
		},
		accept: String,
		listType: {
			type: String,
		},
		tip: [String, Boolean],
		dragText: String,
		draggable: {
			type: Boolean,
			default: false,
		},
		pasted: Boolean,
		multiple: {
			type: Boolean,
			default: false,
		},
		uploadFiles: {
			type: Function,
			required: true,
		},
		hide: Boolean,
		onButtonClick: {
			type: Function as PropType<(event: Event) => Promise<FileList> | void>,
		},
		buttonText: String,
		tooltip: String,
	},
	setup(props, { slots }) {
		const prefixCls = getPrefixCls('upload');
		const { t } = useI18n();
		const isDragging = ref(false);
		const inputRef = shallowRef<HTMLInputElement | null>(null);
		const dropRef = shallowRef<HTMLElement | null>(null);
		const dragEnterCount = ref<number>(0); // the number of times ondragenter was triggered

		const setDragEnterCount = (type: 'subtract' | 'add' | 'reset') => {
			if (type === 'subtract') {
				dragEnterCount.value -= 1;
			} else if (type === 'add') {
				dragEnterCount.value += 1;
			} else if (type === 'reset') {
				dragEnterCount.value = 0;
			}
		};

		const handleClick = (e: Event) => {
			if (props.disabled) return;
			if (isFunction(props.onButtonClick)) {
				const result = props.onButtonClick(e);
				if (isPromise<FileList>(result)) {
					result.then(files => {
						props.uploadFiles(getFiles(files));
					});
					return;
				}
			}
			if (inputRef.value) {
				inputRef.value.click();
			}
		};

		const handleInputChange = (e: Event) => {
			const target = e.target as HTMLInputElement;
			if (target.files) {
				props.uploadFiles(getFiles(target.files));
			}

			target.value = '';
		};

		const handleDrop = (e: DragEvent) => {
			e.preventDefault();
			isDragging.value = false;
			setDragEnterCount('reset');
			if (props.disabled) {
				return;
			}

			if (props.directory && e.dataTransfer?.items) {
				loopDirectory(e.dataTransfer.items, props.accept, files => {
					props.uploadFiles(files);
				});
			} else {
				const files = getFiles(e.dataTransfer?.files, props.accept);
				props.uploadFiles(props.multiple ? files : files.slice(0, 1));
			}
		};

		const handleDragLeave = (e: DragEvent) => {
			e.preventDefault();
			setDragEnterCount('subtract');
			if (dragEnterCount.value === 0) {
				isDragging.value = false;
				setDragEnterCount('reset');
			}
		};

		const handleDragOver = (e: DragEvent) => {
			e.preventDefault();
			if (!props.disabled && !isDragging.value) {
				isDragging.value = true;
			}
		};

		const renderButton = () => {
			if (slots.default) {
				return <span>{slots.default()}</span>;
			}
			if (props.listType === 'picture-card' && !props.draggable) {
				return (
					<div class={`${prefixCls}-picture-card`}>
						<div class={`${prefixCls}-picture-card-text`}>
							<IconPlus />
						</div>
						{props.tip && <div class={`${prefixCls}-tip`}>{props.tip}</div>}
					</div>
				);
			}
			if (props.draggable) {
				return (
					<div
						class={[
							`${prefixCls}-drag`,
							{
								[`${prefixCls}-drag-active`]: isDragging.value,
							},
						]}
					>
						<div>
							<Button type="outline" v-slots={{ icon: () => <IconUpload /> }} disabled={props.disabled}>
								{props.buttonText ?? t('upload.buttonText')}
							</Button>
						</div>
						<div class={`${prefixCls}-drag-text`}>{props.dragText ?? (isDragging.value ? t('upload.dragHover') : t('upload.drag'))}</div>
					</div>
				);
			}

			return (
				<Button type="primary" v-slots={{ icon: () => <IconUpload /> }} disabled={props.disabled}>
					{props.buttonText ?? t('upload.buttonText')}
				</Button>
			);
		};

		const cls = computed(() => [
			prefixCls,
			{
				[`${prefixCls}-type-picture-card`]: props.listType === 'picture-card',
				[`${prefixCls}-draggable`]: props.draggable,
				[`${prefixCls}-disabled`]: props.disabled,
				[`${prefixCls}-hide`]: props.hide,
			},
		]);

		return () => (
			<span
				ref={dropRef}
				class={cls.value}
				onClick={handleClick}
				onDragenter={() => {
					setDragEnterCount('add');
				}}
				onDrop={handleDrop}
				onDragover={handleDragOver}
				onDragleave={handleDragLeave}
			>
				<input
					ref={inputRef}
					type="file"
					style={{ display: 'none' }}
					disabled={props.disabled}
					accept={props.accept}
					multiple={props.multiple}
					{...(props.directory ? { webkitdirectory: 'webkitdirectory' } : {})}
					onChange={handleInputChange}
				/>
				{props.tooltip || props.pasted ? <Tooltip content={props.tooltip ?? t('upload.pasted')}>{renderButton()}</Tooltip> : renderButton()}
			</span>
		);
	},
});
