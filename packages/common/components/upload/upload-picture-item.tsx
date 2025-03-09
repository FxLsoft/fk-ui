import { computed, defineComponent, inject } from 'vue';
import { getPrefixCls } from '../_utils/global-config';
import IconImageClose from '../icon/icon-image-close';
import IconEye from '../icon/icon-eye';
import IconUpload from '../icon/icon-upload';
import IconDelete from '../icon/icon-delete';
import { uploadInjectionKey } from './context';
import UploadProgress from './upload-progress';
import type { UploadContext } from './context';
import type { FileItem } from './interfaces';
import type { PropType } from 'vue';

export default defineComponent({
	name: 'UploadPictureItem',
	props: {
		file: {
			type: Object as PropType<FileItem>,
			required: true,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
	},
	setup(props) {
		const prefixCls = getPrefixCls('upload-list');
		const itemCls = `${prefixCls}-picture`;
		const cls = computed(() => [
			itemCls,
			{
				[`${itemCls}-status-error`]: props.file.status === 'error',
			},
		]);

		const fileName = computed(() => {
			const name = props.file.name;
			if (name && name.includes('.')) {
				const index = name.lastIndexOf('.');
				return {
					name: name.slice(0, index),
					suffix: name.slice(index),
				};
			} else {
				return {
					name,
					suffix: '',
				};
			}
		});

		const uploadCtx = inject<UploadContext>(uploadInjectionKey, undefined);

		const renderCard = () => {
			if (props.file.status === 'uploading') {
				return <UploadProgress file={props.file} listType="picture-card" />;
			}

			return [
				<div class={`${itemCls}-file-card`}>
					{uploadCtx?.slots.image?.({ fileItem: props.file }) ?? (
						<img src={props.file.url} alt={props.file.name} {...(uploadCtx?.imageLoading ? { loading: uploadCtx.imageLoading } : undefined)} />
					)}
					<div class={`${itemCls}-mask`} onClick={() => uploadCtx?.onPreview(props.file)}>
						{props.file.status === 'error' && uploadCtx?.showCancelButton && (
							<div class={`${itemCls}-error-tip`}>
								<span class={[uploadCtx?.iconCls, `${uploadCtx?.iconCls}-error`]}>
									{uploadCtx?.slots['error-icon']?.() ?? uploadCtx?.customIcon?.errorIcon?.() ?? <IconImageClose />}
								</span>
							</div>
						)}
						<div class={`${itemCls}-operation`}>
							{props.file.status !== 'error' && uploadCtx?.showPreviewButton && (
								<span
									class={[uploadCtx?.iconCls, `${uploadCtx?.iconCls}-preview`]}
									onClick={evt => {
										evt.stopPropagation();
										uploadCtx?.onPreview(props.file);
									}}
								>
									{uploadCtx?.slots['preview-icon']?.() ?? uploadCtx?.customIcon?.previewIcon?.() ?? <IconEye />}
								</span>
							)}
							{['init', 'error'].includes(props.file.status as string) && uploadCtx?.showRetryButton && (
								<span
									class={[uploadCtx?.iconCls, `${uploadCtx?.iconCls}-upload`]}
									onClick={evt => {
										evt.stopPropagation();
										uploadCtx?.onUpload(props.file);
									}}
								>
									{uploadCtx?.slots['retry-icon']?.() ?? uploadCtx?.customIcon?.retryIcon?.() ?? <IconUpload />}
								</span>
							)}
							{['done'].includes(props.file.status as string) && !uploadCtx?.disabled && uploadCtx?.showReuploadButton && (
								<span
									class={[uploadCtx?.iconCls, `${uploadCtx?.iconCls}-reupload`]}
									onClick={evt => {
										evt.stopPropagation();
										uploadCtx?.onReupload(props.file);
									}}
								>
									{uploadCtx?.slots['reupload-icon']?.() ?? uploadCtx?.customIcon?.reuploadIcon?.() ?? <IconUpload />}
								</span>
							)}
							{!uploadCtx?.disabled && uploadCtx?.showRemoveButton && (
								<span
									class={[uploadCtx?.iconCls, `${uploadCtx?.iconCls}-remove`]}
									onClick={evt => {
										evt.stopPropagation();
										uploadCtx?.onRemove(props.file);
									}}
								>
									{uploadCtx?.slots['remove-icon']?.() ?? uploadCtx?.customIcon?.removeIcon?.() ?? <IconDelete />}
								</span>
							)}
							{uploadCtx?.slots['extra-button']?.(props.file)}
						</div>
					</div>
				</div>,
				uploadCtx.showPictureName ? (
					<span class={`${itemCls}-file-name`} title={props.file.name}>
						<span class={`${itemCls}-first-name`}>{fileName.value.name}</span>
						<span class={`${itemCls}-last-name`}>{fileName.value.suffix}</span>
					</span>
				) : null,
			];
		};

		return () => <span class={cls.value}>{renderCard()}</span>;
	},
});
